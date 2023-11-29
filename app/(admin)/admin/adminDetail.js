import { FaTrash, FaEdit } from "react-icons/fa";
import { getProducts } from "@/app/(shop)/api/productsApi";
import Image from "next/image";
import Link from "next/link";


const AdminDetail = async () => {

  const response = await fetch(`http://localhost:3000/api/products/todos`, {

  cache:"no-store"
        
})
const items = await response.json()

  return (
    <>
    <div className="p-5 ">
      <h2 className="text-center text-text-color-5 text-3xl font-semibold py-5">Admin Panel</h2>
      <table className="table-fixed w-full ">
        <thead>
          <tr>
            <th className="w-1/6 text-text-color-5">TITLE</th>
            <th className="w-1/6 text-text-color-5">PRICE</th>
            <th className="w-1/6 text-text-color-5">IMAGE</th>
            <th className="w-1/6 text-text-color-5">DESCRIPTION</th>
            <th className="w-1/6 text-text-color-5">EDIT</th>
            <th className="w-1/6 text-text-color-5">DELETE</th>
          </tr>
        </thead>
        <tbody >
          {items.map((product) => (
            <tr key={product.slug} className="border-white border-8">
              <td className="text-center text-text-color-5">{product.title}</td>
              <td className="text-center text-text-color-5">${product.price}</td>
              <td className="text-center">
                <Image
                    src={`/images/products/${product.image}`}
                    alt={product.title}
                    className="w-20 h-20 mx-auto"
                    width={40}
                    height={40}
                />
              </td>
              <td className="text-center text-white">{product.description}</td>
              <td className="text-center">
                <button className="bg-blue-500 text-text-color-5 px-4 py-2 rounded-md">
                  <FaEdit /> Edit
                </button>
              </td>
              <td className="text-center">
                <button className="bg-red-500 text-text-color-5 px-4 py-2 rounded-md">
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                <div className="flex flex-row items-center justify-center my-5">
                <Link href={"/login"}
                    className=" m bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
                    Logout
                </Link >

                <Link href={"/admin/create"}
                    className=" m bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
                    Create New Product
                </Link >
            </div>
            </>
  );
};

export default AdminDetail;

