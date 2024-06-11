import React from 'react'
import { Rating } from '@mui/material'
import { primeIcon } from '../../assets'

const AddCard = ({ ad }) => {

    const options = {
        value: ad.rating,
        readOnly: true,
        precision: 0.5
    }

    const addCard = {
        border: '1px solid #D5D9D9',
        margin: '1rem 0',
        maxHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const innerDiv = {
        padding: '1rem'
    }

    const imgStyle = {
        width: 100,
        // height: '100%',
    }

    return (
        <div style={addCard}>
            <img style={imgStyle} src={ad.imageUrl} alt="Sample" />
            <div style={innerDiv}>
                <strong style={{ fontSize: 15 }}>{ad.title}</strong>
                <p className='app__center' style={{ justifyContent: 'unset' }}><Rating {...options} />&nbsp; {ad.numOfReviews}</p>
                <div className="productDetails__info-price">
                    <p style={{ fontSize: 24 }}><span style={{ fontSize: 16 }}>-48%</span>&nbsp; <sup>₹</sup>{ad.price}</p>
                    <p style={{ color: 'grey', textDecoration: 'line-through', fontSize: 14 }}>M.R.P.: ₹{ad.price + (ad.price * 48) / 100}</p>
                    <div className='productDetails__info-prime'><img src={primeIcon} alt="Prime" /></div>
                </div>
            </div>
        </div>
    )
}

export default AddCard
