"use client"

import Button from "../userint/button"
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import {  useCart } from "../context/CartContext"
import { dataBase } from "@/services/firebase"
import Loader from "@/app/(shop)/products/detail/[slug]/loading"
import { setDoc, doc, getDoc, Timestamp, collection, getFirestore } from "firebase/firestore"


const createOrder = async (values, items) => {
    const order = {
        client: values,
        items: items.map(item => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity
        })),
        date: new Date().toISOString()
    }

    const docId = Timestamp.fromDate(new Date()).toMillis()
    const orderRef = doc(dataBase, "orders", String(docId))
    await setDoc(orderRef, order)

    return docId
}

const PurchaseForm = () => {
    const { cart, eraseCart, clearCart } = useCart()
    const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (user && user.email) {
    
            const userDocRef = doc(collection(getFirestore(), "users"), user.email);
    
            getDoc(userDocRef)
                .then((docSnapshot) => {
                if (docSnapshot.exists()) {
    
                setUserData(docSnapshot.data());
            } else {
                console.log("Usuario no encontrado en la colección 'users'");
            }
            })
            .catch((error) => {
                console.error("Error al obtener datos del usuario:", error);
            })
            .finally(() => {
            setLoading(false);
            });
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await createOrder(values, cart)
        console.log(result)
    }

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
                <Button onClick={() => { eraseCart(user); clearCart();}} type="submit">Terminar mi compra</Button>
            </div>
    </form>
    )}
</main>

);
};

export default PurchaseForm