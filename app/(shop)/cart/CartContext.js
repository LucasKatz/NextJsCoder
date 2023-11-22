"use client"

import  {useState, useEffect, useContext,createContext} from 'react'



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
        if (!isInCart(productToAdd.id)) {
            const productWithQuantity = {
                ...productToAdd,
                quantity: quantity
            };
            setCart([...cart, productWithQuantity]);
        } else {
            const cartUpdated = cart.map(prod => {
                if (prod.id === productToAdd.id) {
                    console.log("id del producto" + prod.id)
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
    


const clearCart = () => setCart ([ ])



const isInCart = (id) => { return cart.find (product =>product.id ===id) }

const removeProduct = (id) => setCart (cart.filter ( product => product.id !== id))



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

