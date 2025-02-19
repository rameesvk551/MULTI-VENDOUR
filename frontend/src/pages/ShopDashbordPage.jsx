import React from 'react'
import DashboardHeader from '../components/shop/Layout/DashbordHeader'
import DashboardSideBar from '../components/shop/Layout/DashbordSideBar'
import DashboardHero from '../components/shop/DashboardHero'

const ShopDashbordPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full"> 
       <div className="w-[330px]">
        <DashboardSideBar active={1}/>
       </div>
       <DashboardHero/>
      </div>
    </div>
  )
}

export default ShopDashbordPage
