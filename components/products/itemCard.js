import Link from "next/link"
import Image from "next/image"

const ProductCard = ({item}) => {

  const {title,image,slug} = item
  console.log("item", item)


    return (
      <div className="contenedorLista my-5 ">
        <div className="bg-bg-color-5 p-5  text-center rounded-lg">
            <Link href={`/products/detail/${slug}`}>
                <Image
                  alt={title}
                  src={image}
                  width={270}
                  height={270}
                  className="mx-auto my-5 rounded-md"/>
              <div> 
                  <h3 className="text-center font-bold ">{title}</h3>
              </div>
              <div className={`buttonUI`}> 
                    Check It!
              </div>
            </Link>
        </div>
      </div>
    );
      
}

export default ProductCard