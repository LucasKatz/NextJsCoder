import { useAuthContext } from "@/components/context/AuthContext";
import Button from "../userint/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import Loader from "@/app/(shop)/products/detail/[slug]/loading";

const UserForm = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);

    useEffect(() => {

    if (user && user.email) {

        const userDocRef = doc(collection(getFirestore(), "users"), user.email);

        getDoc(userDocRef)
            .then((docSnapshot) => {
            if (docSnapshot.exists()) {

            setUserData(docSnapshot.data());
        } else {
            console.log("Usuario no encontrado en la colección 'users'");
        }
        })
        .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
        });
    }
}, [user]);


if (!userData) {
    return <Loader/>;
}

return (
    <main className="flex  flex-row m-auto mb-10 p-5 justify-center bg-bg-color-5 w-1/3 rounded-md">
    <form className="items-center">
            <div className="form-row mb-4 text-center">
            <div className="mb-4">
                <label className="font-bold" htmlFor="name">
                    Name:
                </label>
                <h3 className="w-full border border-gray-300 rounded p-1">{userData.name}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="surname">
                    Surname:
                </label>
                <h3 className="w-full border border-gray-300 rounded p-1">{userData.surname}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="phone">
                    Phone Number:
                </label>
                <h3 className="w-full border border-gray-300 rounded p-1">{userData.phone}</h3>
            </div>
            <div className="mb-4">
                <label className="font-bold" htmlFor="email">
                Email:
                </label>
                <h3>{userData.email}</h3>
            </div>
        </div>

        <div className="m-auto text-center">
            <Button>
                <Link href={"/products/all"}>Check our catalogue!</Link>
            </Button>
        </div>
    </form>
    </main>
);
};

export default UserForm;

