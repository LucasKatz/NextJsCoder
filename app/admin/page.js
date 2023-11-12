import AdminProductsList from "@/components/adminComponents/productList";
import Link from "next/link";
import Button from "@/components/userint/button";

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
            <h2 className="text-2xl my-10 pb-4 text-center text-purple-900 font-extrabold">Admin Panel</h2>

            
            <div className="my-5 mx-11 ">
                <Button className="text-white  bg-purple-900 rounded-md"> Create New Product</Button>
            </div>

            <div className="flex gap-10">
                <AdminProductsList categories={categories}/>
            </div>

            <div className="my-5 mx-11 ">
                <Button className="text-white  bg-purple-900 rounded-md">
                <Link href={"/login"}  className="text-white  bg-purple-900 rounded-md"> Logout</Link>
                </Button>
            </div>
        </main>
    );
};

export default AdminProducts;

