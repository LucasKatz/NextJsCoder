
import { NextResponse } from "next/server"
import { getProductBySlug } from "../../../productsApi"

const sleep = async (timer) => new Promise((resolve) => setTimeout(resolve, timer))

export const GET = async (_, { params }) => {
    const {slug} = params

    const items = getProductBySlug

    await sleep(3000)

    return NextResponse.json(items)
}