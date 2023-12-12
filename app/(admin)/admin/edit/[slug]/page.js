import EditForm from "@/components/admin/editForm";
import { getProductBySlug } from "@/app/(shop)/api/productsApi";



const EditPage = async ({ params }) => {
  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);

    console.log("show me", product);

    if (!product) {
      console.error("Product not found");
      return (
        <div>
          <p>Product not found</p>
        </div>
      );
    }

    return (
      <div>
        <EditForm product={product}/>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div>
        <p>Error fetching product</p>
      </div>
    );
  }
};

export default EditPage;

