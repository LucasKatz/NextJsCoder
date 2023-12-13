import Link from "next/link"

const Unauthorized = () => {

    return (
        <main className="container m-auto my-5 p-auto w-1/2">
            <div className="flex flex-col m-auto bg-orange-300 text-center rounded-md h-56">
                <h1 className="m-auto py-1/2 text-2xl font-semibold text-purple-900 justify-center">
                    Your user is not authorized to access this section of the page
                </h1>
                <Link href={"/"} className="m-auto py-1/2 text-xl font-semibold text-purple-900 justify-center">Back to Home</Link>
            </div>
        </main>
    )
}

export default Unauthorized