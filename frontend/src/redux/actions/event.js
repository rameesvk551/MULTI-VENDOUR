//create product

import axios from "axios";
import { server } from "../../server";


//create event 
export const createEvent = (eventData) => async (dispatch) => {
    try {
      dispatch({ type: "EventCreateRequest" });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
  
      const { data } = await axios.post(`${server}/event/create-event`, eventData, config);
  
      dispatch({
        type: "eventCreateSuccess",
        payload: data.event,
      });
    } catch (error) {
      dispatch({
        type: "eventCreateFail",
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };
  


export const getAllEventsOfShop = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllEventOfShopRequest",
      });
  
      const { data } = await  axios.get(`${server}/event/get-all-events-of-shop/${id}`, {
        withCredentials: true,
      });
      dispatch({
        type: "getAllEventOfShopSuccess",
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: "getAllEventOfShopFail",
        payload: error.response.data.message,
      });
    }
  };
  export const getAllEvents = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllEventRequest",
      });
  
      const { data } = await  axios.get(`${server}/event/get-all-events`, {
        withCredentials: true,
      });
      console.log("eeeeeeventssss",data.allEvents);
      
      dispatch({
        type: "getAllEventSuccess",
        payload: data.allEvents,
      });
    } catch (error) {
      dispatch({
        type: "getAllEventFail",
        payload: error.response.data.message,
      });
    }
  };
  
  
  //delete event of a shop
  export const deleteEvent=(id)=>async(dispatch)=>{
    try {
      dispatch({
        type:"deleteEventRequiest"
      })
      const data= await axios.delete(`${server}/event/delete-shop-event/${id}`)
      dispatch({
        type:"deleteEventSuccess",
        payload:data.message
      })
    } catch (error) {
      dispatch({
        type:"deleteEventFail",
        payload:error.response.data.mesage
      })
      
    }
  }