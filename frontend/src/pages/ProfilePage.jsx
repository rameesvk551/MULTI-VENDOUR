import React, { useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import ProfileSidebar from "../components/profile/ProfileSideBar";

import styles from "../styles/style";
import ProfileContent from "../components/profile/ProfileContent";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>

        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
    
    </div>
  );
};

export default ProfilePage;
