import React from 'react'
import styles from '../../styles/style'
import CountDown from './CountDown'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const EventCard = ({ active }) => {
    const { allEvents } = useSelector((state) => state.events);
    
    console.log("All events:", allEvents);

    return (
        <div>
            {allEvents.length > 0 ? (
                allEvents.map((event, index) => (
                    <div key={event._id || index} className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 mb-12`}>
                        <div className="w-full lg:w-[50%] m-auto">
                            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt={event.name} />
                        </div>
                        <div className="w-full lg:w-[50%] flex flex-col justify-center">
                            <h2 className={`${styles.productTitle}`}>
                                {event.name}
                            </h2>
                            <p>
                                {event.description}
                            </p>
                            <div className="flex py-2 justify-between">
                                <div className="flex">
                                    <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                                        {event.originalPrice}₹
                                    </h5>
                                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'> 
                                        {event.discountPrice}₹
                                    </h5>
                                </div>
                                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                                    {event.sold || "0"} sold
                                </span>
                            </div>
                            <CountDown data={allEvents} />
                            <br />
                            
                               <div className="flex items-center">
                               <Link>
                            <div className={`${styles.button} text-[#fff]`}>
                                see Details
                            </div></Link>
                            <Link>
                            <div className={`${styles.button} text-[#fff] ml-5`}>
                               add to cart
                            </div></Link>

                               </div>

                

                        </div>
                    </div>
                ))
            ) : (
                <p>No events available</p>
            )}
        </div>
    );
};


export default EventCard
