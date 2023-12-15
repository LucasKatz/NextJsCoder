
import ContactForm from '../../../components/forms/contactForm';

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `Night Owl - Contact`,
    }
}

export default function Contact() {


    return (
        <>
            <ContactForm />
        </>
    );
}