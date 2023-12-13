"use client"

import Button from "../userint/button";
import { useState } from "react"
import { useAuthContext } from "@/components/context/AuthContext"


const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const LoginForm = () => {

    const {loginUser, googleLogin } = useAuthContext()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const validateForm = () => {
        const errors = {};
    
        if (!values.email) {
          errors.email = 'Email is required.';
        } else if (!emailRegex.test(values.email)) {
          errors.email = 'Invalid email format.';
        }
    
        if (!values.password) {
          errors.password = 'Password is required.';
        }
    
        return errors;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formErrors = validateForm();
    
        if (Object.keys(formErrors).length === 0) {
          // Realizar la lógica de inicio de sesión aquí
          loginUser(values);
        } else {
          console.log('Form validation errors:', formErrors);
        }
      };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
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
                        required
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
                        required
                        value={values.password}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}/>
                </div>
            </div>
            <div className="m-auto text-center">
                <Button   onClick={()=>loginUser(values)} >Login</Button>
                <Button   onClick={googleLogin} className="ml-2">Google Login</Button>
            </div>
            <div className="form-row mb-4 flex items-center justify-center my-5">
                <p className="mr-2 font-semibold p-2">Don&apos;t have an account?</p>
                <Button href={"/signup"}>Sign Up</Button>
            </div>
        </form>

</main>

</>
    )
    }

    export default LoginForm