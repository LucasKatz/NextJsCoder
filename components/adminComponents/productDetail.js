import { MockProducts } from "../products/asyncMock"
import Image from "next/image"





const AdminProductDetail = ({ slug }) => {
    const item = MockProducts.find(p => p.slug === slug)

    return (
        <div className="max-w-4xl m-auto">
            <section className="flex gap-6 my-5  bg-orange-300">
                <div className="relative basis-1/2 p-4">
                    <Image
                        src={`/images/products/${item.image}`}
                        alt={item.title}
                        width={860}
                        height={860}
                    />
                </div>
                <div className="basis-1/2 m-auto">
                    <h2 className="text-2xl font-semibold border-b border-gray-200 pb-4 mb-4">{item.title}</h2>
                    <p className="text-4xl">$ {item.price}</p>


                    <h3 className="text-xl font-semibold border-b border-gray-200 pb-4 my-4">Description</h3>
                <p className="text-gray-600">{item.description}</p>
                </div>
            </section>
        </div>
    )
}

export default AdminProductDetail