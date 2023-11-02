import Link from "next/link"
import Image from "next/image"


const ProductCard = ({item}) => {
    return (
    <div className="contenedorLista">

        <div className="cardContainer">
        <Image
                    alt={item.title}
                    src={`/images/products/${item.image}`}
                    width={288}
                    height={288}
                    style={{objectFit: "contain"}}
                />
            <div className="detailsCard">
                <h5>{item.name}</h5>
            </div>
            <div className="price">
                <h5>${item.price}</h5>
            </div>
            <div className="linkContainer">
                <Link  href={`/products/detail/${item.slug}`}>Ver detalle</Link>
            </div>
        </div>
    
    </div>
    )
}

export default ProductCard