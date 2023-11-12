import ProductDetail from "@/components/products/itemDetail"

export async function generateMetadata({params, searchParams}, parent) {
    console.log(params)

    return {
        title: `Night Owl -${params.slug}`,
    }
}


const DetailPage = ({params}) => {
   
    const {slug} = params

    return (
        <main className="container m-auto mt-10">
            <ProductDetail slug={slug}/>        
        </main>
    )
}

export default DetailPage