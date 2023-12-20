"use client"

import { useState, createContext, useContext, useEffect } from 'react';
import { auth, googleAuth, dataBase} from '@/services/firebase';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';



const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  
  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    uid: null,
    name: null,
    surname: null,
    role: null,
  });
  
  const { loggedIn, email, role } = user;

  useEffect(() => {

    if (loggedIn) {
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/products/all');
      }
    }
  }, [loggedIn, router, role]);


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

      const userDocRef = doc(dataBase, 'users', values.email);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        Swal.fire({
          icon: 'error',
          title: 'User Already Registered',
          text: 'This email address is already registered. Please log in.',
        });
        return;
      }

      await createUserWithEmailAndPassword(auth, values.email, values.password, values.repeatEmail, values.name, values.surname, values.phone);

          await setDoc(userDocRef, {
              email: values.email,
              name: values.name,
              surname: values.surname,
              phone:values.phone,
              role: 'user',
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

    const userDocRef = doc(dataBase, 'users', values.email);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
  
      Swal.fire({
        icon: 'error',
        title: 'User Not Registered',
        text: 'This email address is not registered. Please sign up.',
      });
    } else {

      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);

        const userWithRole = { ...user, role: userDocSnapshot.data().role }; 
        setUser({
          ...userWithRole,
          loggedIn: true, 
        });

        if (userWithRole.role === 'admin') { 
          router.push('/admin');
        } else {
          router.push('/products/all');
        }
      } catch (error) {

        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: `Login failed: ${error.message}`,
        });
      }
    }
  } catch (error) {

    console.error('Error finding user:', error);
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: `Login failed: ${error.message}`,
    });
  }
};
  

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuth);
    const userFromGoogle = result.user;

    const userDocRef = doc(dataBase, 'users', userFromGoogle.email);
    const userDocSnapshot = await getDoc(userDocRef);

    let role = 'user'; 

    if (userDocSnapshot.exists()) {
      role = userDocSnapshot.data().role || 'user';
    }

    const userWithRole = { ...userFromGoogle, role };

    setUser({
      loggedIn: true,
      email: userWithRole.email,
      uid: userWithRole.uid,
      name: userWithRole.name,
      surname: userWithRole.surname,
      role: userWithRole.role,
    });

    if (userWithRole.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/products/all');
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: `Login failed: ${error.message}`,
    });
  }
};




const logout = async () => {
  await signOut(auth)
  router.push('/login');
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(dataBase, 'users', user.email);
      const userDocSnapshot = await getDoc(userDocRef);

      let role = 'user';

      if (userDocSnapshot.exists()) {
        role = userDocSnapshot.data().role || 'user';
      }

      setUser({
        loggedIn: true,
        email: user.email,
        uid: user.uid,
        name: user.name,
        surname: user.surname,
        role,
      });
    } else {
      setUser({
        loggedIn: false,
        email: null,
        uid: null,
        name: null,
        surname: null,
        role: null,
      });
    }
    setLoading(false);
  });

  return () => unsubscribe();
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
