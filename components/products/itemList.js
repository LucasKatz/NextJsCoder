import { MockProducts } from "./asyncMock"
import ProductCard from "./itemCard"

const ProductsList = ({ categories }) => {
    const items = categories === 'todos' ? MockProducts : MockProducts.filter(item => item.categories === categories)

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <ProductCard key={item.slug} item={item}/>)
            }
        </section>
    )
}

export default ProductsList
