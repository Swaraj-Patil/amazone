import React from 'react'
import './HomeCard.css'
import { product1 } from '../../assets'
import { Link } from 'react-router-dom'

const HomeCard = ({ title = 'Appliances for your home | Up to 55% off', products, url = 'appliances' }) => {
  return (
    <div className='homecard'>
      <h1>{title}</h1>

      <div className='homecard__categories'>

        {products?.map(product => (
          <Link key={product.id} to={`/product&category=${url}`} className='homecard__category'>
            <div className='app__center' style={{ width: '120px', height: '120px', overflow: 'hidden', marginBottom: '4px' }}>
              <img style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} src={product.image || product1} alt='appliances' />
            </div>
            <p>{product.name}</p>
          </Link>
        ))}

      </div>

      <p>See more</p>
    </div>
  )
}

export default HomeCard




