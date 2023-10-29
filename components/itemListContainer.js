import { useParams } from 'next/navigation'
import { dataBase } from '@/services/firebase'



const ItemListContainer =() => {

    return  (
        <div className='conteinerLista '>
            <h1>LISTADO DE PRODUCTOS</h1>
            <ItemList products={products}/>
        </div>
        
    )
}

export default ItemListContainer