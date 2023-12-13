"use client"

import { useAuthContext } from "@/components/context/AuthContext"
import  "./admin.css"
import { useRouter } from "next/navigation"

const AdminLayout = ({children, unauthorized}) => {
    const { user } = useAuthContext()
    const router = useRouter();
    const isAdminUser =
    user.loggedIn && user.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS;


    return (
        <>
            {
                isAdminUser
                    ? children
                    : unauthorized
            }
        </>
    )
}

export default AdminLayout