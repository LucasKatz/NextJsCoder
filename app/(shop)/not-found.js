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
                <div className="m-auto bg-orange-300 text-center">
                <h1 className="m-auto py-12 text-2xl font-semibold text-purple-900">THE REQUESTED PAGE HAS NOT BEEN FOUND</h1>
                <h2 className="m-auto py-12 text-2xl font-semibold text-purple-900">You will soon be redirected to the home page of this website</h2>
                </div>
            </main>
        </>
    );
}