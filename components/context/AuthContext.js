"use client"

import { useState, createContext, useContext, useEffect } from 'react';
import { auth, googleAuth, dataBase} from '@/services/firebase';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';



const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();


  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    uid: null,
    name: null,
    surname: null,
  });

  const registerUser = async (values) => {
    try {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/;

      if (!strongPasswordRegex.test(values.password)) {

        Swal.fire({
          icon: 'error',
          title: 'Password Error',
          text: 'Password must be strong enough.',
        });
        return; 
      }
  
      await createUserWithEmailAndPassword(auth, values.email, values.password, values.repeatEmail, values.name, values.surname, values.phone);


          const userDocRef = doc(dataBase, 'users', values.email);  
          await setDoc(userDocRef, {
              email: values.email,
              name: values.name,
              surname: values.surname,
              phone:values.phone
          });
  
      router.push('/products/all');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: `Registration failed: ${error.message}`,
      });
    }
  };
  


const loginUser = async (values) => {
  try {
  await signInWithEmailAndPassword(auth, values.email, values.password)
  if (values.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS) {
    router.push('/admin');
  } else {
    router.push('/products/all');
  }
  }catch (error) {
    throw new Error(`Login failed: ${error.message}`);  }
}

const googleLogin = async () => {
  try{
  await signInWithPopup(auth, googleAuth)
  if (user.email === process.env.NEXT_PUBLIC_ADMIN_CREDENTIALS) {
    router.push('/admin');
  } else {
    router.push('/products/all');
  }
  }catch (error){
    console.error("Not possible to login", error)
  }
}



const logout = async () => {
  
  await signOut(auth)
  router.push('/login');
}

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        loggedIn: true,
        email: user.email,
        uid: user.uid,
        name: user.name,
        surname: user.surname,

      });
    } else {
      setUser({
        loggedIn: false,
        email: null,
        uid: null,
        name: null,
        surname: null,

      });
    }
  });
}, []);

  return (
    <AuthContext.Provider value={{user,
      registerUser,
      loginUser,
      googleLogin,
      logout}}>
      {children}
    </AuthContext.Provider>
  );
};
