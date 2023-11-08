import CategoriesMenu from "@/components/products/categoriesNav"


const ProductsLayout = ({children}) => {

    return (
        <div className="container m-auto">
            <CategoriesMenu/>
            {children}
        </div>
    )
}

export default ProductsLayout
