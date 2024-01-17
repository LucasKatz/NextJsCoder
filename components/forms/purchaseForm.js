"use client"

import Button from "../userint/button"
import jsPDF from "jspdf"
import Swal from 'sweetalert2';
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import {  useCart } from "../context/CartContext"
import { dataBase } from "../../services/firebase/index"
import Loader from "../../app/(shop)/products/detail/[slug]/loading"
import { writeBatch} from "firebase/firestore"
import { setDoc, doc, getDoc, Timestamp, collection, getFirestore} from "firebase/firestore"
import { useRouter } from "next/navigation";
import MercadoPago from "mercadopago";

const loadMercadoPagoScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

export const createOrder = async (userData, cart) => {
  console.log("1. Creando orden en Firebase...");
    const order = {
        client: {
            name: userData.name,
            surname: userData.surname,
            phone: userData.phone,
            email: userData.email,
        },
        items: cart.map(item => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity
        })),
        date: new Date().toISOString()
    };

    const docId = Timestamp.fromDate(new Date()).toMillis();
    const orderRef = doc(dataBase, "Tickets", String(docId));
    await setDoc(orderRef, order);

    const batch = writeBatch(dataBase);

  cart.forEach((cartProduct) => {
    const productRef = doc(dataBase, "products", cartProduct.slug);
    const newStock = cartProduct.stock - cartProduct.quantity;
    batch.update(productRef, { stock: newStock });

  });

  await batch.commit();
  console.log("2. Orden creada exitosamente en Firebase.");

    return docId;
};

const generatePDF = (userData, cart, orderId) => {
    const pdf = new jsPDF();

    pdf.text(20, 20, `Name: ${userData.name}`);
    pdf.text(20, 30, `Surname: ${userData.surname}`);
    pdf.text(20, 40, `Phone Number: ${userData.phone}`);
    pdf.text(20, 50, `Email: ${userData.email}`);

    pdf.text(20, 60, 'Purchase Details:');
    cart.forEach((cartProduct, index) => {
        const yPosition = 70 + index * 20;
        pdf.text(20, yPosition, `${cartProduct.title} - Quantity: ${cartProduct.quantity}`);
        pdf.text(20, yPosition + 10, `Unit Price: $${cartProduct.price}`);
    });

    pdf.text(20, 160, `Total: $${cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}`);

    pdf.text(20, 170, `Ticket ID: ${orderId}`);

    return pdf;
};

const showDownloadPrompt = () => {
    return Swal.fire({
        title: 'Do you want to download a copy of your ticket?',
        showCancelButton: true,
        confirmButtonText: 'Yes, download',
        cancelButtonText: 'No, thanks',
    });
};

export const calculateTotal = (cart) => {
    return cart.reduce((total, prod) => total + prod.price * prod.quantity, 0);
  };


const PurchaseForm = () => {
    const { cart, eraseCart, clearCart } = useCart();
    const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter ();


    

    useEffect(() => {
        if (user && user.email) {
            const userDocRef = doc(collection(getFirestore(), "users"), user.email);

            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data());
                    } else {
                        console.log("User data not found 'users'");
                    }
                })
                .catch((error) => {
                    console.error("User data not found:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        loadMercadoPagoScript();
    }, [user]);

    useEffect(() => {
        const mercadoPagoButton = document.getElementById("mercadopago-btn");
    
        if (mercadoPagoButton) {
          mercadoPagoButton.addEventListener("click", handleMercadoPagoClick);
        }
    
        return () => {
          // Limpieza del evento al desmontar el componente
          if (mercadoPagoButton) {
            mercadoPagoButton.removeEventListener("click", handleMercadoPagoClick);
          }
        };
      }, [cart, userData]);
    
      const handleMercadoPagoClick = async () => {
        try {
          const result = await createOrder(userData, cart);
      
          const orderData = {
            title: "Night Owl Resources Bill",
            quantity: 1,
            price: calculateTotal(cart),
          };
      
          const response = await fetch("http://localhost:4000/mercadoPago/route", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          });
      
          const preference = await response.json();
          console.log("datos de preference", preference);
      
          // Redirige al usuario a la URL de pago de MercadoPago utilizando el ID de la preferencia
          window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preference.id}`;
          console.log("esto es el point", preference.id);
        } catch (error) {
          console.error("Error creating MercadoPago order:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      };
      
      

      const createCheckoutButton = async (preferenceId) => {
        const mp = new MercadoPago("", {
          locale: "es-AR",
        });
      
        const renderComponent = async () => {
          const walletContainer = document.getElementById("wallet_container");
      
          if (walletContainer) {
            try {
              await mp.render({
                element: "wallet_container",
                preference: {
                  id: preferenceId,
                },
              });
            } catch (error) {
              console.error("Error creating MercadoPago button:", error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }
        };
      
        renderComponent();
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createOrder(userData, cart);
            console.log(result);
    
            const swalResult = await showDownloadPrompt();
    
            if (swalResult.isConfirmed) {
                const pdf = generatePDF(userData, cart, result); // Pasa el ID único del ticket
                pdf.save('ticket.pdf');
                pdf.output('dataurlnewwindow');
                clearCart();
            } else {
                clearCart();
                console.log('User chose not to download the ticket.');
            }
            router.push("/thanks");
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    


    return (
<main className="flex flex-col items-center justify-center m-auto">
    {loading ? (
        <Loader />
    ) : (
    <form onSubmit={handleSubmit} className="my-12 w-1/2 bg-bg-color-5 rounded-md">
    <div className="form-row mb-4 text-center">
            <div className="mb-4">
                <label className="font-bold" htmlFor="name">
                    Name:
                </label>
                <h3 className="w-full p-1">{userData.name}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="surname">
                    Surname:
                </label>
                <h3 className="w-full ">{userData.surname}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="phone">
                    Phone Number:
                </label>
                <h3 className="w-full border p-1">{userData.phone}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="email">
                Email:
                </label>
                <h3>{userData.email}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="email">
                    Purchase Details
                </label>
                    {cart.map((cartProduct) => (
                <div key={cartProduct.id} className="mb-2">
                    {cartProduct.title} - Quantity: {cartProduct.quantity}
                </div>
                ))}
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="total">
                    Total: $
                </label>
                    {cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}
            </div>
    </div>
            <div className="flex flex-row justify-center my-5">
                <Button onClick={() => { generatePDF(userData, cart);  }}  type="submit">Submit Purchase</Button>
                <Button id="mercadopago-btn" type="button">
  <div id="wallet_container"></div>
  Pay with MercadoPago
</Button>

            </div>
    </form>
    )}
</main>

);
};

export default PurchaseForm