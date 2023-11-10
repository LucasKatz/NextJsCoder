
import Image from "next/image"



const AdminProductCard = ({item}) => {
    return (
        <div className="w-full h-20 bg-orange-300 p-2 rounded-md my-5">
        <div className="flex justify-between items-center">
            <Image
                alt={item.title}
                src={`/images/products/${item.image}`}
                width={50}
                height={50}
                className="mx-2"
            />
            <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm">{item.price}</p>
                {/* Agrega más características si es necesario */}
            </div>
            <div className="ml-auto">
                <button className="bg-green-500 text-white px-2 py-1 mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1">Delete</button>
            </div>
        </div>
    </div>
    
    )
}

export default AdminProductCard