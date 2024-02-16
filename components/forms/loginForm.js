"use client"

import Button from "../userint/button";
import { useState } from "react"
import { useAuthContext } from "../../components/context/AuthContext";
import Link from "next/link";


const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const LoginForm = () => {

    const {loginUser, googleLogin } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    
      const handleSubmit = async (e) => {
        e.preventDefault();
        loginUser(values);};

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    return (
<main className="flex min-h-screen flex-row items-center justify-between">

    <form   onSubmit={handleSubmit} method="GET" className="speaker-form bg-gray-100 border border-gray-300 rounded-md md:w-1/3 mx-auto p-4">
            <div className="form-row mb-4">
                <h1 className="text-center py-5 text-text-color-2 font-extrabold">Log In</h1>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={values.email}
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}/>
                        
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={values.password}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}/>
                </div>
            </div>

            <div className="flex flex-col m-auto text-center">
                <Button   onClick={()=>loginUser(values)} >Login</Button>
                <Button   onClick={googleLogin} >Google Login</Button>
            </div>

            <div className="form-row mb-4 flex items-center justify-center my-5">
                <p className="mr-2 font-semibold p-2">Don&apos;t have an account?</p>
                <Button> 
                  <Link href={"/signup"}>
                    Sign Up
                  </Link>
                </Button>
            </div>
        </form>


</main>
    )
    }

    export default LoginForm