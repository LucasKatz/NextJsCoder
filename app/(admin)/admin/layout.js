"use client"

import { useAuthContext } from "../../../components/context/AuthContext";
import "../../../app/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../../app/(shop)/products/detail/[slug]/loading";

const AdminLayout = ({ children}) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user.loggedIn) {
    router.push("/login");
    return null;
  }

  if (user.role !== 'admin') {
    console.log("Usuario no autorizado");
    router.push("/unauthorized")
    return null;
  }

  return children;
};

export default AdminLayout;


