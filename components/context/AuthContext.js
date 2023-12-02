"use client"

import { useState, createContext, useContext } from 'react';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


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
      const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password, values.repeatEmail, values.name, values.surname)
      
      const user = userCredentials.user
      
      setUser ({
        loggedIn: false,
        email: user.email,
        uid: user.uid,
        name: user.name,
        surname: user.surname
      })
  router.push('/login');
} catch (error) {
  console.error('Error registering user:', error);
}
}

const loginUser = async (values) => {
  try {
  await signInWithEmailAndPassword(auth, values.email, values.password)

  setUser ({
    loggedIn: true,
    email: user.email,
    uid: user.uid,
  })
router.push('/products/todos');
  }catch (error) {
    console.error('Error registering user:', error);
  }
}


  return (
    <AuthContext.Provider value={{user,
      registerUser,
      loginUser}}>
      {children}
    </AuthContext.Provider>
  );
};
