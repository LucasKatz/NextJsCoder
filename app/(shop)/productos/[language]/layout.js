//import CategoriesMenu from "../../../components/products/categoriesNav"
import CategoriesMenu from "@/components/products/categoriesNav"
import { Suspense } from "react"
import Loader from "../../products/detail/[slug]/loading"

const ProductsLayout = ({children}) => {

    return (
        <div className="container m-auto">

            <Suspense fallback = {
                <Loader/>}>
            {children}
            </Suspense>
        </div>
    )
}

export default ProductsLayout