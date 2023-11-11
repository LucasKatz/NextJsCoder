import Link from "next/link"

export default function Login() {

    return (
      <>
<main className="flex min-h-screen flex-row items-center justify-between">

    <form
            id="signupForm"
            method="GET"
            className="speaker-form bg-gray-100 border border-gray-300 rounded-md max-w-md mx-auto p-4"
        >
            <div className="form-row mb-4">
                <h1 className="text-center py-5 text-purple-900 font-extrabold">Log In</h1>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full border border-gray-300 rounded p-1"/>
                </div>
            </div>
            <div className="form-row mb-4 flex items-center justify-center">
                <p className="mr-2">Don&apos;t have an account?</p>
                <Link href={"/signup"} className="bg-purple-900 text-white p-2 font-semibold rounded-md">Sign Up</Link>
            </div>
            <div className="m-auto text-center">
                <Link href={"/signup"} className="bg-purple-900 text-white p-2 font-semibold rounded-md">Use Google</Link>
            </div>
        </form>

</main>

</>
    )
  }