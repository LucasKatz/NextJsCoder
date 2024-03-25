"use client"

import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "../../components/context/AuthContext";

const SignUp = () => {
  const { registerUser } = useAuthContext();
  const [values, setValues] = useState({
    email: "",
    repeatEmail: "",
    password: "",
    name: "",
    surname: "",
    phone:"",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (values.email !== values.repeatEmail) {
        newErrors.repeatEmail = "Emails do not match.";
      }
      
    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      registerUser(values);
    } else {
      console.log("Form validation errors:", formErrors);
    }
  };

  return (
      <main className="flex min-h-screen flex-row items-center justify-between">
        <form onSubmit={handleSubmit} method="GET" className="speaker-form bg-gray-100 border border-gray-300 rounded-md md:w-1/3  mx-auto p-4">
          <div className="form-row mb-4">
            <h1 className="text-center py-5 text-purple-900 font-extrabold">Ingresar</h1>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="first_name">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={values.name}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="last_name">Surname:</label>
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        value={values.surname}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="phone">N° de Contacto</label>
                    <input
                        id="phone"
                        name="phone"
                        type="number"
                        value={values.phone}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        placeholder="joe@example.com"
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="email">Repetir Email:</label>
                    <input
                        id="repeatEmail"
                        name="repeatEmail"
                        type="email"
                        value={values.repeatEmail}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="mb-4">
                    <label className="font-bold" htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        className="w-full border border-gray-300 rounded p-1"
                        onChange={handleChange}
                        required/>
                </div>
            </div>
          <div className="form-row mb-4 flex justify-center">
            <button type="submit" className="bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
              Register
            </button>
          </div>
          <div className="flex flex-row items-center justify-center">
            <p className="font-semibold">¿Ya tienes cuenta?</p>
            <Link
              href={"/login"}
              className="ml-2 bg-bg-color-1 text-text-color-5 border-none px-4 py-2 cursor-pointer rounded mr-2">
              Login
            </Link>
          </div>
        </form>
      </main>
  );
};

export default SignUp;
