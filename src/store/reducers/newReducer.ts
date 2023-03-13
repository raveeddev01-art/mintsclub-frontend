import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";

import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}

export interface news {
  _id: String;
  newsImage: String;
}

export interface NewsState {
  news?: news[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: NewsState = {
  isLoading: false,
  error: { message: "An error occurred" },
};

export const newsSlice = createSlice({
  name: "createNews",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setNews: (state, { payload }) => {
      state.news = payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getNews =
  ({ search, limit, page }: any): AppThunk =>
  async (dispatch) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      dispatch(setLoading(true));

      const res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "news/getNews",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          search,
          limit,
          page,
        },
      });

      const data = res.data.news;

      dispatch(setNews(data));
    } catch (err: any) {
      console.log("🚀 ~ file: newReducer.ts ~ line 51 ~ err", err);
      dispatch(
        alert({
          title: `Failed`,
          message: err?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(err));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createNews =
  (payload: any): AppThunk =>
  async (dispatch) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      dispatch(setLoading(true));

      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "news/addNews",
        data: payload,
        headers: {
          "x-auth-token": authToken,
        },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `News created successfully`,
          severity: "success",
        })
      );
      return res.data;
    } catch (err: any) {
      console.log("🚀 ~ file: newReducer.ts ~ line 51 ~ err", err);
      dispatch(
        alert({
          title: `Failed`,
          message: err?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(err));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getNewsById =
  (id: String): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "news/getNewsById/",
        params: {
          id,
        },
      });
      console.log("res ====>", res.data);
      return res.data;
    } catch (err: any) {
      console.log("🚀 ~ file: newReducer.ts ~ line 125 ~ err", err);
      dispatch(
        alert({
          title: `Failed`,
          message: err?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(err));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteNews =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      dispatch(setLoading(true));
      const res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "news/deleteNews",
        params: {
          id,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      return data;
    } catch (err: any) {
      console.log("🚀 ~ file: newReducer.ts ~ line 154 ~ err", err);
      dispatch(
        alert({
          title: `Failed`,
          message: err?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(err));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const { setLoading, setFailed, setNews } = newsSlice.actions;

export default newsSlice.reducer;
