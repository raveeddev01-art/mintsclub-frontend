import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface Count {
  _id: String;
  heading: String;
  description: String;
  seller_fee_basis_points: Number;
  image: String;
}
export interface CountState {
  counts?: Count[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: CountState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const countSlice = createSlice({
  name: "createBlog",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCount: (state, payload) => {
      state.counts = payload.payload;
      console.log(" Blog's ", state.counts);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getCounts = (): AppThunk => async (dispatch) => {
  console.log('Here I a, calling API')
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  console.log('here URL ' , process.env.REACT_APP_BASE_URL + "count/getAllCount")
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "count/getAllCount",
      headers: {
        "x-auth-token": authToken,
      },
    });
    
    let data = res.data;
    dispatch(setCount(data));
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


export const { setLoading, setFailed, setCount  } = countSlice.actions;

export default countSlice.reducer;
