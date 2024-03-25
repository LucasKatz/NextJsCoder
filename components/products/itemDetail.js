"use client"

import { getProductBySlug } from "../../app/(shop)/api/productsApi";
import { useAuthContext } from "../context/AuthContext";
import Image from "next/image";
import Counter from "../userint/counter";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Loader from "../../app/(shop)/products/detail/[slug]/loading";

const ProductDetail = ({ product }) => {
  const {image,slug} = product 

  
  const { addProduct } = useCart();
  const [productToAdd, setProductToAdd] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!slug) {

          console.error("Slug is undefined");
          return;
        }

        const product = await getProductBySlug(slug);
        setProductToAdd(product);
      } catch (error) {
        console.error(`Error fetching product with slug ${slug}:`, error);
      }
    };

    fetchProduct();
  }, [slug]);

  
  const handleAddToCart = () => {
    addProduct(productToAdd, quantity);
  };
  

  if (!productToAdd) {
    return <Loader/>; 
  }



  return (
<div className="m-auto w-3/4">
  <section className="flex flex-col md:flex-row gap-6 my-5 bg-bg-color-5 rounded-md m-auto">
    <div className="basis-1/2 m-auto text-center p-5 flex flex-col md:w-1/2">
      <p className="text-2xl font-semibold pb-4 mb-4 text-purple-900">{product.title}</p>

      <div className="flex flex-row items-center justify-center">
        <p className="ml-4 text-xl font-semibold text-purple-900">Precio: $ {product.price}</p>
      </div>

      <div className="flex flex-row items-center justify-center">
        <p className="text-xl font-semibold text-purple-900">Descripción:</p>
        <p className="ml-4 font-semibold text-xl text-purple-900">{product.description}</p>
      </div>

      <div className="flex flex-row items-center justify-center">
        <p className="text-xl font-semibold text-purple-900">Medidas:</p>
        <p className="ml-4 text-xl font-semibold text-purple-900">{product.size}</p>
      </div>

      <div className="my-5 text-center">
        {!user.loggedIn && (
          <p className="text-red-500 font-semibold mb-4">
            Necesitas loguearte para comprar
          </p>
        )}
        <Counter quantity={quantity} setQuantity={setQuantity} />
        <div className="flex productToAdds-center flex-col md:flex-row">
          <button
            className={`buttonUIDetail`}
            onClick={handleAddToCart}
            disabled={!user.loggedIn}>
            Agregar al Carrito
          </button>
          <button className={`buttonUIDetail`}>
            <Link href={"/cart"}>
              Finalizar compra
            </Link>
          </button>
        </div>
        <div className="my-8">
          <button className={`buttonUIDetail`}>
            <Link href="/products/all">
              Ver Catalogo
            </Link>
          </button>
        </div>
      </div>
    </div>
    <div className="p-5 productToAdds-center align-middle">
      <Image
        src={image}
        alt={productToAdd.title}
        width={500}
        height={500}
        className="rounded-lg py-14 items-center"
      />
    </div>
  </section>
</div>

  );
  
  
  
};

export default ProductDetail;
