"use client";

import { useAuthContext } from "@/components/context/AuthContext";
import "@/app/globals.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const AdminLayout = ({ children, unauthorized }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const isAdminUser = user.loggedIn && user.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS;


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


if (!isAdminUser) {
  return unauthorized;
}

return children;
};


export default AdminLayout;

