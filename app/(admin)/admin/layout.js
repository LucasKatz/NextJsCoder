"use client"

import { useAuthContext } from "@/components/context/AuthContext"
import  "./globals2.css"

const AdminLayout = ({children, login}) => {
    const { user } = useAuthContext()
    console.log (user)

    return (
        <>
            {
                user.loggedIn
                    ? children
                    : login
            }
        </>
    )
}

export default AdminLayout