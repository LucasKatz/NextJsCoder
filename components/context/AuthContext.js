"use client"

import { useState, createContext, useContext, useEffect } from 'react';
import { auth, googleAuth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';


const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter ();
  
  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    uid: null,
    name:null,
    surname:null
  });
  
  const registerUser = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password, values.repeatEmail, values.name, values.surname)

  router.push('/login');
} catch (error) {
  console.error('Error registering user:', error);
}
}

const loginUser = async (values) => {
  try {
  await signInWithEmailAndPassword(auth, values.email, values.password)
router.push('/products/todos');
  }catch (error) {
    console.error('Error registering user:', error);
  }
}

const googleLogin = async () => {
  try{
  await signInWithPopup(auth, googleAuth)
  router.push('/products/todos');
  }catch (error){
    console.error("Not possible to login", error)
  }
}


const logout = async () => {
  await signOut(auth)
  console.log ("Deslogueado con exito")
}

useEffect (()=>{
  onAuthStateChanged(auth, (user)=>{
  console.log(user)
  if(user){
    setUser ({
      loggedIn: true,
      email: user.email,
      uid: user.uid,
      name: user.name,
      surname: user.surname
    })
  } else{
    setUser ({
      loggedIn: false,
      email:null ,
      uid:null,
      name:null,
      surname: null
    })
  }
})
}, [])

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
