import { NextResponse } from 'next/server';
import { getProducts } from '../../productsApi';

export const GET = async (_, { params }) => {
    const { categories } = params;
    console.log('Category:', categories);

    if (!categories) {
        return NextResponse.json({ error: 'Categoria no proporcionada' }, { status: 400 });
    }

    const items = await getProducts(categories);

    return NextResponse.json(items);
};




{/*const sleep = async (timer) => new Promise((resolve) => setTimeout(resolve, timer))

export const GET = async (_, { params }) => {
    const { categoria } = params
    
    const items = categoria === 'all'
                    ? MockProducts
                    : MockProducts.filter(product => product.type === categoria)

    await sleep(3000)

    return NextResponse.json(items)
}*/}