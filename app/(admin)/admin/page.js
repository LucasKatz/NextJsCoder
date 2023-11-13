import AdminDetail from "./adminDetail";

export async function generateMetadata({params, searchParams}, parent) {
    console.log(params)
  
    return {
        title: `Night Owl - Admin Panel`,
    }
  }

const AdminProducts = ({ params }) => {
    const categories = params?.categories ?? "todos";

    return (
        <main className="container m-auto">
            <AdminDetail/>

        </main>
    );
};

export default AdminProducts;

