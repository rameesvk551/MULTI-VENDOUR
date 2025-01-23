import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Banner/Hero'
import Categories from '../components/Banner/Categories'
import BestDeals from '../components/Banner/BestDeals'
import FeaturedProduct from '../components/Banner/FeaturedProduct'
import Events from '../components/Events/Events'
import Sponsored from '../components/Banner/Sponsored'
import Footer from '../components/Layout/Footer'

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
     <Hero/>
     <Categories/>
     <BestDeals/>
     <Events/>
     <FeaturedProduct/>
     <Sponsored/>
     <Footer/>
    </div>
  )
}

export default HomePage
