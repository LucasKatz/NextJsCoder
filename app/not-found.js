"use client"

import { useRouter } from "next/navigation"; 
export default function NotFound() {
    const router = useRouter();

    
    setTimeout(() => {
        router.push("/");
    }, 5000); 

    return (
        <>
            <main className="container m-auto">
                <h1>THE REQUESTED PAGE HAS NOT BEEN FOUND</h1>
                <h2>You will soon be redirected to the home page of this website</h2>
            </main>
        </>
    );
}