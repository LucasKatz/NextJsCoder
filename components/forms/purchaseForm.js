"use client"
import { useState } from "react"
import Button from "../userint/button"
import {  useCart } from "../context/CartContext"
import { dataBase } from "@/services/firebase"
import { setDoc, doc, Timestamp } from "firebase/firestore"


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
    const { cart } = useCart()

    const [values, setValues] = useState({
        email: '',
        name: ''
    })

    const handleChange = (e) => { 
        setValues({ 
            ...values, 
            [e.target.name]: e.target.value
        })
     }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await createOrder(values, cart)
        console.log(result)
    }

    return (
        <main className="flex flex-col items-center justify-center m-auto">
  <form onSubmit={handleSubmit} className="my-12 w-1/2">
    <input
      type="nombre"
      required
      placeholder="Tu nombre"
      className="p-2 rounded w-full border border-blue-100 block my-4"
      name="nombre"
      onChange={handleChange}
    />
    <input
      type="direccion"
      required
      placeholder="Tu dirección"
      className="p-2 rounded w-full border border-blue-100 block my-4"
      name="direccion"
      onChange={handleChange}
    />
    <input
      type="email"
      required
      placeholder="Tu email"
      className="p-2 rounded w-full border border-blue-100 block my-4"
      name="email"
      onChange={handleChange}
    />

    <Button type="submit">Terminar mi compra</Button>
  </form>
</main>

    )
}

export default PurchaseForm