"use client"

import { useEffect } from 'react';
import ClientForm from './contactForm';

const metadata = { title: "Night Owl Resources - Contact" };

export default function Contact() {
    useEffect(() => {

        document.title = metadata.title;
    }, []);

    return (
        <>
            <ClientForm />
        </>
    );
}