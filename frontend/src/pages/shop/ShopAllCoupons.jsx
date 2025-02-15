import React from 'react'
import DashboardHeader from '../../components/shop/Layout/DashbordHeader'
import DashboardSideBar from '../../components/shop/Layout/DashbordSideBar'
import AllCoupons from '../../components/shop/AllCoupons'


const ShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default ShopAllCoupouns