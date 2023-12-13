"use client"

import { useEffect, useState } from 'react';
import { getProducts } from "@/app/(shop)/api/productsApi";
import ProductCard from "./itemCard";

const ProductsList = ({ categories }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts(categories);
            setAllProducts(products);
        };

        fetchProducts();
    }, [categories]);

    const paginatedProducts = allProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
                {paginatedProducts.map(item => (
                    <ProductCard key={item.slug} item={item} />
                ))}
            </section>

            <div className="pagination flex items-center justify-center mt-8">
    {currentPage > 1 && (
        <span
            onClick={() => handlePageChange(currentPage - 1)}
            className="cursor-pointer ml-2 p-2 text-white"
            style={{ fontSize: '1.5rem' }}
        >
            &#8592; {/* Flecha hacia la izquierda */}
        </span>
    )}

    <span className="mx-2 p-2 border rounded-full bg-blue-500 text-white">
        {currentPage}
    </span>

    {currentPage < Math.ceil(allProducts.length / pageSize) && (
        <span
            onClick={() => handlePageChange(currentPage + 1)}
            className="cursor-pointer ml-2 p-2 text-white"
            style={{ fontSize: '1.5rem' }}
        >
            &#8594; {/* Flecha hacia la derecha */}
        </span>
    )}
</div>


        </div>
    );
};

export default ProductsList;
