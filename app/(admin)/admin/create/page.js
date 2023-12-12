import CreateProductForm from "./newProduct"


export const metadata = { title: "Night Owl Resources - Create Product"}

const createPage = async () => {
    return(
        <div>
            <CreateProductForm/>
        </div>
    )

}

export default createPage