"use client"

import { FaUserEdit, FaTrash} from "react-icons/fa";
import Button from "../userint/button";
import { useAuthContext } from "../context/AuthContext";
import { getUsers } from "@/app/(shop)/api/productsApi";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { collection, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dataBase } from "@/services/firebase";

const AdminUserDetail = () => {
    const [users, setUsers] = useState([]);
    const { logout } = useAuthContext();
  
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  

    const handleRoleChange = async (email) => {
        try {
          // Obtén la referencia del documento del usuario por su email
          const userRef = doc(dataBase, "users", email);
      
          // Verifica si el usuario existe
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            // Cambia el rol
            const newRole = userSnapshot.data().role === "admin" ? "user" : "admin";
      
            await updateDoc(userRef, { role: newRole });
            fetchUsers(); // Vuelve a cargar la lista de usuarios después de cambiar el rol
            console.log("Role change successful. Refreshing user list.");
          } else {
            console.error("User not found.");
          }
        } catch (error) {
          console.error("Error changing user role:", error);
        }
      };
      

      const handleDeleteUser = async (email) => {
        console.log(email)
        try {
          const userRef = doc(dataBase, "users", email);
          await deleteDoc(userRef);
          fetchUsers(); // Vuelve a cargar la lista de usuarios después de eliminar al usuario
          console.log("User deleted successfully. Refreshing user list.");
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };


return (
    <>
      <div className="p-5">
        <h2 className="text-center text-text-color-5 text-3xl font-semibold py-5">Admin Panel - Users</h2>
        <div className="flex flex-wrap">
          {users.map((user) => (
            <div key={user.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
              <div className="border-white border-8 p-4 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-text-color-5 text-xl font-semibold">{user.name} {user.surname}</h3>
                  <p className="text-text-color-5">Email: {user.email}</p>
                  <p className="text-text-color-5">Phone: {user.phone}</p>
                  <p className="text-text-color-5">Role: {user.role}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="bg-blue-500 text-text-color-5 px-4 py-2 rounded-md" onClick={() => handleRoleChange(user.email)}>
                    <FaUserEdit />
                    Change Role
                  </button>
                  <button onClick={() => handleDeleteUser(user.email)} className="bg-red-500 text-text-color-5 px-4 py-2 rounded-md ml-4">
                  <FaTrash />
                  Delete User

                  </button>
                </div>
              </div>
            </div>
        ))}
        </div>
        <div className="flex flex-row items-center justify-center my-5">
        <Button onClick={logout}>Log Out</Button>

        </div>
    </div>
    </>
  );
};

export default AdminUserDetail;
