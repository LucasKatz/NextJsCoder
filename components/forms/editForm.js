"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { dataBase, fireStorage } from "@/services/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "@/components/userint/button";
import Swal from "sweetalert2";
import Link from "next/link";

// Función para actualizar un producto
const updateProduct = async (slug, values, file) => {

    let fileURL = values.image;

    console.log("File state before if:", file);
    if (file) {
      console.log("File state AFTER if:", file)
      const storageRef = ref(fireStorage, values.slug);
      const fileSnapshot = await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(fileSnapshot.ref);
    }

    const docRef = doc(dataBase, "products", slug);
    return updateDoc(docRef, {
      title: values.title,
      description: values.description,
      inStock: Number(values.inStock),
      price: Number(values.price),
      type: values.type,
      image: fileURL
  })
      .then(() => console.log("Producto actualizado correctamente"))
};

const EditForm = ({ product }) => {
  const { logout } = useAuthContext();

  const { title, description, price, type, image, slug } = product;

  const [values, setValues] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    slug: product.slug,
    category: product.category,
    size: product.size,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const Handlesubmit = async (e) => {

    try {
      const response = await updateProduct(product.slug, values, file);

      if (response.ok) {
        Swal.fire({
          title: "Product Updated",
          icon: "success",
          buttons: true,
        });
      } else {
        Swal.fire({
          title: "Oops! There's been a mistake",
          text: `Error: ${response.error.message}`,
          icon: "error",
          buttons: true,
        });
      }

      return { ok: true };
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Something happened. Please refresh and try again",
        icon: "error",
        buttons: true,
      });
    }
  }
  return (
    <>
      <form onSubmit={Handlesubmit} encType="multipart/form-data">
        <div className="mx-auto py-5 h-fit">
          <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">
            Update your Product
          </h1>
          <div className="form flex flex-col items-center bg-bg-color-5 w-1/2 m-auto p-5 rounded-md text-start h-fit">

          <label className="font-bold">Title</label>
            <input
              value={values.title}
              onChange={handleChange}
              type="text"
              name="title"
              className="form-input mb-4 w-2/3"
              placeholder="Title"/>

          <label className="font-bold">Slug</label>
            <input
              value={values.slug}
              onChange={handleChange}
              type="text"
              name="slug"
              className="form-input mb-4 w-2/3"
              placeholder="Slug"/>

          <label className="font-bold">Description</label>
            <input
              value={values.description}
              onChange={handleChange}
              type="text"
              name="description"
              className="form-input mb-4 w-2/3"
              placeholder="Description"/>

          <label className="font-bold">Image</label>            
          <input
              type="file"
              name="image"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-input mb-4 w-2/3"
              placeholder="Image"
            />

          <label className="font-bold">Price</label>
            <input
              value={values.price}
              onChange={handleChange}
              type="number"
              name="price"
              className="form-input mb-4 w-2/3"
              placeholder="Price"/>

          <label className="font-bold">Size</label>    
            <input
              value={values.size}
              onChange={handleChange}
              type="text"
              name="size"
              placeholder="Size"
              className="w-2/3 mb-4"/>

          <label className="font-bold">Category</label>    
            <input
              value={values.category}
              onChange={handleChange}
              type="text"
              name="category"
              placeholder="Category"
              className="w-2/3"
              required/>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>

      <div className="flex flex-row items-center justify-center my-5">
        <Button className="px-4 py-2 cursor-pointer rounded mr-2" onClick={logout}> 
            Logout
        </Button>

        <Button> 
          <Link href={"/admin"}className="px-4 py-2 cursor-pointer rounded mr-2">
            Back to Panel
          </Link>
        </Button>
      </div>
    </>
  );
};

export default EditForm;