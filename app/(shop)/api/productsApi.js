

import { collection, getDocs, query, where } from 'firebase/firestore';
import { dataBase } from '@/services/firebase';

export const getProducts = async (categories) => {
    const productsFire = collection(dataBase, "products");

    let items;

    if (categories === 'todos') {
        const allProductsQuery = await getDocs(productsFire);
        items = allProductsQuery.docs.map(doc => doc.data());
        console.log('Items from Firebase:', items);
    } else {
        const categoryQuery = query(productsFire, where('category', '==', categories));
        const categoryQuerySnapshot = await getDocs(categoryQuery);
        items = categoryQuerySnapshot.docs.map(doc => doc.data());
        console.log('Items from Firebase:', items);
    }

    return items;
};
