import ProductsList from "@/components/products/itemList"
import CategoriesMenu from "@/components/products/categoriesNav"

export async function generateMetadata({params, searchParams}, parent) {
    console.log(params)

    return {
        title: `Night Owl - ${params.categories}`,
    }
}

const Productos = ({params}) => {
    const { categories } = params

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 border-b pb-4">Products</h2>

            <div className="flex gap-10">
                <CategoriesMenu />
                <ProductsList categories={categories}/>
            </div>
        </main>
    )
}

export default Productos