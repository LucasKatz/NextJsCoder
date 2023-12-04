"use client"

import  {useState, useEffect, useContext,createContext} from 'react'
import Swal from 'sweetalert2'


export const CartContext = createContext({
    cart: [],
    totalQuantity: 0
    
})

export const CartProvider = ({children} ) => {
	const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)



    useEffect(() => {
        const totalQty = getQuantity()
        setTotalQuantity(totalQty)
    }, [cart])

	useEffect(() => {
        const total = getTotal()
        setTotal(total)
    }, [cart])

    const addProduct = (productToAdd, quantity) => {
        if (!isInCart(productToAdd.title)) {
            const productWithQuantity = {
                ...productToAdd,
                quantity: quantity
            };
    
            setCart([...cart, productWithQuantity]);
    

            Swal.fire({
                icon: 'success',
                title: 'Product added to cart',
                showConfirmButton: true,

            });
        } else {
            const cartUpdated = cart.map(prod => {
                if (prod.title === productToAdd.title) {
                    const productUpdated = {
                        ...prod,
                        quantity: quantity + prod.quantity
                    };
    
                    return productUpdated;
                } else {
                    return prod;
                }
            });
    
            setCart(cartUpdated);
        }
    };
    
    

    
    
    
const isInCart = (title) => { return cart.find (product =>product.title ===title) }

const clearCart = () => {setCart ([ ]) 
    Swal.fire({
        icon: 'success',
        title: 'Your cart is empty',
        showConfirmButton: true
    });
}

const removeProduct = (title) => {
    setCart (cart.filter ( product => product.title !== title))
    Swal.fire({
        icon: 'success',
        title: 'Product removed from cart!',
        showConfirmButton: true
    });
}



const getTotal = () => {
	let total = 0
	cart.forEach(prod => {
		total += prod.quantity * prod.price
	})
	
	return total
}

const getQuantity = () => {
	let accu = 0

	cart.forEach(prod => {
		accu += prod.quantity
	})

	return accu
}

const getProductQuantity = (id) => {
    const product = cart.find(prod => prod.id === id)

    return product?.quantity
}
console.log(cart)
return (
<CartContext.Provider value= {{
	clearCart, 
	isInCart, 
	removeProduct, 
	addProduct, 
	getQuantity,
    getTotal,
    getProductQuantity,
	totalQuantity,
	total,
	cart 
	}}>
		{children}
</CartContext.Provider> 
)
}

export const useCart = () => {
    return useContext(CartContext)
}

