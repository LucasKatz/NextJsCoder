"use client"

import { getProductBySlug } from "@/app/(shop)/api/productsApi";
import Image from "next/image";
import Counter from "../userint/counter";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import { useState, useEffect } from "react";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const ProductDetail = ({ slug }) => {
  const { addProduct } = useCart();
  const [productToAdd, setProductToAdd] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductBySlug(slug);
        setProductToAdd(product);
      } catch (error) {
        console.error(`Error fetching product with slug ${slug}:`, error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
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
    <div className="max-w-4xl m-auto ">
      <section className="flex gap-6 my-5  bg-bg-color-5 rounded-md">
        <div className="p-5 productToAdds-center align-middle">
          <Image
            src={`/images/products/${productToAdd.image}`}
            alt={productToAdd.title}
            width={560}
            height={560}
            className="rounded-lg py-14 items-center"
          />
        </div>
        <div className="basis-1/2 m-auto text-center p-5 flex flex-col">

            <p className="text-2xl font-semibold  pb-4 mb-4  text-purple-900">{productToAdd.title}</p>

            <div className="flex flex-row items-center justify-center">
            <p className="ml-4 text-xl font-semibold text-purple-900">Price: $ {productToAdd.price}</p>
            </div>

            <div className="flex flex-row items-center justify-center">
            <p className="text-xl font-semibold  text-purple-900">Description:</p>
            <p className="ml-4 font-semibold text-xl text-purple-900">{productToAdd.description}</p>
            </div>     

            <div className="flex flex-row items-center justify-center">       
            <p className="text-xl font-semibold    text-purple-900">Size:</p>
            <p className="ml-4 text-xl font-semibold text-purple-900">{productToAdd.size}</p>
            </div> 

          <div className="my-5 text-center">
              <Counter quantity={quantity} setQuantity={setQuantity}/>
            <div className="flex productToAdds-center">
              <button
                className="text-l bg-purple-900 text-white rounded-md p-auto ml-4 w-40 h-12"
                onClick={handleAddToCart}>
                Add to Cart
              </button>

              
              <button className="text-l bg-purple-900 text-white rounded-md p-auto ml-4 w-40 h-12">
                <Link href={"/cart"}>
                Go to Cart
                </Link>
              </button>
            </div>
            <div className="my-8">
              <Link
                href="/products/todos"
                className="text-l bg-purple-900 text-white my-5 rounded-md p-5"
              >
                Back to Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
