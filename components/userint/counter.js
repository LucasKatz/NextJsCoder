"use client"
import { useState } from "react"


const Counter = ({ quantity, setQuantity }) => {
  const [counter, setCounter] = useState(1)

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => setQuantity(quantity - 1);

    return (
        <div className="flex justify-center items-center gap-3 py-10">
            <button className="rounded-md bg-purple-900 text-text-color-5 font-extrabold w-12 h-12 text-2xl" onClick={decrease}>-</button>
            <p className="text-2xl">{quantity}</p>
            <button className="rounded-md bg-purple-900 text-text-color-5 font-extrabold w-12 h-12 text-2xl" onClick={increase}>+</button>
        </div>
    )
}

export default Counter

