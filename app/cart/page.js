"use client"

import Button from "@/components/userint/button";
import Link from "next/link";



export default function Cart() {


    return (
        <>
            <main className="container m-auto">
                <div className="m-auto bg-orange-300 text-center">
                <h1 className="m-auto py-12 text-2xl font-semibold text-purple-900">There are no products in your cart</h1>
                <h2 className="m-auto py-12 text-2xl font-semibold text-purple-900">Click the button below to check our catalogue</h2>
                    <Link href="/products/todos">
                      <Button>
                        Check Catalogue
                      </Button>
                    </Link>
                </div>
            </main>
        </>
    );
}