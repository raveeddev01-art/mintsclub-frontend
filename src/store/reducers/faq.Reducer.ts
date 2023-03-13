import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface FAQ {
  _id: String;
  question: string;
  answer: string;
}
export interface CountState {
  faqs?: FAQ[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: CountState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const faqSlice = createSlice({
  name: "createFaq",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setFaq: (state, payload) => {
      state.faqs = payload.payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const createFaq =
  (faq: object): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "faq/addFaq",
        data: faq,
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
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

export const getFaqs = ({search, limit, page}: any): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "faq/getAllFaqs",
      headers: {
        "x-auth-token": authToken,
      },
      params: {
        search,
        limit,
        page
      },
    });

    let data = res.data;
    dispatch(setFaq(data));
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

export const deleteFaq =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "faq/deleteFaq/" + id,

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

export const updateFaq =
  (faq: object): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "faq/updateFaq",
        data: faq,
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
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

export const { setLoading, setFailed, setFaq } = faqSlice.actions;

export default faqSlice.reducer;
