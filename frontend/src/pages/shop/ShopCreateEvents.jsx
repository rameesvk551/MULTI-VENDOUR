
import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashbordHeader'
import DashboardSideBar from '../../components/shop/Layout/DashbordSideBar'
import CreateEvent from '../../components/shop/CreateEvent'


const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={6} />
      </div>
      <div className="w-full justify-center flex">
        <CreateEvent />
      </div>
    </div>
    </div>
  )
}

export default ShopCreateEvents