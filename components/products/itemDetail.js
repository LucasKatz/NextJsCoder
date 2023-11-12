import { MockProducts } from "./asyncMock"
import Image from "next/image"
import Counter from "../userint/counter"




const ProductDetail = ({ slug }) => {
    const item = MockProducts.find(p => p.slug === slug)

    return (
        <div className="max-w-4xl m-auto ">
            <section className="flex gap-6 my-5  bg-orange-300 rounded-md">
                <div className=" p-5 items-center align-middle">
                    <Image
                        src={`/images/products/${item.image}`}
                        alt={item.title}
                        width={560}
                        height={560}
                        className="rounded-md"/>
                </div>
                <div className="basis-1/2 m-auto text-center p-5">
                    <h2 className="text-2xl font-semibold  pb-4 mb-4">{item.title}</h2>
                    <p className="text-4xl">Price: $ {item.price}</p>

                    <h3 className="text-xl font-semibold   pb-4 my-4">Description</h3>
                    <p className="text-gray-600">{item.description}</p>

                    <Counter item={item}/>
                    <div className="my-5 text-center">
                        <div>
                            <button className="text-2xl bg-purple-900 text-white rounded-md">Add to Cart</button>
                        </div>
                        <div className="my-5">
                            <button className="text-2xl bg-purple-900 text-white rounded-md">Back to Catalogue</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ProductDetail