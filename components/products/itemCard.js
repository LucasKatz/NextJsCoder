import Link from "next/link"
import Image from "next/image"
import { useCart } from "../context/CartContext";

const ProductCard = ({ item }) => {
  const { title, image, slug } = item;
  const { addProduct } = useCart(); 

  return (
    <div className="contenedorLista my-5 ">
      <div className="bg-bg-color-5 p-5  text-center rounded-lg">
        <Link href={`/products/detail/${slug}`}>
          <Image
            alt={title}
            src={image}
            width={270}
            height={270}
            className="mx-auto my-5 rounded-md"
          />
          <div>
            <h3 className="text-center font-bold ">{title}</h3>
          </div>
        </Link>
        <div className="flex flex-row gap-2">
          <button className={`buttonUI`}> 
            <Link href={`/products/detail/${slug}`}>
                Check It!
            </Link>
          </button>
          <button
            className={`buttonUI`}
            onClick={() => addProduct(item, 1)} 
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
