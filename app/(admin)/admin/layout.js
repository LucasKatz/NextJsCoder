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

  // Variable de estado para realizar un seguimiento de si isAdminUser ha cambiado
  const [isAdminUserChanged, setAdminUserChanged] = useState(false);

  useEffect(() => {
    // Simula una carga asincrónica
    setTimeout(() => {
      setLoading(false);

      // Verificar si isAdminUser ha cambiado
      if (!isAdminUserChanged && !isAdminUser) {
        // Si isAdminUser es falso desde el principio, renderiza el componente unauthorized
        return unauthorized;
      }

      // Actualiza el estado para indicar que isAdminUser ha cambiado
      setAdminUserChanged(true);
    }, 1000); // Ajusta según tus necesidades
  }, [isAdminUser, isAdminUserChanged]); // Se ejecuta cuando cambia isAdminUser o isAdminUserChanged

  // Renderizar el loader mientras carga
  if (loading) {
    return <Loader />; // Puedes reemplazarlo con tu componente Loader
  }

  // Si isAdminUser es falso, mostrar el componente unauthorized
  if (!isAdminUser) {
    router.push("/login");
  }

  // Renderizar el contenido adecuado una vez que se determina si el usuario es un administrador o no
  return children;
};

export default AdminLayout;

