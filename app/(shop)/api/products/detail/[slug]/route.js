
import { NextResponse } from "next/server"

const sleep = async (timer) => new Promise((resolve) => setTimeout(resolve, timer))

export const GET = async (_, { params }) => {
    const {slug} = params

    const items = slug

    await sleep(1000)

    return NextResponse.json(items)
}