import PurchaseForm from "../../../components/forms/purchaseForm"

export async function generateMetadata() {

    return {
        title: `Night Owl - Payment`,
    }
}

export default function Contact() {


    return (
        <>
            <PurchaseForm />
        </>
    );
}