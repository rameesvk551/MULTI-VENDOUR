//create product

import axios from "axios"
import { server } from "../../server"

export const createProduct=(newForm)=>async(dispach)=>{
    console.log("forrrrrrrrm daaaaata",newForm);
    
    try {
        dispach({
            type:"productCreateRequest"
        })

        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data}=axios.post(
            `${server}/create-product`,
            newForm,config
        );
        dispach({
            type:"productCreateSuccess",
            payload:data.product
        })
    } catch (error) {
        dispach({
            type:"productCreateFail",
            payload:error.response.data.message
        })
        
    }
}