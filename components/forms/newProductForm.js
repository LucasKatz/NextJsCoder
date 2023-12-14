"use client"

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { dataBase, fireStorage} from "@/services/firebase";
import Button from "../userint/button";
import Swal from "sweetalert2";
import Link from "next/link";

const CreateProductForm = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    stock: 0,
    price: 0,
    type: "",
    slug: "",
  });
  const [file, setFile] = useState(null)

  const createProduct = async (values,file) => {
    try {

      const storageRef = ref(fireStorage, values.slug)
      const fileSnapshot = await uploadBytes(storageRef, file)
      const fileURL = await getDownloadURL(fileSnapshot.ref)
      const docRef = doc(dataBase, "products", values.slug);
      await setDoc(docRef, { ...values, image:fileURL });
      console.log("Producto Agregado con éxito");
      return { ok: true };
    } catch (error) {
      console.error("Error adding product:", error);
      return { ok: false };
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const { title, slug, description, price, size, category, stock } = values;

    if (!title || !slug || !description || !price || !size || !category|| !stock) {
      Swal.fire({
        title: "Please complete the product`s data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else {
      try {
        const response = await createProduct(values, file);

        if (response.ok) {
          Swal.fire({
            title: "Product Created",
            icon: "success",
            buttons: true,
          });
        } else {
          Swal.fire({
            title: "Oops! There`s been a mistake",
            icon: "error",
            buttons: true,
          });
        }

        console.log(
          "These are the values" +
            title +
            slug +
            category +
            description +
            price +
            size
        );

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
  };

  return (
    <>
      <form onSubmit={Handlesubmit}>
        <div className="mx-auto py-5 h-fit">
          <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">
            New Product
          </h1>
          <div className="form flex flex-col items-center bg-bg-color-5 w-1/2 m-auto p-5 rounded-md text-start h-fit">
            <input
              value={values.title}
              onChange={handleChange}
              type="text"
              pattern="[a-zA-Z ]{1,35}"
              name="title"
              className="form-input mb-4 w-2/3"
              placeholder="Title"
              required
            />
            <input
              value={values.slug}
              onChange={handleChange}
              type="text"
              name="slug"
              className="form-input mb-4 w-2/3"
              placeholder="Slug"
              required
            />
            <input
              value={values.description}
              onChange={handleChange}
              type="text"
              name="description"
              className="form-input mb-4 w-2/3"
              placeholder="Description"
              required
            />
            
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              name="image"
              className="form-input mb-4 w-2/3"
              placeholder="Image"
              required
            /> 
            <input
              value={values.price}
              onChange={handleChange}
              type="number"
              name="price"
              className="form-input mb-4 w-2/3"
              placeholder="Price"
              required
            />
            <input
              value={values.size}
              onChange={handleChange}
              type="text"
              name="size"
              placeholder="Size"
              className="w-2/3 mb-4"
              required
            />
            <input
              value={values.category}
              onChange={handleChange}
              type="text"
              name="category"
              placeholder="Category"
              className="w-2/3 mb-4"
              required
            />
            <input
              type="number"
              value={values.stock}
              required
              placeholder="Stock"
              className="w-2/3"
              name="stock"
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>

      <div className="flex flex-row items-center justify-center my-5">
        <Link
          href={"/login"}
          className=" m bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2"
        >
          Logout
        </Link>

        <Link
          href={"/admin"}
          className=" m bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2"
        >
          Back to Panel
        </Link>
      </div>
    </>
  );
};

export default CreateProductForm;
