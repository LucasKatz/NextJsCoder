"use client"

import Image from "next/image";     
import { useEffect } from "react";

const Loader = () => {

    useEffect(() => {

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth', 
            });
        };

    
        scrollToTop();
    }, []); 

    return (
        <div className="flex items-center justify-center m-auto w-full">
            <Image
                src="/images/logo.jpeg"
                alt="Night Owl Logo"
                width={190}
                height={210}
                className="animate-pulse m-auto py-14"
            />
        </div>
    );
};

export default Loader;