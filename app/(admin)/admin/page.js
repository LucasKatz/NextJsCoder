import AdminDetail from "@/components/admin/adminDetail";

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `Night Owl - Admin Panel`,
    }
}

const AdminProducts = () => {


    return (
        <main className="container m-auto">
            <AdminDetail/>
        </main>
    );
};

export default AdminProducts;

