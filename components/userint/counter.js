"use client"
import { useState } from "react"


const Counter = () => {
    const [counter, setCounter] = useState(0)

    const increase = () => setCounter(counter + 1)
    const decrease = () => setCounter(counter - 1)

    return (
<div className="flex justify-center items-center gap-3 py-10">
  <button className="rounded-md bg-purple-900 text-white font-extrabold w-12 h-12 text-2xl" onClick={decrease}>-</button>
  <p className="text-2xl">{counter}</p>
  <button className="rounded-md bg-purple-900 text-white font-extrabold w-12 h-12 text-2xl" onClick={increase}>+</button>
</div>

    )
}

export default Counter