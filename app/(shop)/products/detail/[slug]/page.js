import ProductDetail from "@/components/products/itemDetail"


export async function generateMetadata({ params, searchParams }, parent) {
    console.log(params);

    return {
        title: `Night Owl - Products - ${params.slug}`,
    }
}



const DetailPage = async ({params}) => {

    const {slug} = params

    const response = await fetch(`http://localhost:3000/api/products/detail/${slug}`, {
        
})

const items = await response.json()

    return (
        <main className="container m-auto mt-10">
            <ProductDetail slug={slug}/>        
        </main>
    )
}

export default DetailPage