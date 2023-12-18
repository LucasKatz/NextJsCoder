"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../userint/button";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";
import { useCart } from "@/components/context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";

const CartDetail = () => {
  const { cart, clearCart, removeProduct } = useCart();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    };

    fetchData();
  }, []); 

  if (loading) {
    return <Loader />;
  }

  if (!user.loggedIn) {

    return (
      <main className="container m-auto my-5 p-auto w-1/2">
        <div className="flex flex-col m-auto bg-orange-300 text-center rounded-md h-56">
          <h1 className="m-auto py-1/2 text-2xl font-semibold text-purple-900 justify-center">
            You need to be logged in to access the cart.
          </h1>
          <Link href={"/login"} className="m-auto py-1/2 text-xl font-semibold text-purple-900 justify-center">Login</Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {

    return (
      <main className="container m-auto my-5 p-auto w-1/2">
        <div className="m-auto bg-orange-300 text-center rounded-md">
          <h1 className="m-auto py-12 text-2xl font-semibold text-purple-900">
            There are no products in your cart
          </h1>
          <h2 className="m-auto py-12 text-2xl font-semibold text-purple-900">
            Click the button below to check our catalogue
          </h2>
          <Link href="/products/all" >
            <Button className="mb-5">Check Catalogue</Button>
          </Link>
        </div>
      </main>
    );
  }


  
  
  return (
    <div className="p-5 ">
      <h2>Cart Detail</h2>
      <ul className="flex flex-row gap-6 items-center justify-center">
        {cart.map((cartProduct) => (
          <li key={cartProduct.id} className="flex flex-col items-center">
            <Image
              alt={cartProduct.title}
              src={cartProduct.image}
              width={270}
              height={270}
              className="mx-auto my-5 rounded-md"
            />
            <h3 className="text-text-color-5 text-center font-semibold">
              {cartProduct.title}
            </h3>
            <p className="text-text-color-5 text-center font-semibold">
              Units: {cartProduct.quantity}
            </p>
            <p className="text-text-color-5 text-center font-semibold">
              Price: ${cartProduct.price}
            </p>
            <p className="text-text-color-5 text-center font-semibold">
              Subtotal: ${cartProduct.price * cartProduct.quantity}
            </p>
            <button onClick={() => removeProduct(cartProduct.title)} className="text-text-color-5 font-semibold w-1/2 justify-center bg-bg-color-2 rounded-md my-2">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-center my-7">
      <Button 
                onClick={clearCart}>Clear Cart
      </Button>
      <Button className="ml-5">
                <Link  href={"/payment"}>Proceed to Payment </Link>
      </Button>
      </div>
    </div>

    
  );
};

export default CartDetail;
