"use client"

import jsPDF from "jspdf";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { dataBase } from "../../services/firebase/index";
import Loader from "../../app/(shop)/products/detail/[slug]/loading";
import { writeBatch } from "firebase/firestore";
import { setDoc, doc, getDoc, Timestamp, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

const loadMercadoPagoScript = () => {
    const script = document.createElement('script');
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.async = true;
};

export const createOrder = async (userData, cart) => {
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
    return docId;
};

const generatePDF = (userData, cart, orderId) => {
    const pdf = new jsPDF();

    // Agrega la imagen de fondo con opacidad
    const backgroundImage = "../../public/images/logo.jpeg"
    pdf.addImage(backgroundImage, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, null, 'FAST');

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

    // Obtén las dimensiones del texto adicional
    const text1 = 'Thank you for your purchase!';
    const text2 = 'Visit our website for more information.';
    const text1Dimensions = pdf.getTextDimensions(text1);
    const text2Dimensions = pdf.getTextDimensions(text2);

    // Calcula la posición central para las nuevas líneas de texto
    const centerX = (pdf.internal.pageSize.width - text1Dimensions.w) / 2;
    const centerX2 = (pdf.internal.pageSize.width - text2Dimensions.w) / 2;

    // Agrega las nuevas líneas de texto centradas
    pdf.text(centerX, 190, text1);
    pdf.text(centerX2, 200, text2);

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
    const { cart, clearCart } = useCart();
    const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const handleMercadoPagoClick = async () => {
        try {
            const swalResult = await showDownloadPrompt();

            if (swalResult.isConfirmed) {
                const pdf = generatePDF(userData, cart);
                pdf.save('ticket.pdf');
                pdf.output('dataurlnewwindow');
            }

            const result = await createOrder(userData, cart);

            const orderData = {
                title: "Night Owl Resources Bill",
                quantity: 1,
                price: calculateTotal(cart),
            };

            const requestBody = {
                items: [
                    {
                        title: orderData.title,
                        quantity: orderData.quantity,
                        unit_price: Number(orderData.price),
                        currency_id: "ARS",
                    },
                ],
                notification_url: "https://nightowlresources.vercel.app/",
                back_urls: {
                    success: "https://nightowlresources.vercel.app/thanks",
                    failure: "https://nightowlresources.vercel.app/not-found",
                    pending: "https://nightowlresources.vercel.app/not-found",
                },
                auto_return: "approved",
            };

            console.log("This is requestBody", requestBody);

            const response = await fetch("/apiMercadoPago/mercadoPago", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const preference = await response.json();

            window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preference.id}`;

            clearCart();
        } catch (error) {
            console.error("Error handling MercadoPago click:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createOrder(userData, cart);
            const swalResult = await showDownloadPrompt();

            if (swalResult.isConfirmed) {
                const pdf = generatePDF(userData, cart, result); // Pasa el ID único del ticket
                pdf.save('ticket.pdf');
                pdf.output('dataurlnewwindow');
                clearCart();
            } else {
                clearCart();
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
                <form onSubmit={handleSubmit} className="my-12 md:w-1/2 bg-bg-color-5 rounded-md p-4">
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
                            <h3 className="w-full p-1">{userData.phone}</h3>
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
                    <div className="flex flex-col sm:flex-row justify-center my-5">
                        <button
                            className={`buttonUIPayment`}
                            onClick={() => { generatePDF(userData, cart); }}
                            type="submit"
                        >
                            Submit Purchase
                        </button>
                        <button
                            className={`buttonUIPayment mt-2 sm:mt-0 sm:ml-2`}
                            onClick={handleMercadoPagoClick}
                            type="button"
                        >
                            Mercado Pago
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
};

export default PurchaseForm;
