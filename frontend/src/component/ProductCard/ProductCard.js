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

const ProductCard = ({ product }) => {

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        emptyIcon: <StarBorder style={{ color: '#CD9042' }} />
    }

    // Get tomorrow's date
    function tomorrow() {

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 1)

        return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`
    }

    return (
        <Link to={`/product/${product._id}`} className='productcard'>
            <div>
                {/* <img src={product?.images && product?.images[0].url} alt='Product' /> */}
                <img src={applewatch} alt='Product' />
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
                <p><img src={primeIcon} alt='prime' />FREE Delivery by &nbsp; <strong>Tomorrow, {tomorrow()}</strong></p>
            </div>
        </Link>
    )
}

export default ProductCard
