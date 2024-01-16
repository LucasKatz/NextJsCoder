"use client"

import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button from "../userint/button";
import DeleteButton from "./deleteButton";
import { useAuthContext } from "../context/AuthContext";
import { getProducts } from "../../app/(shop)/api/productsApi";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';


const AdminDetail = () => {
  const [items, setItems] = useState([]);
  const { logout } = useAuthContext();


  const fetchProducts = async () => {
    try {
      const categories = 'all';
      const products = await getProducts(categories);
      setItems(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 


  const handleDeleteSuccess = async () => {
    fetchProducts();
    console.log("Funciona Refresh");
  };



  return (
    <>
      <div className="p-5 ">
        <h2 className="text-center text-text-color-5 text-3xl font-semibold py-5">Admin Panel</h2>
        <div className="flex flex-wrap">
          {items.map((product) => (
            <div key={product.slug} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="border-white border-8 p-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-text-color-5 text-xl font-semibold">{product.title}</h3>
                  <div className="text-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 mx-auto"
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-text-color-5">
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p className="text-white">
                    <strong>Description:</strong> {product.description}
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="bg-blue-500 text-text-color-5 px-4 py-2 rounded-md">
                    <FaEdit />
                    <Link href={`/admin/edit/${product.slug}`}>Edit</Link>
                  </button>
                  <button className="bg-red-500 text-text-color-5 px-4 py-2 rounded-md ml-4">
                    <DeleteButton slug={product.slug} onDeleteSuccess={handleDeleteSuccess} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center my-5">
          <Button onClick={logout}>Log Out</Button>
          <Button className="">
            <Link href={"/admin/create"}>Create New Product</Link>
          </Button>
          <Link className="buttonUI text-center" href={"/admin/adminUsers"}>
            Users Panel
          </Link>
        </div>
      </div>
    </>
  );
  
  }  

export default AdminDetail;

