import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../store";
import { alert } from "./alertSlice";
import { ToastContainer, toast } from 'react-toastify';


export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuth: boolean;
  currentUser?: CurrentUser;
  isLoading: boolean;
  error: AuthError;
  token?: string;
}

export interface CurrentUser {
  _id?: string;
  email: string;
  fullName: string;
}
export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, payload) => {
      state.currentUser = payload.payload;
      // state.isAuth = true;
      console.log("setprofile  state", state.currentUser);
    },
    setAuthLoginSuccess: (state: any, payload) => {
      const data = payload.payload.user;
      let communityLinks = [];
      if (data?.communityLinks) {
        communityLinks = JSON.parse(data?.communityLinks);
      }
      const currentUserData = {
        name: data?.fullName,
        // url: data?.url,
        // description: data?.description,
        // avatar: data?.avatar,
        // cover: data?.cover,
        // walletAddress: data?.walletAddress,
        // createdAt: data?.createdAt,
        // communityLinks: communityLinks,
      };
      state.currentUser = currentUserData;
      state.token = payload.payload.token;
      state.isAuth = true;
      // console.log("Response from server ",state)
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
      // localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      // console.log("Auth Token 123 ",localStorage.getItem("authToken"));
    },
    setAuthFailed: (state, { payload }) => {
      state.error = payload;
      state.isAuth = false;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const login =
  (body: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      if (body) {
        // dispatch(setWalletAddress(walletAddressPublicKey));
        let res = await axios({
          method: "post",
          url: process.env.REACT_APP_BASE_URL + "staff/login",
          data: body,
          headers: { Accept: "application/json" },
        });
        let data = res.data;
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("authUser", JSON.stringify(data.user));
          dispatch(setAuthLoginSuccess(data));
        }
        dispatch(
          alert({
            title: `Success`,
            message: res?.data?.message || `Logged in successfully`,
            severity: "success",
          })
        );
        return data;
      }
    } catch (error: any) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setAuthFailed(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const Registeration =
  (body: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      if (body) {
        let res = await axios({
          method: "post",
          url: process.env.REACT_APP_BASE_URL + "staff/create",
          data: body,
          headers: { Accept: "application/json" },
        });
        dispatch(
          alert({
            title: `Success`,
            message: res?.data?.message || `SignUp successfully`,
            severity: "success",
          })
        );
        return res.data;
        // console.log("Response from server ", data);
        // if (data.token) {
        //   localStorage.setItem("authToken", data.token);
        //   localStorage.setItem("authUser", JSON.stringify(data.user));
        //   dispatch(setAuthLoginSuccess(data));
        // }

        // return data;
      }
    } catch (error: any) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setAuthFailed(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getUserProfile = (): AppThunk => async (dispatch) => {
  console.log("getUserProfile");
  dispatch(setLoading(true));
  try {
    const authToken = localStorage.getItem("authToken") || "";
    const res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "user/getUserDetail",
      headers: {
        "x-auth-token": authToken,
      },
    });
    const data = await res.data;
    let communityLinks = [];
    if (data?.communityLinks) {
      communityLinks = await JSON.parse(data?.communityLinks);
    }
    const currentUserData = {
      name: data?.fullName,
      url: data?.url,
      description: data?.description,
      avatar: data?.avatar,
      cover: data?.cover,
      walletAddress: data?.walletAddress,
      createdAt: data?.createdAt,
      communityLinks: communityLinks,
    };
    dispatch(setAuthSuccess(currentUserData));
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
export const updateUserProfile =
  (formData: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "user/editUserDetail",
        data: formData,
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
      let communityLinks = JSON.parse(data?.communityLinks);
      let currentUserData = {
        name: data?.fullName,
        url: data?.url,
        description: data?.description,
        avatar: data?.avatar,
        cover: data?.cover,
        communityLinks: communityLinks,
      };
      dispatch(setAuthSuccess(currentUserData));
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Profile updated successfully`,
          severity: "success",
        })
      );
      return currentUserData;
    } catch (error: any) {
      dispatch(
        alert({
          title: `Failed`,
          message: error?.response?.data?.message || "something went wrong",
          severity: "error",
        })
      );
      dispatch(setFailed(error));
      return false;
    }
  };

export const {
  setAuthSuccess,
  setLogOut,
  setLoading,
  setAuthLoginSuccess,
  setAuthFailed,
  setFailed,
} = authSlice.actions;

export const authSelector = (state: RootState) => state;

export default authSlice.reducer;
