import ProductDetail from "@/components/products/itemDetail"

const DetailPage = ({params}) => {
    const {slug} = params
    console.log("hasta aca todo bien")
    console.log (ProductDetail)
    return (
        <main className="container m-auto mt-10">
            <ProductDetail slug={slug}/>        
        </main>
    )
}

export default DetailPage