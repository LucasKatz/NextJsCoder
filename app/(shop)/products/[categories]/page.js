import ProductsList from "../../../../components/products/itemList";
import { getProducts } from "../../api/productsApi";
export async function generateMetadata({ params, searchParams }, parent) {
  console.log(params);

  return {
    title: `Night Owl - Products- ${params.categories}`,
  };
}

export async function generateStaticParams() {
  return [
    { categories: "all" },
    { categories: "vocabulary" },
    { categories: "stories" },
    { categories: "routines" },
    { categories: "deco" },
    { categories: "others" },
  ];
}

export const revalidate = 3600;

const Productos = async ({ params }) => {
  const { categories } = params;

  const items = await getProducts(categories);

  return (
    <main className="container m-auto">
      <h2 className="text-2xl my-10 pb-4 text-center text-text-color-5 font-extrabold">
        Products
      </h2>

      <div className="flex gap-10">
        <ProductsList categories={categories} page={1} pageSize={10} />
      </div>
    </main>
  );
};

export default Productos;
