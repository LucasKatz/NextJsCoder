import ProductsList from "@/components/products/itemList"


export async function generateMetadata({params, searchParams}, parent) {
    console.log(params)

    return {
        title: `Night Owl - Products- ${params.categories}`,
    }
}

const Productos = async({params}) => {
    const { categories } = params
    
    const response = await fetch(`http://localhost:3000/api/productos/${categories}`, {
        
    })
    const items = await response.json()

    return (
        <main className="container m-auto">
            <h2 className="text-2xl my-10 pb-4 text-center text-text-color-5 font-extrabold">Products</h2>

            <div className="flex gap-10">
                <ProductsList categories={categories}/>
            </div>
        </main>
    )
}

export default Productos