import Link from 'next/link'


const Item = ({ id, img, name, price }) => {
    return (
    <div className="contenedorLista">

        <div className="cardContainer">
            <div className="imageCard">
                <img src="#" alt="" />
            </div>
            <div className="detailsCard">
                <h5>{name}</h5>
            </div>
            <div className="price">
                <h5>${price}</h5>
            </div>
            <div className="linkContainer">
                <Link className="linkVerDetalle" to = {`/detail/${id}`}>Ver detalle</Link>
            </div>
        </div>
    
    </div>
    )
}

export default Item