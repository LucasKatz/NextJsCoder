import Link from "next/link"
import Image from "next/image"



const ProductCard = ({item}) => {
console.log(item)
    return (
        <div className="contenedorLista my-5 ">
          <div className="bg-bg-color-5 p-5  text-center rounded-lg">
            <Link href={`/products/detail/${item.slug}`}>
              <Image
                alt={item.title}
                src={`/images/products/${item.image}`}
                width={270}
                height={270}
                className="mx-auto my-5 rounded-md"/>
              <div> 
                <h3 className="text-center font-bold ">{item.title}</h3>
              </div>
              <div className="linkContainer mt-3"> 
                <button href={`/products/detail/${item.slug}`} className="font-semibold text-purple-900">
                  Ver detalle
                </button>
              </div>
            </Link>
          </div>
        </div>
      );
      
}

export default ProductCard