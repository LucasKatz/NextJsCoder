"use client"

import UserForm from "@/components/forms/profileForm";
import { useAuthContext } from "@/components/context/AuthContext";

const UserProfile = () => {
    const { user } = useAuthContext();


if (!user) {
    return <p>No autorizado. Por favor, inicia sesión.</p>;
}


return (
    <div>
        <h1>Welcome {user.name} </h1>
        <UserForm />
    </div>
);
};

export default UserProfile;
