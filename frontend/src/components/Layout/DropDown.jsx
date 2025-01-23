import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/style'

const DropDown = ({categoriesData,setDropDown,dropDown}) => {
    console.log("categorrr",categoriesData)
    console.log("categorrr",dropDown)
    const navigate=useNavigate()
    const handleSubmit=(category)=>{
        console.log("categorrr",category)
        navigate(`/product?category=${category.title}`)
        setDropDown(false)
        window.location.reload()

    }
  return (
    <div className='pb-4 w-[270px] bg-[#fff] absolute z-30  rounded-b-md shadow-sm'>
        {
            
            
            categoriesData && 
            categoriesData.map((category,index)=>(
                <div key={index}
                className={`${styles.noramlFlex}`}
                onClick={()=>handleSubmit(category)}>
                    <img src={category.image_Url} style={{
                        width:"25px",
                        height:"25px",
                        objectFit:"container",
                        marginLeft:"10px",
                        userSelect:"none"

                    }} />
                    <h3 className='m-3 cursor-pointer select-none'>{category.title}</h3>
                </div>
            ))
        }
      
    </div>
  )
}

export default DropDown
