"use client"
import { useState } from "react"
import Button from "./button"

const Counter = () => {
    const [counter, setCounter] = useState(0)

    const increase = () => setCounter(counter + 1)
    const decrease = () => setCounter(counter - 1)

    return (
        <div className="flex justify-center items-center gap-3">
            <Button onClick={decrease}>-</Button>
            <p>{counter}</p>
            <Button onClick={increase}>+</Button>
        </div>
    )
}

export default Counter