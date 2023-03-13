import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface Fraction {
  _id: String;
  fraction : Number
}
export interface FractionState {
  Fractions?: Fraction[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: FractionState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const fractionSlice = createSlice({
  name: "createFraction",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setFractions: (state, payload) => {
      state.Fractions = payload.payload;
      console.log(" Blog's ", state.Fractions);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getFractions = (search: string): AppThunk => async (dispatch) => {
  console.log('Here I a, calling API')
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  console.log('here URL ' , process.env.REACT_APP_BASE_URL + "count/getAllCount")
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "fractions/getAllFractions",
      headers: {
        "x-auth-token": authToken,
      },
      params:{
        search
      }
    });
    
    let data = res.data;
    dispatch(setFractions(data));
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

export const addFraction = (fraction : any): AppThunk => async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    console.log('here URL ' , process.env.REACT_APP_BASE_URL + "fractions/addFractions")
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "fractions/addFractions",
        data : fraction,
        headers: {
          "x-auth-token": authToken,
        },
      });
      
      let data = res.data;
      dispatch(alert({
        title: `Success`,
        message: res?.data?.message || `Fraction added successfully`,
        severity: "success",
      }))
    //   dispatch(setFractions(data));
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


export const { setLoading, setFailed, setFractions  } = fractionSlice.actions;

export default fractionSlice.reducer;
