

import { collection, getDocs, query, where } from 'firebase/firestore';
import { dataBase } from '../../../services/firebase/index';

export const getProducts = async (categories, language) => {
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

    // Filtrar por idioma
    if (language) {
        const languageQuery = query(productsFire, where('language', '==', language));
        const languageQuerySnapshot = await getDocs(languageQuery);
        items = items.filter(item => {
            return languageQuerySnapshot.docs.some(doc => doc.id === item.id);
        });
    }

    return items;
};


export const getProductBySlug = async (slug) => {
    const productsFire = collection(dataBase, "products");
    
    const slugQuery = query(productsFire, where('slug', '==', slug));
    const slugQuerySnapshot = await getDocs(slugQuery);
    const product = slugQuerySnapshot.docs.map(doc => doc.data())[0];
    console.log("productAPI" ,slug)
    
    return product;
};

export const getUsers = async () => {
    const usersCollection = collection(dataBase, "users");

    try {
        const usersQuerySnapshot = await getDocs(usersCollection);
        const usersList = usersQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
    }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};