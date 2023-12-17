"use client"
import React, { useReducer } from "react";

const counterReducer = (state, action) => {
switch (action.type) {
    case "INCREMENT":
        return { quantity: state.quantity + 1 };
    case "DECREMENT":
        return { quantity: state.quantity - 1 };
    default:
        return state;
}
};

const Counter = ({ quantity, setQuantity }) => {
    const [state, dispatch] = useReducer(counterReducer, { quantity });

    const increase = () => dispatch({ type: "INCREMENT" });
    const decrease = () => dispatch({ type: "DECREMENT" });

return (
    <div className="flex justify-center items-center gap-3 py-10">
        <button
        className="rounded-md bg-purple-900 text-text-color-5 font-extrabold w-12 h-12 text-2xl"
        onClick={decrease}>
        -
        </button>

        <p className="text-2xl">{state.quantity}</p>
        <button
            className="rounded-md bg-purple-900 text-text-color-5 font-extrabold w-12 h-12 text-2xl"
            onClick={increase}>
            +
        </button>
    </div>
);
};

export default Counter;

