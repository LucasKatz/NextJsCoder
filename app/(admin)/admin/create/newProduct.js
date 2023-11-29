"use client"

import Button from "@/components/userint/button";
import Swal from "sweetalert2";
import { useState } from "react"



const CreateProductForm = ({ createProduct }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');


  const submit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !description || !image || !price|| !size || !category) {
      Swal.fire({
        title: 'PLease complete the product`s data',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });
    } else {
      try {

        if (response.ok) {
          Swal.fire({
            title: 'Product Created',
            icon: 'success',
            buttons: true,
          });

          createProduct(title, slug, description, image, price, size, category);
        } else {
          Swal.fire({
            title: 'Oops! There`s been a mistake',
            icon: 'error',
            buttons: true,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'Something happened. Please refresh and try again',
          icon: 'error',
          buttons: true,
        });
      }
    }
  };


    



    return (

      <form onSubmit={submit}>
<div className=" mx-auto py-5 h-fit">
    <h1 className="text-center py-5 text-2xl w-full text-text-color-5 font-extrabold">Get in touch with us!</h1>
  <div className="form flex flex-col items-center  bg-bg-color-5  w-1/2 m-auto p-5 rounded-md text-start h-fit">
  
    <input
      value={name}
      onChange={(e) => setTitle(e.target.value)}
      type="text"
      pattern="[a-zA-Z ]{1,35}"
      className="form-input mb-4 w-2/3"
      placeholder="Title"
      required
    />
    <input
      value={surname}
      onChange={(e) => setSlug(e.target.value)}
      type="text"
      className="form-input mb-4 w-2/3"
      placeholder="Slug"
      required
    />
    <input
      value={email}
      onChange={(e) => setDescription(e.target.value)}
      type="email"
      className="form-input mb-4 w-2/3"
      placeholder="Description"
      required
    />
    <input
      value={checkEmail}
      onChange={(e) => setImage(e.target.value)}
      type="email"
      className="form-input mb-4 w-2/3"
      placeholder="Image"
      required
    />
    <input
      value={phone}
      onChange={(e) => setPrice(e.target.value)}
      type="number"
      className="form-input mb-4 w-2/3"
      placeholder="Price"
      required
    />
    <input
      value={message}
      onChange={(e) => setSize(e.target.value)}
      type="text"
      placeholder="Size"
      className="w-2/3 h-24"
      required
    />
      <input
      value={message}
      onChange={(e) => setCategory(e.target.value)}
      type="text"
      placeholder="Category"
      className="w-2/3 h-24"
      required
    />
   
    <Button>
      Submit
    </Button>
  </div>
</div>
</form>

        
)
}

            
export default CreateProductForm