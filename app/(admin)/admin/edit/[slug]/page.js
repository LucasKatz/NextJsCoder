import EditForm from "./editForm"

const EditPage = async ({params}) => {
   
    const {slug} = params

    const response = await fetch(`http://localhost:3000/api/products/detail/${slug}`, {
        
})

const items = await response.json()
console.log("these are" + items)


    return (
        <div>
            <EditForm items={items}/>
        </div>
    )
}

export default EditPage