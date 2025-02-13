import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/shop/ShopSettings";
import DashboardSideBar from "../../components/shop/Layout/DashbordSideBar";
import DashboardHeader from "../../components/shop/Layout/DashbordHeader";



const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
