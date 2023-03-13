import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface Payment {
  _id: String;
  fraction: Number;
  paymentCurrency: string;
  nftId: object;
  chatWithUserId: number;
  userId: object;
  amount: number;
  transactionSignature: string;
  paymentType: string;
}
export interface FractionState {
  Payments?: Payment[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: FractionState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const paymentSlice = createSlice({
  name: "createFraction",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPayments: (state, payload) => {
      state.Payments = payload.payload;
      console.log(" Blog's ", state.Payments);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getPayments =
  ({ search, paymentType, limit, page }: any): AppThunk =>
  async (dispatch) => {
    console.log("Here I a, calling API");
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    console.log(
      "here URL ",
      process.env.REACT_APP_BASE_URL + "count/getAllCount"
    );
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "payment/getAllPayment",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          search,
          paymentType,
          limit,
          page
        },
      });

      let data = res.data;
      dispatch(setPayments(data));
    } catch (error) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getPaymentDetail =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `payment/getTaxPaymentById/${id}`,
        // params: {
        //   id
        // },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      return data;
    } catch (error) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(error));
    }
  };

export const getPaymentStats =
  ({ days }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `payment/getPaymentStats`,
        params: {
          days,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      console.log("data =====>", data);
      return data;
    } catch (error) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(error));
    }
  };

export const getPaymentListing =
  ({ days }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `payment/getPaymentListing`,
        params: {
          days,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      console.log("data =====>", data);
      return data;
    } catch (error) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(error));
    }
  };
export const { setLoading, setFailed, setPayments } = paymentSlice.actions;

export default paymentSlice.reducer;
