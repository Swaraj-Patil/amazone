import React from 'react'
import './ProductCard.css'
import { Rating } from '@mui/material'
import { StarBorder } from '@mui/icons-material'
import {
    // product1,
    primeIcon
} from '../../assets'
import applewatch from '../../assets/temp/applewatch.png'
import { Link } from 'react-router-dom'
import { getDate } from '../../utils'

const ProductCard = ({ product }) => {

    const date = new Date()
    const sameDayDelivery = date.getHours() < 14
    const delivery = getDate(sameDayDelivery ? 0 : 1)
    const formattedDelivery = `${delivery.date} ${delivery.month}`

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        emptyIcon: <StarBorder style={{ color: '#CD9042' }} />
    }

    return (
        <Link to={`/product/${product._id}`} className='productcard'>
            <div className=''>
                <img src={product?.images?.[0].url || applewatch} alt='Product' />
            </div>

            <div className='productcard__info'>
                <p>{product && product.name}</p>
                <div className='productcard__rating'>
                    <Rating {...options} />
                    <span>{product.numOfReviews} reviews</span>
                </div>
                <div className='productcard__price'>
                    <span><small>₹</small>{product && product.price.toLocaleString('en-IN')}</span>
                </div>
                <p style={{ color: '#555' }}>Up to 5% back with Amazone Pay ICICI card</p>
                <p>
                    <img src={primeIcon} alt='prime' />
                    <p>FREE delivery by <strong>{`${sameDayDelivery ? 'Today,' : 'Tomorrow,'} ${formattedDelivery}`}</strong></p>
                </p>
            </div>
        </Link>
    )
}

export default ProductCard
