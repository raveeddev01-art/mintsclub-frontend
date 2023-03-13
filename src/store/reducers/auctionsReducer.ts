import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface auction {
  _id: String;
  mint: String;
  status: String;
  blockchainType: String;
  auctionPrice: String;
  royaltyFee: String;
}
export interface AuctionState {
  auctions?: auction[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: AuctionState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const auctionSlice = createSlice({
  name: "createAuction",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAuction: (state, payload) => {
      state.auctions = payload.payload;
      console.log(" Blog's ", state.auctions);
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getAllAuctions =
  ({ search, auctionType, page, fraction, limit }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res: any = await axios({
        method: "get",
        url:
          process.env.REACT_APP_BASE_URL + "auction/getAllActiveAuctionAdmin",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          search,
          auctionType: auctionType || undefined,
          page: page || undefined,
          fraction: fraction || undefined,
          limit,
        },
      });

      dispatch(setAuction(res?.data));
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

export const geAuctionsByCollectionName =
  ({ collectionName }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res: any = await axios({
        method: "get",
        url:
          process.env.REACT_APP_BASE_URL + "auction/getAllActiveAuctionAdmin",
        headers: {
          "x-auth-token": authToken,
        },
        // params: {
        //   search,
        //   auctionType,
        // },
      });

      dispatch(setAuction(res?.data));
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

export const getAllCollectionsName = (): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res: any = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "collection/getAllCollectionNames",
      headers: {
        "x-auth-token": authToken,
      },
    });
    return res.data;
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

export const getAuctionDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `auction/getAuction/${id}`,
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

export const { setLoading, setFailed, setAuction } = auctionSlice.actions;

export default auctionSlice.reducer;
