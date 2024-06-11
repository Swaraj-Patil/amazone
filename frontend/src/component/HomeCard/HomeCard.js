import React from 'react'
import './HomeCard.css'
import { product1 } from '../../assets'
import { Link } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className='homecard'>
      <h1>Appliances for your home | Up to 55% off</h1>

      <div className='homecard__categories'>

        <Link to='/product&category=appliances' className='homecard__category'>
          <img src={product1} alt='appliances' />
          <p>Air conditioners</p>
        </Link>

        <Link className='homecard__category'>
          <img src={product1} alt='appliances' />
          <p>Refrigerators</p>
        </Link>

        <Link className='homecard__category'>
          <img src={product1} alt='appliances' />
          <p>Microwaves</p>
        </Link>

        <Link className='homecard__category'>
          <img src={product1} alt='appliances' />
          <p>Washing Machine</p>
        </Link>

      </div>

      <p>See more</p>
    </div>
  )
}

export default HomeCard




