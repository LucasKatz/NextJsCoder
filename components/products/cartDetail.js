import { CartMock } from "./cartMock";
import Image from "next/image";

const CartDetail = () => {
  return (
    <div className="p-5 ">
      <h2>Cart Detail</h2>
      <ul className="flex flex-row gap-6 items-center justify-center">
        {CartMock.map((product) => (
        <li key={product.slug}>
            <Image
                alt={product.title}
                src={`/images/products/${product.image}`}
                width={270}
                height={270}
                className="mx-auto my-5 rounded-md"/>
            <h3 className="text-white text-center font-semibold">{product.title}</h3>
            <p className="text-white text-center font-semibold">{product.description}</p>
            <p className="text-white text-center font-semibold">Price: ${product.price}</p>
        </li>
        ))}
      </ul>
        <h2 className="text-white font-semibold">Total a Pagar:$</h2>
        <h2 className="text-white font-semibold">Metodo de Envio </h2>
        <h2 className="text-white font-semibold">Metodo de Pago</h2>

    </div>
  );
};

export default CartDetail;
