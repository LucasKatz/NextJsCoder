"use client"

import { useState, createContext, useContext, useEffect } from 'react';
import { auth, googleAuth, dataBase } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { addDoc,collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, browserSessionPersistence, setPersistence } from 'firebase/auth';


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
    cartDocId: null,
  });
  
  const registerUser = async (values) => {
    try {
      
      const authUser = await createUserWithEmailAndPassword(auth, values.email, values.password);


      const userDocRef = await addDoc(collection(dataBase, 'users'), {
        uid: authUser.user.uid,
        email: values.email,
        name: values.name,
        surname: values.surname,
      });

      const cartDocRef = await addDoc(collection(dataBase, 'carts'), {
        userId: authUser.user.uid,
        cart: [],
      });

      const cartDocId = cartDocRef.id;
      console.log('Cart document ID:', cartDocId);

      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

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
  await setPersistence(auth, browserSessionPersistence);
  await signInWithPopup(auth, googleAuth)
  router.push('/products/todos');
  }catch (error){
    console.error("Not possible to login", error)
  }
}


const logout = async () => {
  await signOut(auth)
  router.push('/login');
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
