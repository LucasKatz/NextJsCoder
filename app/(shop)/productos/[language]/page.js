"use client"

import { useState } from 'react';
import ProductsList from "../../../../components/products/itemList";
import CategoriesMenu from '@/components/products/categoriesNav';

const Productos = ({ params }) => {
  const { language } = params;

  const [items, setItems] = useState([]);

  return (
    <main className="container m-auto">
      <h2 className="text-2xl mt-10 pb-4 text-center text-text-color-5 font-extrabold">
        Products
      </h2>

      <CategoriesMenu language={language} />


      <div className="flex gap-10">
        <ProductsList language={language} items={items} page={1} pageSize={10} />
      </div>
    </main>
  );
};

export default Productos;