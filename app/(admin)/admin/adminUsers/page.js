import AdminUserDetail from "@/components/admin/adminUsersDetail";

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `Night Owl - Admin Panel - Users`,
    }
}

const AdminProducts = () => {


    return (
        <main className="container m-auto">
            <AdminUserDetail/>
        </main>
    );
};

export default AdminProducts;
