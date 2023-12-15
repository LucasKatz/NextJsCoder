"use client"

import { useState } from "react";
import { doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { dataBase, fireStorage} from "@/services/firebase";
import Button from "@/components/userint/button";
import Swal from "sweetalert2";

const updateProduct = async (slug, values, file) => {
  try {
    let fileURL = values.image;

    if (file) {
      const storageRef = ref(fireStorage, `products/${slug}`);
      const fileSnapshot = await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(fileSnapshot.ref);
    }

    const docRef = doc(dataBase, "products", slug);
    await updateDoc(docRef, {
      title: values.title,
      description: values.description,
      price: Number(values.price),
      image: fileURL,
      category: values.category,
      size: values.size,
      slug: values.slug,
    });

    console.log("Product Updated");

    return { ok: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { ok: false };
  }
};

const EditForm= ({product}) => {

  const { title, description, price, type, image, slug } = product

    const [values, setValues] = useState({
      title: product.title,
      description: product.description,
      price: product.price,
      slug: product.slug,
      category: product.category,
      size: product.size
    });
    

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    const { title, slug, description, price, size, category,image } = values;


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
  };

  return (
    <>
      <form onSubmit={Handlesubmit} encType="multipart/form-data">
        <div className="mx-auto py-5 h-fit">
          <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">
            Update your Product
          </h1>
          <div className="form flex flex-col items-center bg-bg-color-5 w-1/2 m-auto p-5 rounded-md text-start h-fit">
            <input
              value={values.title}
              onChange={handleChange}
              type="text"
              name="title"
              className="form-input mb-4 w-2/3"
              placeholder="Title"
            />
            <input
              value={values.slug}
              onChange={handleChange}
              type="text"
              name="slug"
              className="form-input mb-4 w-2/3"
              placeholder="Slug"
            />
            <input
              value={values.description}
              onChange={handleChange}
              type="text"
              name="description"
              className="form-input mb-4 w-2/3"
              placeholder="Description"
            />
            
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="form-input mb-4 w-2/3"
              placeholder="Image"
            />
            <input
              value={values.price}
              onChange={handleChange}
              type="number"
              name="price"
              className="form-input mb-4 w-2/3"
              placeholder="Price"
            />
            <input
              value={values.size}
              onChange={handleChange}
              type="text"
              name="size"
              placeholder="Size"
              className="w-2/3 mb-4"
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
        <Button href={"/login"}className="px-4 py-2 cursor-pointer rounded mr-2">
          Logout
        </Button>

        <Button href={"/admin"} className=" px-4 py-2 cursor-pointer rounded mr-2">
          Back to Panel
        </Button>
      </div>
    </>
  );
};

export default EditForm;