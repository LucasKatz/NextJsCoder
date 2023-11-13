import { MockProducts } from "../products/asyncMock";
import { FaTrash, FaEdit } from "react-icons/fa";
import Image from "next/image";

const AdminDetail = () => {
  return (
    <div className="p-5">
      <h2>Cart Detail</h2>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/6">TITLE</th>
            <th className="w-1/6">PRICE</th>
            <th className="w-1/6">IMAGE</th>
            <th className="w-1/6">DESCRIPTION</th>
            <th className="w-1/6">EDIT</th>
            <th className="w-1/6">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {MockProducts.map((product) => (
            <tr key={product.slug}>
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
  );
};

export default AdminDetail;

