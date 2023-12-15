"use client"

import { getProductBySlug } from "@/app/(shop)/api/productsApi";
import { useAuthContext } from "../context/AuthContext";
import Image from "next/image";
import Counter from "../userint/counter";
import Link from "next/link";
import Button from "../userint/button";
import { useCart } from "@/components/context/CartContext";
import { useState, useEffect } from "react";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const ProductDetail = ({ slug }) => {

  
  const { addProduct } = useCart();
  const [productToAdd, setProductToAdd] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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


  const { title, price, description, size, image } = productToAdd;

  return (
    <div className="max-w-4xl m-auto ">
      <section className="flex gap-6 my-5  bg-bg-color-5 rounded-md">
        <div className="p-5 productToAdds-center align-middle">
          <Image
            src={image}
            alt={productToAdd.title}
            width={560}
            height={560}
            className="rounded-lg py-14 items-center"
          />
        </div>
        <div className="basis-1/2 m-auto text-center p-5 flex flex-col">

            <p className="text-2xl font-semibold  pb-4 mb-4  text-purple-900">{title}</p>

            <div className="flex flex-row items-center justify-center">
                <p className="ml-4 text-xl font-semibold text-purple-900">Price: $ {price}</p>
            </div>

            <div className="flex flex-row items-center justify-center">
                <p className="text-xl font-semibold  text-purple-900">Description:</p>
                <p className="ml-4 font-semibold text-xl text-purple-900">{description}</p>
            </div>     

            <div className="flex flex-row items-center justify-center">       
                <p className="text-xl font-semibold    text-purple-900">Size:</p>
                <p className="ml-4 text-xl font-semibold text-purple-900">{size}</p>
            </div> 

          <div className="my-5 text-center">
                {!user.loggedIn && (
                  <p className="text-red-500 font-semibold mb-4">
                    You need to login to buy
                  </p>
                )}      
              <Counter quantity={quantity} setQuantity={setQuantity}/>
            <div className="flex productToAdds-center">
              <Button
                className="p-auto ml-4 w-40 h-12"
                onClick={handleAddToCart}
                disabled={!user.loggedIn}>
                Add to Cart
              </Button>

              
              <Button className="p-auto ml-4 w-40 h-12">
                <Link href={"/cart"}>
                Go to Cart
                </Link>
              </Button>
            </div>
            <div className="my-8">
              <Button
                href="/products/todos"
                className="my-2 rounded-md p-5"
              >
                Back to Catalogue
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
