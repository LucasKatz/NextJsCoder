"use client"

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { dataBase, fireStorage} from "@/services/firebase";
import Button from "@/components/userint/button";
import Swal from "sweetalert2";
import Link from "next/link";



const updateProduct = async (slug, values, file) => {

    try{
    let fileURL = values.image

    if (file) {
        const storageRef = ref(fireStorage, values.slug)
        const fileSnapshot = await uploadBytes(storageRef, file)
        fileURL = await getDownloadURL(fileSnapshot.ref)
    }

    const docRef = doc(dataBase, "products", slug)
    return updateDoc(docRef, {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        image: fileURL
    })
        .then(() => console.log("Product Updated"))

    }catch(error) {
        console.error("Error updating product:", error);
        return { ok: false };
      }
}

const EditForm= ({item}) => {

    const { title, description, price, type, image, slug } = item
    const [values, setValues] = useState({
        title: item.title,
        description: item.description,
        price: 0,
        type: "",
        slug: "",
    });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const { title, slug, description, price, size, category } = values;

    if (!title || !slug || !description || !price || !size || !category) {
      Swal.fire({
        title: "Please complete the product`s data",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else {
      try {
        const response = await updateProduct(item.slug, values);

        if (response.ok) {
          Swal.fire({
            title: "Product Updated",
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
              onChange={handleChange}
              type="file"
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
              className="w-2/3"
              required
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

export default EditForm;