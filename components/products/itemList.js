"use client"

import { useEffect, useState } from 'react';
import { getProducts } from "@/app/(shop)/api/productsApi";
import ProductCard from "./itemCard";
import Loader from '@/app/(shop)/products/detail/[slug]/loading';

const ProductsList = ({ categories }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); 
    const pageSize = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts(categories);
                setAllProducts(products);
                setLoading(false);  
            } catch (error) {
                console.error('Error fetching products: ItemList', error);
                setLoading(false); 
            }
        };

        fetchProducts();
    }, [categories]);

    if (loading) {
        return <Loader />; 
    }
    

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
            &#8592; {/* Left Arrow*/}
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
            &#8594; {/* Right Arrow*/}
        </span>
    )}
</div>


        </div>
    );
};

export default ProductsList;
