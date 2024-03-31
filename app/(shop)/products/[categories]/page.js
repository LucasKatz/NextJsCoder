"use client"

import { useState } from 'react';
import ProductsList from "../../../../components/products/itemList";

const Productos = ({ params }) => {
  const { categories, language } = params;

  const [items, setItems] = useState([]);

  return (
    <main className="container m-auto">
      <h2 className="text-2xl my-10 pb-4 text-center text-text-color-5 font-extrabold">
        Products
      </h2>

      <div className="flex gap-10">
        <ProductsList categories={categories} items={items} page={1} pageSize={10} />
      </div>
    </main>
  );
};

export default Productos;
