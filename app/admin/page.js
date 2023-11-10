import AdminProductsList from "@/components/adminComponents/productList";


export async function generateMetadata({ params, searchParams }, parent) {
    console.log("Estos son los params" + params);

    return {
        title: `Admin - ${params.categories ?? "todos"}`,
    };
}

const AdminProducts = ({ params }) => {
    const categories = params?.categories ?? "todos";

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 border-b pb-4 text-center">Admin Products</h2>

            <div className="flex gap-10">
                <AdminProductsList categories={categories}/>
            </div>
        </main>
    );
};

export default AdminProducts;

