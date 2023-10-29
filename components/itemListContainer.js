import ItemList from '../ItemList/ItemList'
import { useParams } from 'next/navigation'
import { ChaoticOrbit } from '@uiball/loaders'
import { getProducts } from '../../Service/Firestore/Productos'
import { useAsync } from '../../Hooks/useAsync'


const ItemListContainer =() => {
    const { categoryId } = useParams()

    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])

    if(loading) {
        return <div className='conteinerLista '>
        <div className="chaotic-orbit">{ ChaoticOrbit } </div>
        </div>
    }

    if(error) {
        return <h1>Oops! Ha habido un error</h1>
    }

    return  (
        <div className='conteinerLista '>
            <h1>LISTADO DE PRODUCTOS</h1>
            <ItemList products={products}/>
        </div>
        
    )
}

export default ItemListContainer