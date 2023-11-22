import Image from "next/image";
import Link from "next/link";
import Button from "../userint/button";
import { useCart } from "@/app/(shop)/cart/CartContext";



const CartDetail = async () => {
  const { cart, totalQuantity,id } = useCart();


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
          <Link href="/products/todos">
            <Button>Check Catalogue</Button>
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
          <li key={cartProduct.id}>
            <Image
              alt={cartProduct.title}
              src={`/images/products/${cartProduct.image}`}
              width={270}
              height={270}
              className="mx-auto my-5 rounded-md"
            />
            <h3 className="text-text-color-5 text-center font-semibold">
              {cartProduct.title}
            </h3>
            <p className="text-text-color-5 text-center font-semibold">
              {cartProduct.description}
            </p>
            <p className="text-text-color-5 text-center font-semibold">
              Price: ${cartProduct.price}
            </p>
            <p className="text-text-color-5 text-center font-semibold">
              Subtotal: ${cartProduct.price * cartProduct.quantity}
            </p>
          </li>
        ))}
      </ul>
      <h2 className="text-text-color-5 font-semibold">
        Total a Pagar:$ {cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}
      </h2>
      <h2 className="text-text-color-5 font-semibold">Metodo de Envio</h2>
      <h2 className="text-text-color-5 font-semibold">Metodo de Pago</h2>
    </div>
  );
};

export default CartDetail;
