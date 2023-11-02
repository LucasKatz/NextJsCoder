import ProductsList from "@/components/products/itemList"
import CategoriesMenu from "@/components/products/categoriesNav"

export async function generateMetadata({params, searchParams}, parent) {

    return {
        title: `CoderApp - ${params.categoria}`,
    }
}

const Productos = ({params}) => {
    const { category } = params

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 border-b pb-4">Products</h2>

            <div className="flex gap-10">
                <CategoriesMenu />
                <ProductsList categories={category}/>
            </div>
        </main>
    )
}

export default Productos