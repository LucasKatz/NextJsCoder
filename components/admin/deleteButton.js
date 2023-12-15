"use client"

import { FaTrash } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { dataBase } from "@/services/firebase";

const DeleteButton = ({ slug }) => {
  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(dataBase, "products", slug));      
    } catch (error) {
      console.error("Error deleting product:", error);
      
    }
  };

  return (
    <button
      className="bg-red-500 text-text-color-5 px-4 py-2 rounded-md"
      onClick={deleteProduct}
    >
      <FaTrash /> Delete
    </button>
  );
};

export default DeleteButton;
