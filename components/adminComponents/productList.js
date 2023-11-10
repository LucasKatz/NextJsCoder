import { MockProducts } from "../products/asyncMock"
import AdminProductCard from "./productCard"

const AdminProductsList = ({ categories }) => {
    const items = categories === 'todos' ? MockProducts : MockProducts.filter(item => item.categories === categories)

    return (
        <section className="container m-auto flex justify-center items-center gap-12 flex-wrap">
            {
                items.map(item => <AdminProductCard key={item.slug} item={item}/>)
            }
        </section>
    )
}

export default AdminProductsList