

import { collection, getDocs, query, where } from 'firebase/firestore';
import { dataBase } from '@/services/firebase';

export const getProducts = async (categories) => {
    const productsFire = collection(dataBase, "products");

    let items;

    if (categories === 'all') {
        const allProductsQuery = await getDocs(productsFire);
        items = allProductsQuery.docs.map(doc => doc.data());

    } else {
        const categoryQuery = query(productsFire, where('category', '==', categories));
        const categoryQuerySnapshot = await getDocs(categoryQuery);
        items = categoryQuerySnapshot.docs.map(doc => doc.data());
    
    }

    return items;
};

export const getProductBySlug = async (slug) => {
    const productsFire = collection(dataBase, "products");
    
    const slugQuery = query(productsFire, where('slug', '==', slug));
    const slugQuerySnapshot = await getDocs(slugQuery);
    const product = slugQuerySnapshot.docs.map(doc => doc.data())[0];
    
    console.log('Product by Slug:', product);
    
    return product;
};