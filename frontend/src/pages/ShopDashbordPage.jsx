import React from 'react'
import DashboardHeader from '../components/shop/Layout/DashbordHeader'
import DashboardSideBar from '../components/shop/Layout/DashbordSideBar'

const ShopDashbordPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-center justify-between w-full"> 
       <div className="w-[330px]">
        <DashboardSideBar active={1}/>
       </div>
      </div>
    </div>
  )
}

export default ShopDashbordPage
