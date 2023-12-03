"use client"
import { useAuthContext } from "@/components/context/AuthContext"
import Button from "@/components/userint/button"

const LogoutButton = () => {
    const { logout } = useAuthContext()

    return <Button onClick={logout} className="bg-red-500">Log Out</Button>
}

export default LogoutButton