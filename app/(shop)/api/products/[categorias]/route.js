import { MockProducts } from "@/components/products/asyncMock"
import { NextResponse } from "next/server"

const sleep = async (timer) => new Promise((resolve) => setTimeout(resolve, timer))

export const GET = async (_, { params }) => {
    const { categoria } = params
    
    const items = categoria === 'all'
                    ? MockProducts
                    : MockProducts.filter(product => product.type === categoria)

    await sleep(1000)

    return NextResponse.json(items)
}