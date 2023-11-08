import Link from "next/link"
import Image from "next/image"
import Button from "../userint/button"


const ProductCard = ({item}) => {
    return (
        <div className="contenedorLista my-5">

        <div className="bg-orange-300 p-5 rounded-md">
            <Link href={`/products/detail/${item.slug}`}>
                <Image
                    alt={item.title}
                    src={`/images/products/${item.image}`}
                    width={270}
                    height={270}
                    className="mx-auto my-5" // Centra la imagen horizontal y agrega margen superior e inferior
                />
                <div className="price text-center"> {/* Centra el título */}
                    <h3>{item.title}</h3>
                </div>
                <div className="linkContainer flex justify-center"> {/* Centra el botón */}
                    <Button href={`/products/detail/${item.slug}`}>Ver detalle</Button>
                </div>
            </Link>
        </div>
    
    </div>
    
    )
}

export default ProductCard