"use client"

import { useState, useEffect, useContext, createContext } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from './AuthContext';
import { dataBase } from '@/services/firebase';
import { addDoc, collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';

export const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useAuthContext();
  const [cartDocId, setCartDocId] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      const fetchCartDocId = async () => {
        const querySnapshot = await getDocs(
          query(collection(dataBase, 'carts'), where('userId', '==', user.uid))
        );

        if (!querySnapshot.empty) {
          const cartDoc = querySnapshot.docs[0];
          setCartDocId(cartDoc.id);
        } else {
          const cartDocRef = await addDoc(collection(dataBase, 'carts'), {
            userId: user.uid,
            cart: [],
          });

          const newCartDocId = cartDocRef.id;
          setCartDocId(newCartDocId);
          console.log('New cart created. Cart document ID:', newCartDocId);
        }
      };

      fetchCartDocId();
    }
  }, [user]);

  useEffect(() => {
    const totalQty = getQuantity();
    setTotalQuantity(totalQty);
  }, [cart]);

  useEffect(() => {
    const total = getTotal();
    setTotal(total);
  }, [cart]);


  const addProduct = async (productToAdd, quantity) => {
    try {
      // Verifica si el usuario tiene un carrito
      if (cartDocId) {
        // Si no tiene un carrito, crea uno y obtén el nuevo cartDocId
        const cartDocRef = await addDoc(collection(dataBase, 'carts'), {
          userId: user.uid,
          cart: [],
        });
  
        const newCartDocId = cartDocRef.id;
  
        console.log('New cart created. Cart document ID:', newCartDocId);
      }
  
      if (!isInCart(productToAdd.title)) {
        const productWithQuantity = {
          ...productToAdd,
          quantity: quantity,
        };
  
        // Actualiza el estado local del carrito
        setCart((prevCart) => [...prevCart, productWithQuantity]);
  
        // Espera a que el estado local se actualice y luego actualiza el carrito en Firestore
        await new Promise(resolve => setTimeout(resolve, 0));
        await updateCartInFirestore([...cart, productWithQuantity]);
      } else {
        const cartUpdated = cart.map((prod) => {
          if (prod.title === productToAdd.title) {
            const productUpdated = {
              ...prod,
              quantity: quantity + prod.quantity,
            };
  
            return productUpdated;
          } else {
            return prod;
          }
        });
  
        // Actualiza el estado local del carrito
        setCart(cartUpdated);
  
        // Espera a que el estado local se actualice y luego actualiza el carrito en Firestore
        await new Promise(resolve => setTimeout(resolve, 0));
        await updateCartInFirestore(cartUpdated);
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  

  const isInCart = (title) => {
    return cart.find((product) => product.title === title);
  };

  const clearCart = async () => {
    try {
      setCart([]);
      await updateCartInFirestore([]);
      Swal.fire({
        icon: 'success',
        title: 'Your cart is empty',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const removeProduct = async (title) => {
    try {
      // Remueve el producto del carrito local
      const updatedCart = cart.filter((product) => product.title !== title);
      setCart(updatedCart);

      // Remueve el producto del carrito en Firebase
      await updateCartInFirestore(updatedCart);

      Swal.fire({
        icon: 'success',
        title: 'Product removed from cart!',
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const updateCartInFirestore = async (updatedCart) => {
    try {
      console.log('Current cartDocId:', cartDocId);
      if (user && user.loggedIn) {
        const cartDocRef = doc(dataBase, 'carts', cartDocId);
        console.log("Carrito actualizado", cartDocId);
        await updateDoc(cartDocRef, { cart: updatedCart });
      }
    } catch (error) {
      console.error('Error updating cart in Firestore:', error);
    }
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((prod) => {
      total += prod.quantity * prod.price;
    });

    return total;
  };

  const getQuantity = () => {
    let accu = 0;

    cart.forEach((prod) => {
      accu += prod.quantity;
    });

    return accu;
  };

  const getProductQuantity = (id) => {
    const product = cart.find((prod) => prod.id === id);

    return product?.quantity;
  };

  console.log(cart);

  return (
    <CartContext.Provider
      value={{
        clearCart,
        isInCart,
        removeProduct,
        addProduct,
        getQuantity,
        getTotal,
        getProductQuantity,
        totalQuantity,
        total,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
