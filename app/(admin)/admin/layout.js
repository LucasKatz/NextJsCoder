"use client"

import { useAuthContext } from "@/components/context/AuthContext";
import "./admin.css";
import { useState, useEffect } from "react";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const AdminLayout = ({ children, unauthorized }) => {
  const { user } = useAuthContext();
  const isAdminUser =
    user.loggedIn && user.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS;

  // Estado para manejar la carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga asincrónica
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Ajusta según tus necesidades
  }, []); // Se ejecuta solo en el montaje inicial

  // Renderizar el loader mientras carga
  if (loading) {
    return <Loader/>; // Puedes reemplazarlo con tu componente Loader
  }

  // Renderizar el contenido adecuado una vez que se determina si el usuario es un administrador o no
  return isAdminUser ? children : unauthorized;
};

export default AdminLayout;
