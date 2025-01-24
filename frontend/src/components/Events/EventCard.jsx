import React from 'react'
import styles from '../../styles/style'
import CountDown from './CountDown'

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg${active ? "unset" : "mb-12"} lg: flex p-2 mb-12  `}>
        <div className="w-full lg:w-[50%] m-auto ">
            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>
                I phone 14pro max 8/256gb 
            </h2>
            <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical 
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at 
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
             Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum
               et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
                on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem 
                ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                        1099$
                    </h5>
                    <h5 className='font-bold  text-[20px]  text-[#333] font-Roboto'></h5>
                    
                </div >
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>120 sold</span>
            </div>
            <CountDown/>
        </div>
      
    </div>
  )
}

export default EventCard
