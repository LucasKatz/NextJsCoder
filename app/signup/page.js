import Button from "@/components/userint/button"

export default function SignUp() {

    return (
    <>
<main className="flex min-h-screen flex-row items-center justify-between">

        <form
            id="signupForm"
            method="GET"
            className="speaker-form bg-gray-100 border border-gray-300 rounded-md max-w-md mx-auto p-4"
        >
            <div className="form-row mb-4">
                <h1 className="text-center py-5 text-purple-900 font-extrabold">Sign Up</h1>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="first_name">
                        Name:
                    </label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="w-full border border-gray-300 rounded p-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="last_name">
                        Surname:
                    </label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="w-full border border-gray-300 rounded p-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">
                        Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="age">
                        Age:
                    </label>
                    <input
                        id="age"
                        name="age"
                        type="text"
                        className="w-full border border-gray-300 rounded p-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full border border-gray-300 rounded p-1"
                    />
                </div>
            </div>
            <div className="form-row mb-4 flex justify-center">
                <Button
                    id="signup"
                    type="button"
                    className="signup bg-red-600 text-white border-none px-4 py-2 cursor-pointer rounded mr-2">
                    Register
                </Button>
            </div>
        </form>
 
</main>

</>
    )
  }