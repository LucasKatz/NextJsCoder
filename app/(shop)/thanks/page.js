import Link from "next/link"
import Button from "@/components/userint/button"
const Thanks = () => {

    return (
        <main className="container m-auto my-10 p-auto  w-1/2">
            <div className="flex flex-col m-auto bg-bg-color-5 text-center rounded-md h-56 p-8">
                <h1 className="m-auto py-1/2 text-2xl font-semibold text-purple-900 justify-center">
                    Thank you for your buying at Night Owl Resources! <br></br> <br></br>We will get in touch with you <br></br> <br></br>as soon as your order is ready.
                </h1>
                <Button>
                <Link href={"/"} >Back to Home</Link>
                </Button>
            </div>
        </main>
    )
}

export default Thanks