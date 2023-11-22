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
        if (!isInCart(productToAdd.title)) {
            const productWithQuantity = {
                ...productToAdd,
                quantity: quantity
            };
            console.log("this is" + productToAdd.title)
            setCart([...cart, productWithQuantity]);
        } else {
            const cartUpdated = cart.map(prod => {
                if (prod.title === productToAdd.title) {
                    console.log("id del producto" + prod.title)
                    const productUpdated = {
                        ...prod,
                        quantity: quantity + prod.quantity
                    };
                    console.log("this is 2" + productToAdd.title)
                    console.log("actualizado" + productUpdated)
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

