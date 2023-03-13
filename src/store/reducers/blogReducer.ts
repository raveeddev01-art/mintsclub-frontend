import { createSlice } from "@reduxjs/toolkit";

import { AppThunk } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface blog {
  _id: String;
  heading: String;
  description: String;
  seller_fee_basis_points: Number;
  image: String;
}
export interface BlogState {
  blogs?: blog[];
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: BlogState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const blogSlice = createSlice({
  name: "createBlog",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBlog: (state, payload) => {
      state.blogs = payload.payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getBlogs =
  ({ search, limit, page }: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "blog/getBlogListing",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          search,
          limit,
          page,
        },
      });

      let data = res.data;
      dispatch(setBlog(data));
    } catch (error: any) {
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

export const creteBlogs =
  (blogsData: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "blog/create",
        data: blogsData,
        headers: {
          "x-auth-token": authToken,
        },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Blog created successfully`,
          severity: "success",
        })
      );
      return res.data;
    } catch (error: any) {
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

export const updateBlog =
  (blogsData: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "blog/updateBlog",
        data: blogsData,
        headers: {
          "x-auth-token": authToken,
        },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Blog Updated successfully`,
          severity: "success",
        })
      );
      return res.data;
    } catch (error: any) {
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

export const getBlogDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    console.log(process.env.REACT_APP_BASE_URL + "blog/getBlogDetails/" + id);
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "blog/getBlogDetails/" + id,
        headers: {
          "x-auth-token": authToken,
        },
      });
      console.log("res ====>", res.data);
      return res.data;
    } catch (error: any) {
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
    } catch (error: any) {
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

export const deleteBlog =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "blog/deleteBlog/" + id,

        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      return data;
    } catch (error: any) {
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

export const { setLoading, setFailed, setBlog } = blogSlice.actions;

export default blogSlice.reducer;
