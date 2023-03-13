import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface blog {
  _id: String;
  name: String;
  price: Number;
}
export interface BlogState {
  pricing?: blog[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: BlogState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const pricingSlice = createSlice({
  name: "createBlog",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPricing: (state, payload) => {
      state.pricing = payload.payload;
      console.log(" Blog's ", state.pricing);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getPricing = (search : string): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "pricing/getAllPricing",
      headers: {
        "x-auth-token": authToken,
      },
      params:{
        search
      }
    });

    let data = res.data;
    dispatch(setPricing(data));
  } catch (error) {
    dispatch(alert({
      title: `Failed`,
      message: error?.response?.data?.message || 'something went wrong',
      severity: "error",
    }))
    dispatch(setFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addPricing = (pricingData: any): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "post",
      url: process.env.REACT_APP_BASE_URL + "pricing/addPrice",
      data: pricingData,
      headers: {
        "x-auth-token": authToken,
      },
    });
    dispatch(alert({
      title: `Success`,
      message: res?.data?.message || `Price added successfully`,
      severity: "success",
    }))
    return res.data;
  } catch (error) {
    dispatch(alert({
      title: `Failed`,
      message: error?.response?.data?.message || 'something went wrong',
      severity: "error",
    }))
    dispatch(setFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};


export const { setLoading, setFailed, setPricing } = pricingSlice.actions;

export default pricingSlice.reducer;
