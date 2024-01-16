import CategoriesMenu from "../../../../components/products/categoriesNav"
import { Suspense } from "react"
import Loader from "../detail/[slug]/loading"


const ProductsLayout = ({children}) => {

    return (
        <div className="container m-auto">
            <CategoriesMenu/>
            <Suspense fallback = {
                <Loader/>}>
            {children}
            </Suspense>
        </div>
    )
}

export default ProductsLayout
