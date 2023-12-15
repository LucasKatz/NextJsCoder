import { NextResponse } from "next/server";
import { getProductBySlug } from "../../../productsApi";

const sleep = async (timer) => new Promise((resolve) => setTimeout(resolve, timer));

export const GET = async (_, { params }) => {
  const { slug } = params;

  try {
    const product = await getProductBySlug(slug);

    await sleep(3000);

    return NextResponse.json(product);
} catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json({ error: "Error fetching product" }, { status: 500 });
  }
};
