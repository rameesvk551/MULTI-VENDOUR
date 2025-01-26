import axios from "axios";
import { server } from "../../server";

//load user


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/get-user`, {withCredentials:true});
        // Debugging: Log the response data
    console.log("LoadUser Response Data:", data);
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


