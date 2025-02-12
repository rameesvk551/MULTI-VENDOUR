import axios from "axios";
import { server } from "../../server";

//load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });

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

//load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });

    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const updateUserInfo =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });

      const { data } = await axios.get(
        `${server}/user/update-user-info`,
        { name, email, phoneNumber, password },
        { withCredentials: true }
      );

      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFail",
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

export const addAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AddAddressRequest",
      });

      const { data } = await axios.post(
        `${server}/user/add-address`,
        { country, city, address1, address2, zipCode, addressType },
        { withCredentials: true }
      );
   
      dispatch({
        type: "AddAddressSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "AddAddressFail",
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

  export const deleteAddress =
  (addressId) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AddAddressRequest",
      });

      const { data } = await axios.delete(
        `${server}/user/delete-address/${addressId}`,
        
        { withCredentials: true }
      );
   
      dispatch({
        type: "AddAddressSuccess",
        payload: data
      });
    } catch (error) {
      dispatch({
        type: "AddAddressFail",
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };
