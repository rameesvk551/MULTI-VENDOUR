import React from 'react'
import styles from '../../styles/style'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className={`relative m-h-[70vh]  800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    style={{
        backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
    }}>
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className={`text-[35px] leadiing-[1.2] 800px:text-[60px]  text-[#3d3a3a] font-[600] capitalize`}>
            Best collection for <br /> home Decoration
        </h1>
        <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
            trgvwefqydui    ohnjtebfweqm0o
            htrg3fe21jt8h9k3gr-g589gjjg094kgl3thg3
            <br /> thbr9mw 8g3j2fk0qow  
            <Link to="/products" className='inline-block'>
            <div className={`${styles.button} mt-5 `}>
                <span className='text-[#fff] font-[Poppins] text-[18px]'>Shop Now</span>
            </div>
            </Link>

        </p>
      </div>
    </div>
  )
}

export default Hero
