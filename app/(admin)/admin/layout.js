"use client";

import { useAuthContext } from "@/components/context/AuthContext";
import "./admin.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const AdminLayout = ({ children, unauthorized }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const isAdminUser =
    user.loggedIn && user.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS;

// Estado para manejar la carga
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simula una carga asincrónica
  setTimeout(() => {
    setLoading(false);
  }, 1000); // Ajusta según tus necesidades
}, []);

// Renderizar el loader mientras carga
if (loading) {
  return <Loader />; // Puedes reemplazarlo con tu componente Loader
}

// Si no hay un usuario logueado, redirige a la página de inicio de sesión
if (!user.loggedIn) {
  router.push("/login");
  return null; // Puedes ajustar esto según tus necesidades
}

// Si isAdminUser es falso, mostrar el componente unauthorized
if (!isAdminUser) {
  return unauthorized;
}

// Renderizar el contenido adecuado una vez que se determina si el usuario es un administrador o no
return children;
};
export default AdminLayout;

