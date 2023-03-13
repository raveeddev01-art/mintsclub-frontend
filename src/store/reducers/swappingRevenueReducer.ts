import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface Collection {
  paidCurrency: String;
  blockchain: String;
  txnHashSendAmount: String;
  sendCurrency: String;
  status: String;
  _id: String;
  userWalletAddress: String;
  adminWalletAddress: String;
  paidAmount: Number;
  txnHashPaidAmount: String;
  sendAmount: Number;
  userId: String;
  updatedAt: Date;
  __v: Number;
}
export interface CollectionState {
  transactions?: Collection[];
  analytics?: [];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: CollectionState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const revenueSlice = createSlice({
  name: "createCollection",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setTransactions: (state, payload) => {
      state.transactions = payload.payload;
      // console.log(" collections ",state.collections);
    },
    setAnalytics: (state, payload) => {
      state.analytics = payload.payload;
      console.log(" collections ", state.analytics);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getAllSwappingRevenues =
  ({ search, status, limit, page }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}buyPiqsol/getAllTransactions`,
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          search,
          status,
          limit,
          page,
        },
      });
      let data = res.data;
      dispatch(setTransactions(data));
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

export const getAllSwappingAnalytics = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}buyPiqsol/getAllTransactionsAnalytics`,
    });
    return res.data;
    // dispatch(setAnalytics(data));
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

export const getSwappingDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `buyPiqsol/getTransaction/${id}`,
        // params: {
        //   auctionId: id
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

export const { setLoading, setFailed, setTransactions, setAnalytics } =
  revenueSlice.actions;

export default revenueSlice.reducer;
