"use client"

import { useEffect } from 'react';
import CartDetail from "@/components/products/cartDetail";

const metadata = { title: "Night Owl Resources - Cart" };

export default function Cart() {
    useEffect(() => {

        document.title = metadata.title;
    }, []);

    return (
        <>
            <CartDetail />
        </>
    );
}