"use client"

import { useEffect } from 'react';
import ContactForm from './contactForm';

const metadata = { title: "Night Owl Resources - Contact" };

export default function Contact() {
    useEffect(() => {

        document.title = metadata.title;
    }, []);

    return (
        <>
            <ContactForm />
        </>
    );
}