import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../store";
import { alert } from "./alertSlice";

export interface AuthError {
  message: string;
}

export interface UserState {
  isAuth: boolean;
  users?: CurrentUser[];
  chatSelectedUser?: CurrentUser;
  isLoading: boolean;
  error: AuthError;
  token?: string;
  user?: object;
}

export interface CurrentUser {
  id?: string;
  fullName?: string;
  discription?: string;
  url?: string;
  walletAddress?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  // communityLinks?: [];
}
export const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    loggedInUser: (state, { payload }) => {
      state.user = payload;
    },
    chatSelectedUser: (state, payload) => {
      state.chatSelectedUser = payload.payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const getAllUsers =
  ({
    isVerified,
    search,
    startDate,
    endDate,
    sort,
    page,
    limit,
  }: any): AppThunk =>
  async (dispatch) => {
    console.log("startDate ====>", startDate);
    console.log("end Date ====>", endDate);
    // console.log("Get form Data")
    dispatch(setLoading(true));
    console.log("sort =====>", sort);
    try {
      const authToken = localStorage.getItem("authToken") || "";
      // console.log("All users authToken ", JSON.stringify(authToken));
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "listing/getAllUsers",
        headers: {
          "x-auth-token": authToken,
        },
        params: {
          isBlocked: isVerified === "blocked" || undefined,
          isVerified: (isVerified !== "blocked" && isVerified) || undefined,
          search,
          startDate: startDate !== "" ? startDate : undefined,
          endDate: endDate !== "" ? endDate : undefined,
          sort: sort === "Ascending" ? 1 : -1,
          limit,
          page,
        },
      });
      let data = res.data;
      dispatch(setUsers(data));
      return res?.data;
      // console.log("All users ", JSON.stringify(data));
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

export const changeUserVerifiedStatus =
  ({ isVerified, id }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_BASE_URL}user/changeVerifiedStatus/${id}`,
        headers: {
          "x-auth-token": authToken,
        },
        data: { isVerified },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `User updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const changeUserBlockStatus =
  ({ isBlocked, id }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_BASE_URL}user/changeBlockStatus/${id}`,
        headers: {
          "x-auth-token": authToken,
        },
        data: { isBlocked },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `User updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const getUserDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `user/getUser/${id}`,
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

export const getLoggedInUser = (): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  try {
    dispatch(setLoading(true));
    if (authToken && authToken !== "") {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + `admin/getLoggedInAdmin`,
        headers: {
          "x-auth-token": authToken,
        },
      });
      const data = res.data;
      dispatch(loggedInUser(data));
      return data;
    }
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

export const updateMe =
  (data: object): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "patch",
        url: process.env.REACT_APP_BASE_URL + `admin/updateMe`,
        headers: {
          "x-auth-token": authToken,
        },
        data,
      });
      dispatch(loggedInUser(res?.data));
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Profile updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const {
  setUsers,
  setLoading,
  setFailed,
  chatSelectedUser,
  loggedInUser,
} = userSlice.actions;

export default userSlice.reducer;
