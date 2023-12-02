"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuthContext } from "@/components/context/AuthContext"

const LoginForm = () => {

    const {loginUser, googleLogin } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: ''
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
                <h1 className="text-center py-5 text-text-color-2 font-extrabold">Log In</h1>
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
                        onChange={handleChange}/>
                        
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
                        onChange={handleChange}/>
                </div>
            </div>
            <div className="m-auto text-center">
                <button   onClick={()=>loginUser(values)} className="bg-purple-900 text-white p-2 font-semibold rounded-md">Login</button>
            </div>
            <div className="form-row mb-4 flex items-center justify-center my-5">
                <p className="mr-2 font-semibold p-2">Don&apos;t have an account?</p>
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

  export default LoginForm