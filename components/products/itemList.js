import { getProducts } from "@/app/(shop)/api/productsApi"
import ProductCard from "./itemCard"

const ProductsList = async ({ categories }) => {
    const items = await getProducts(categories);
    console.log("a ver queonda" + items)

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <ProductCard key={item.slug} item={item}/>)
            }
        </section>
    )
}

export default ProductsList
