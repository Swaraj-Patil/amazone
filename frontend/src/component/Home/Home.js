import React, { useEffect, useState } from 'react'
import './Home.css'
import {
  ac,
  refrigerator,
  washing_machine,
  microwave,
  microphone,
  webcam,
  mouse,
  keyboard,
  sneakers,
  crocs,
  slides,
  sport_footwear,
  garden,
  book,
  wwe,
  beauty,
  trend1,
  trend2,
  trend3,
  trend4,
  more1,
  more2,
  more3,
  more4,
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
} from '../../assets'
import { HomeCard } from '../../component'
import { MetaData } from '../Layout'
import AdCard from './AdCard'

const appliances = [
  {
    id: 1,
    name: 'Air conditioners',
    image: ac
  },
  {
    id: 2,
    name: 'Refrigerators',
    image: refrigerator
  },
  {
    id: 3,
    name: 'Microwaves',
    image: microwave,
  },
  {
    id: 4,
    name: 'Washing Machine',
    image: washing_machine,
  },
]

const streaming = [
  {
    id: 1,
    name: 'Mouse',
    image: mouse
  },
  {
    id: 2,
    name: 'Keyboards',
    image: keyboard
  },
  {
    id: 3,
    name: 'Microphones',
    image: microphone,
  },
  {
    id: 4,
    name: 'Webcams',
    image: webcam,
  },
]

const footwear = [
  {
    id: 1,
    name: 'Crocs',
    image: crocs
  },
  {
    id: 2,
    name: 'Slides',
    image: slides
  },
  {
    id: 3,
    name: 'Sneakers',
    image: sneakers,
  },
  {
    id: 4,
    name: 'Sports',
    image: sport_footwear,
  },
]

const categoriesToExplore = [
  {
    id: 1,
    name: 'Books',
    image: book
  },
  {
    id: 2,
    name: 'Beauty',
    image: beauty
  },
  {
    id: 3,
    name: 'Games',
    image: wwe,
  },
  {
    id: 4,
    name: 'Garden',
    image: garden,
  },
]

const trending = [
  {
    id: 1,
    name: 'Sunglasses',
    image: trend1
  },
  {
    id: 2,
    name: 'Jackets',
    image: trend2
  },
  {
    id: 3,
    name: 'Shoes',
    image: trend3,
  },
  {
    id: 4,
    name: 'Wrist watches',
    image: trend4,
  },
]

const moreItems = [
  {
    id: 1,
    name: 'Silicone Panda',
    image: more1
  },
  {
    id: 2,
    name: 'Beauty Products',
    image: more2
  },
  {
    id: 3,
    name: 'Coffee Mug',
    image: more3,
  },
  {
    id: 4,
    name: 'Flower Tulip Lamp',
    image: more4,
  },
]

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
          <HomeCard title='Appliances for your home | Up to 55% off' products={appliances} />
          <HomeCard title='Pick up where you left off' products={streaming} url='electronics' />
          <HomeCard title='Upto 60% off | Footwear' products={footwear} url='footwear' />
          <HomeCard title='Categories to explore' products={categoriesToExplore} url='books' />
        </div>

        <div className='home__row'>
          <AdCard />
          <HomeCard title='More items to consider' products={moreItems} url='toys' />
          <HomeCard title='Inspired by your shopping trends' products={trending} url='fashion' />
        </div>

        <div className='home__row'>
          {/* <ProductCard /> */}
        </div>
      </div>
    </div>
  )
}

export default Home
