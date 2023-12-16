import PurchaseForm from "@/components/forms/purchaseForm";

export async function generateMetadata() {

    return {
        title: `Night Owl - Contact`,
    }
}

export default function Contact() {


    return (
        <>
            <PurchaseForm />
        </>
    );
}