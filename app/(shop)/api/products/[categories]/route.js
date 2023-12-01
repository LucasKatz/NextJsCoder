import { NextResponse } from 'next/server';
import { getProducts } from '../../productsApi';

export const GET = async (_, { params }) => {
    const { categories } = params;
    

    if (!categories) {
        return NextResponse.json({ error: 'Categoria no proporcionada' }, { status: 400 });
    }

    const items = await getProducts(categories);

    return NextResponse.json(items);
};




