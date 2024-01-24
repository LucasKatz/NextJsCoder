import ProductDetail from "../../../../../components/products/itemDetail";
import { getProductBySlug } from "../../../api/productsApi";

export async function generateMetadata({ params, searchParams }, parent) {
  console.log(params);

  return {
    title: `Night Owl - Products - ${params.slug}`,
  };
}

const DetailPage = async ({ params }) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  return (
    <main className="container m-auto mt-10">

      <ProductDetail product={product} />
    </main>
  );
};

export default DetailPage;
