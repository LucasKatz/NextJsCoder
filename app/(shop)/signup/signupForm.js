"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuthContext } from "@/components/context/AuthContext"


const  SignUp = () => {

    const { registerUser } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        repeatEmail:'',
        password: '',
        name:'',
        surname: ''
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
    <>
<main className="flex min-h-screen flex-row items-center justify-between">

        <form
            onSubmit={handleSubmit}
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
                        value={values.name}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
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
                        value={values.surname}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
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
                        value={values.email}
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">
                        Repeat Email:
                    </label>
                    <input
                        id="repeatEmail"
                        name="email"
                        type="email"
                        value={values.repeatEmail}
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
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
                        value={values.password}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-row mb-4 flex justify-center">
                <button
                    id="signup"
                    type="button"
                    className="bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
                    Register
                </button>
            </div>
            <div className="flex flex-row items-center justify-center">
                <p className="font-semibold">Already have an account?</p>
            <Link href={"/login"}
                    className=" ml-2 bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
                    Login
                </Link >
            </div>
        </form>

</main>

</>
    )
    }

    export default SignUp