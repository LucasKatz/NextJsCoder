"use client"

import Button from "../userint/button"
import jsPDF from "jspdf"
import Swal from 'sweetalert2';
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import {  useCart } from "../context/CartContext"
import { dataBase } from "@/services/firebase"
import Loader from "@/app/(shop)/products/detail/[slug]/loading"
import { writeBatch} from "firebase/firestore"
import { setDoc, doc, getDoc, Timestamp, collection, getFirestore} from "firebase/firestore"
import { useRouter } from "next/navigation";


const createOrder = async (userData, cart) => {
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
    }, [user]);

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
            </div>
    </form>
    )}
</main>

);
};

export default PurchaseForm