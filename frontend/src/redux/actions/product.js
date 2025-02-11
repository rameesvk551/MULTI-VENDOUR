//create product

import axios from "axios";
import { server } from "../../server";

export const createProduct = (newForm) => async (dispatch) => {
  for (let pair of  newForm.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(`${server}/product/create-product`, newForm, config);
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-product-of-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};


//delete product of a hop
export const deleteProduct=(id)=>async(dispatch)=>{
  try {
    dispatch({
      type:"deleteProductRequiest"
    })
    const data= await axios.delete(`${server}/product/delete-shop-product/${id}`)
    dispatch({
      type:"deleteProductSuccess",
      payload:data.message
    })
  } catch (error) {
    dispatch({
      type:"deleteProductFail",
      payload:error.response.data.mesage
    })
    
  }
}