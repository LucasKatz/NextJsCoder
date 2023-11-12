import AdminDetail from "@/components/adminComponents/adminDetail";
import Link from "next/link";
import Button from "@/components/userint/button";

const AdminProducts = ({ params }) => {
    const categories = params?.categories ?? "todos";

    return (
        <main className="container m-auto">
            <AdminDetail/>

        </main>
    );
};

export default AdminProducts;

