import React, { useEffect, useState } from 'react'
import './Home.css'
import {
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
} from '../../assets'
import { HomeCard } from '../../component'
import { MetaData } from '../Layout'

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  const banners = [banner1, banner2, banner3, banner4, banner5]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % banners.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='home'>
      <MetaData title='Online Shopping site in India: Shop Online for Mobiles, Books, Watches...' />

      <div className='home__container'>
        <img className='home__carousel' src={banners[activeSlide]} alt={`Banner ${activeSlide + 1}`} />

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
