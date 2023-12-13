"use client"

import { useState, useEffect, useContext, createContext } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from './AuthContext';
import { dataBase } from '@/services/firebase';
import { addDoc, collection, updateDoc, doc, getDocs, query, where, deleteDoc, getDoc } from 'firebase/firestore';

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

  const fetchCartDocId = async (user) => {
    try {
      if (user && user.uid) {
        const querySnapshot = await getDocs(
          query(collection(dataBase, 'carts'), where('userId', '==', user.uid))
        );
  
        if (!querySnapshot.empty) {
          const cartDoc = querySnapshot.docs[0];
          return cartDoc.id;
        } else {
        return null
        }
      }
    } catch (error) {
      console.error('Error fetching or creating cart document:', error);
      return null;
    }
  };

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
      // Fetch or add cart document id
      let cartDocId;
      if (user && user.uid) {
        const querySnapshot = await getDocs(
          query(collection(dataBase, 'carts'), where('userId', '==', user.uid))
        );
  
        if (!querySnapshot.empty) {
          const cartDoc = querySnapshot.docs[0];
          cartDocId = cartDoc.id;
        } else {
          const cartDocRef = await addDoc(collection(dataBase, 'carts'), {
            userId: user.uid,
            cart: [],
          });
  
          cartDocId = cartDocRef.id;
          console.log('New cart created. Cart document ID:', cartDocId);
        }
      }
  
      // Add product to cart
      if (!isInCart(productToAdd.title)) {
        const productWithQuantity = {
          ...productToAdd,
          quantity: quantity,
        };
  
        setCart((prevCart) => [...prevCart, productWithQuantity]);
        await new Promise((resolve) => setTimeout(resolve, 0));
        const updatedCart = [...cart, productWithQuantity];
        await updateCartInFirestore(updatedCart);
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
  
        setCart(cartUpdated);
        await new Promise((resolve) => setTimeout(resolve, 0));
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

  const readCart = async () => {
    try {
      const cartDocId = await fetchCartDocId(user);
  
      if (cartDocId) {
        const cartDocRef = doc(dataBase, 'carts', cartDocId);
        const cartSnapshot = await getDoc(cartDocRef); // Cambiar de getDocs() a getDoc()
        
        console.log("Carrito leído");
  
        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          const cartFromFirestore = cartData.cart || [];
  
          setCart(cartFromFirestore);
          setTotalQuantity(getQuantity());
          setTotal(getTotal());
        }
      }
    } catch (error) {
      console.error('Error reading cart from Firestore:', error);
    }
  };
  
  useEffect(() => {
    readCart();
  }, [user]);
  

  
  
  const eraseCart = async (user) => {
    try {
      const cartDocId = await fetchCartDocId(user);
      if (cartDocId) {
        await deleteDoc(doc(dataBase, 'carts', cartDocId));
        console.log('Cart document deleted. Cart document ID:', cartDocId);
      }
    } catch (error) {
      console.error('Error deleting cart document:', error);
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
      if (user) {
        // Obtener el cartDocId actualizado llamando a fetchCartDocId
        const updatedCartDocId = await fetchCartDocId(user);
  
        if (updatedCartDocId) {
          const cartDocRef = doc(dataBase, 'carts', updatedCartDocId);
          console.log("Carrito actualizado", updatedCartDocId);
          await updateDoc(cartDocRef, { cart: updatedCart });
        }
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
        eraseCart,
        fetchCartDocId,
        readCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
