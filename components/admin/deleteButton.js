"use client"

import { FaTrash } from 'react-icons/fa';
import { deleteDoc, doc } from 'firebase/firestore';
import { dataBase } from "../../services/firebase/index";
import { toast } from 'react-toastify';

const DeleteButton = ({ slug, onDeleteSuccess }) => {
  const deleteProduct = async () => {
    try {
      await deleteDoc(doc(dataBase, 'products', slug));
      toast.success('Product deleted successfully');
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
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
