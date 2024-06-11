import React from 'react'
import './Home.css'
import {
  banner1,
  // banner2, 
  // banner3, 
  // banner4, 
  // banner5, 
} from '../../assets'
import { HomeCard } from '../../component'
import { MetaData } from '../Layout'

const Home = () => {

  return (
    <div className='home'>
      <MetaData title='Online Shopping site in India: Shop Online for Mobiles, Books, Watches...' />

      <div className='home__container'>
        <img className='home__carousel' src={banner1} alt='Banner' />

        <div className='home__row'>
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>

        <div className='home__row'>
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>

        <div className='home__row'>
          {/* <ProductCard /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
