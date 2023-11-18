import CategoriesMenu from "@/components/products/categoriesNav"
import { Suspense } from "react"
import Image from "next/image"


const ProductsLayout = ({children}) => {

    return (
        <div className="container m-auto">
            <CategoriesMenu/>
            <Suspense fallback = {
                <div className="flex items-center justify-center m-auto w-full">
                <Image
                    src="/images/logo.jpeg"
                    alt="Night Owl Logo"
                    width={190}
                    height={210}
                    className="animate-pulse m-auto py-14"
                />
            </div>
            }>
            {children}
            </Suspense>
        </div>
    )
}

export default ProductsLayout
