"use client"

import React, { useReducer } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { dataBase, fireStorage } from "@/services/firebase";
import { useAuthContext } from "../context/AuthContext";
import Button from "@/components/userint/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const updateProduct = async (slug, values, file) => {
  try {
    let fileURL = values.image;

    if (file) {
      const storageRef = ref(fireStorage, values.slug);
      const fileSnapshot = await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(fileSnapshot.ref);
    }

    const docRef = doc(dataBase, "products", slug);
    await updateDoc(docRef, {
      title: values.title,
      description: values.description,
      inStock: Number(values.inStock),
      price: Number(values.price),
      image: fileURL,
    });

    return { ok: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { ok: false, error };
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FILE":
      return { ...state, file: action.file };
    default:
      return state;
  }
};

const EditForm = ({ product }) => {
  const { logout } = useAuthContext();

  const { title, description, price, category, size, image, slug } = product;

  const initialState = {
    title,
    description,
    price,
    slug,
    category,
    size,
    image,
    file: null,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleFileChange = (e) => {
    dispatch({ type: "SET_FILE", file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProduct(slug, state, state.file);

      if (response.ok) {
        toast.success("Product Updated", { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error(`Oops! There's been a mistake. Error: ${response.error.message}`, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something happened. Please refresh and try again", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mx-auto py-5 h-fit">
          <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">
            Update your Product
          </h1>
          <div className="form flex flex-col items-center bg-bg-color-5 w-1/2 m-auto p-5 rounded-md text-start h-fit">

          <label className="font-bold">Title</label>
            <input
              value={state.title}
              onChange={handleChange}
              type="text"
              name="title"
              className="form-input mb-4 w-2/3"
              placeholder="Title"/>

          <label className="font-bold">Slug</label>
            <input
              value={state.slug}
              onChange={handleChange}
              type="text"
              name="slug"
              className="form-input mb-4 w-2/3"
              placeholder="Slug"/>

          <label className="font-bold">Description</label>
            <input
              value={state.description}
              onChange={handleChange}
              type="text"
              name="description"
              className="form-input mb-4 w-2/3"
              placeholder="Description"/>

          <label className="font-bold">Image</label>            
          <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="form-input mb-4 w-2/3"
              placeholder="Image"
            />

          <label className="font-bold">Price</label>
            <input
              value={state.price}
              onChange={handleChange}
              type="number"
              name="price"
              className="form-input mb-4 w-2/3"
              placeholder="Price"/>

          <label className="font-bold">Size</label>    
            <input
              value={state.size}
              onChange={handleChange}
              type="text"
              name="size"
              placeholder="Size"
              className="w-2/3 mb-4"/>

          <label className="font-bold">Category</label>    
            <input
              value={state.category}
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