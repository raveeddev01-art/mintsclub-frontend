import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface nft {
  _id: String;
  userId: String;
  assetUrl: String;
  key: Number;
  mint: String;
  name: String;
  artistName: String;
  symbol: String;
  description: String;
  seller_fee_basis_points: Number;
  image: String;
  external_url: String;
  properties: Object;
  creators: [];
  primarySaleHappened: Number;
  isMutable: Number;
  editionNonce: Number;
  tokenStandard: Number;
}
export interface NftState {
  nfts?: nft[];
  nftsSales?: any;
  trendingNfts?: nft[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: NftState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const nftSlice = createSlice({
  name: "createNft",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setNfts: (state, payload) => {
      state.nfts = payload.payload;
    },
    setNftSales: (state, payload) => {
      state.nftsSales = payload.payload;
    },
    setTrendingNfts: (state, payload) => {
      state.trendingNfts = payload.payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getAllNft =
  ({ limit, page, filter }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "listing/getAllNft",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          limit,
          page,
          filter,
        },
      });
      let data = res.data;

      dispatch(setNfts(data));
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

export const getSearchedNft =
  ({ filter }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `auction/getSearchResults`,
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          filter,
        },
      });
      let data = res.data;
      dispatch(setNfts(data.nfts));
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

export const getNftDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "nft/getNftDetail",
        params: {
          id,
        },
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

export const getUserNft =
  (userId: string, filter: Object): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "nft/getAllNftData/admin",
        params: {
          userId,
          filter,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      console.log("data======?? User Nft ", data);
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

export const getTrendingNft = (): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "activity/getTrendingNft",
      headers: {
        "x-auth-token": authToken,
      },
    });
    let data = res.data;
    dispatch(setTrendingNfts(data));
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

export const getNftActivities =
  (nftId: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "activity/getNftActivity",
        data: {
          nftId,
        },
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
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getNftsSalesActivities =
  ({ search, nftType, limit, page }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "activity/getNftSaleActivity",
        params: {
          search,
          nftType,
          limit,
          page,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      dispatch(setNftSales(data));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

export const { setLoading, setFailed, setNfts, setTrendingNfts, setNftSales } =
  nftSlice.actions;

export default nftSlice.reducer;
