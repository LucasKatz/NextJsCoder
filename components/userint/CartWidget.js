import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '@/components/context/CartContext';
import Link from 'next/link';

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext) 

  return (
    <div className="flex flex-row"> 
      <Link href="/cart">
        <FaShoppingCart className='text-3xl'/>
      </Link>
      
      {totalQuantity > 0 && (
        <span className='font-bold text-2xl'>{totalQuantity}</span>
      )}
    </div>
  );
  
}

export default CartWidget