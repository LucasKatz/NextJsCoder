"use client"

import { getProductBySlug } from "@/app/(shop)/api/productsApi"
import { useState } from "react"
import Image from "next/image"
import Counter from "../userint/counter"
import Link from "next/link"



const ProductDetail = async ({ slug }) => {
 
    const item = await getProductBySlug(slug);

    if (!item) {
        // Manejar el caso en el que no se encuentra el producto
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="max-w-4xl m-auto ">
            <section className="flex gap-6 my-5  bg-bg-color-5 rounded-md">
                <div className=" p-5 items-center align-middle">
                    <Image
                        src={`/images/products/${item.image}`}
                        alt={item.title}
                        width={560}
                        height={560}
                        className="rounded-lg py-14"/>
                </div>
                <div className="basis-1/2 m-auto text-center p-5">
                    <h2 className="text-2xl font-semibold  pb-4 mb-4  text-purple-900">{item.title}</h2>
                    <p className="text-2xl text-purple-900">Price: $ {item.price}</p>

                    <h3 className="text-2xl font-semibold   pb-4 my-7 text-purple-900">Description:</h3>
                    <p className="font-semibold text-purple-900">{item.description}</p>
                    
                    
                    <h3 className="text-2xl font-semibold   pb-4 my-7 text-purple-900">Size:</h3>
                    <p className="font-semibold text-purple-900">{item.size}</p>

                    <div className="my-5 text-center">
                        <div className="flex items-center">
                            <Counter item={item}  />
                            <button className="text-l bg-purple-900 text-white rounded-md p-auto ml-4 w-40 h-12">Add to Cart</button>
                        </div>
                        <div className="my-8">
                            <Link href="/products/todos" className="text-l bg-purple-900 text-white my-5 rounded-md p-5">Back to Catalogue</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail