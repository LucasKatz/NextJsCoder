
import Image from "next/image"



const AdminProductCard = ({item}) => {
    return (
<div className="w-80 h-75 bg-orange-300 p-12 rounded-md">
    <div className="flex flex-col justify-center items-center m-auto">
        <Image
            alt={item.title}
            src={`/images/products/${item.image}`}
            width={90}
            height={90}
            className="mx-2"
        />
        <h3 className="text-lg font-bold text-center">{item.title}</h3>
        <p className="text-sm text-center">${item.price}</p>
        <p className="text-sm text-center">{item.description}</p>
    
    </div>
    <div className="mt-2 flex justify-center">
        <button className="bg-green-500 text-white px-2 py-1 mr-2 w-15">Edit</button>
        <button className="bg-red-500 text-white px-2 py-1 w-15">Delete</button>
    </div>
</div>


    
    )
}

export default AdminProductCard