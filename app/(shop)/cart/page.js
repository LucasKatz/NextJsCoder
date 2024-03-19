
import CartDetail from "../../../components/products/cartDetail";

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `Night Owl - Carrito`,
    }
}

export default function Cart() {


    return (
        <>
            <CartDetail />
        </>
    );
}