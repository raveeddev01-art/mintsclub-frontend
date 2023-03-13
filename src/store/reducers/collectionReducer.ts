import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import axios from "axios";
import { alert } from "./alertSlice";

export interface ErrorMessage {
  message: string;
}
export interface Collection {
  _id?: String;
  userId?: String;
  fullName?: String;
  avatar?: String;
  cover?: String;
  communityLinks?: [];
  description?: String;
  url?: String;
}
export interface CollectionState {
  currentCollection?: Collection;
  collections?: Collection[];
  featuredCollections?: any;
  launchersCollection?: any;
  isLoading: boolean;
  error: ErrorMessage;
}

export const initialState: CollectionState = {
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const collectionSlice = createSlice({
  name: "createCollection",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setCurrentCollectionSuccess: (state, { payload }) => {
      state.currentCollection = payload;
      // console.log("Dispatch collection ", state.currentCollection);
    },
    setLauncherCollections: (state, { payload }) => {
      state.launchersCollection = payload;
    },

    setCollections: (state, payload) => {
      state.collections = payload.payload;
      // console.log(" collections ",state.collections);
    },
    setFeaturedCollection: (state, payload) => {
      state.featuredCollections = payload.payload;
    },
    updateFeaturedCollectionStatus: (state, payload) => {
      state.featuredCollections = payload.payload;
    },
    updateCollectionStatus: (state, payload) => {
      state.collections = payload.payload;
      // console.log(" collections ",state.collections);
    },
    updateLauncherCollections: (state, { payload }) => {
      state.launchersCollection = payload;
    },
    setFailed: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const createCollection =
  (formData: any): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";

    try {
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "collection/addCollection",
        data: formData,
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Collection created successfully`,
          severity: "success",
        })
      );
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

export const getMyCreatedCollections = (): AppThunk => async (dispatch) => {
  const authToken = localStorage.getItem("authToken") || "";
  dispatch(setLoading(true));
  try {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "collection/getOwnCollections",
      headers: {
        "x-auth-token": authToken,
      },
    });
    let data = res.data;
    dispatch(setCollections(data));
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

export const getCollectionDetail =
  (collectionId: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}collection/getCollectionById/${collectionId}`,
      });
      let data = res.data;
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
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getCollectionNfts =
  (collectionId: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}collection/getNftsByCollection/${collectionId}`,
      });
      let data = res.data;
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
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllCollectionNFT =
  ({ search, isVerified, limit, page }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}listing/getAllCollection`,
        params: {
          search,
          isVerified,
          limit,
          page,
        },
      });
      let data = res.data;
      dispatch(setCollections(data));
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

export const getAllFeaturedCollection =
  ({ search, isVerified, limit, page }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const authToken = localStorage.getItem("authToken") || "";
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}collection/getRquestedFeaturedCollections`,
        params: {
          search,
          isVerified,
          limit,
          page,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
      dispatch(setFeaturedCollection(data));
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

export const changeCollectionStatus =
  ({ isVerified, id }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_BASE_URL}collection/collectionStatus/${id}`,
        headers: {
          "x-auth-token": authToken,
        },
        data: { isVerified },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Collection updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const changeCollectionActivation =
  ({ status, id }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}collection/activationStatus`,
        headers: {
          "x-auth-token": authToken,
        },
        data: { id, status },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Collection updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const getCollectionDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const authToken = localStorage.getItem("authToken") || "";
    dispatch(setLoading(true));
    try {
      let res = await axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "collection/getCollectionById",
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

export const makeCollectionFeatured =
  (collectionId: string, featured: boolean): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}collection/makeCollectionFeature/${collectionId}`,
        params: {
          featured,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      dispatch(
        alert({
          title: `Success`,
          message:
            res?.data?.message || `Collection featured updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const approvedLauncherDrop =
  (inputs: { id: string; isApproved: boolean }): AppThunk =>
  async (dispatch) => {
    console.log("🚀 ~ file: collectionReducer.ts ~ line 393 ~ batchId", inputs);
    const { id: batchId, isApproved: approved } = inputs;
    dispatch(setLoading(true));
    try {
      const authToken = localStorage.getItem("authToken") || "";
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}batch/approvedOrDisapprovedLauncher/${batchId}`,
        params: {
          approved,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      dispatch(
        alert({
          title: `Success`,
          message: res?.data?.message || `Launcher drop updated successfully`,
          severity: "success",
        })
      );
      return res?.data;
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

export const getAllRequestedApprovalLaunchers =
  ({ limit, page }: any): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const authToken = localStorage.getItem("authToken") || "";
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}batch/getRequestedApprovalLaunchpad`,
        params: {
          limit,
          page,
        },
        headers: {
          "x-auth-token": authToken,
        },
      });
      let data = res.data;
      dispatch(setLauncherCollections(data));
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

export const {
  setCurrentCollectionSuccess,
  setLoading,
  setFailed,
  setCollections,
  updateCollectionStatus,
  updateFeaturedCollectionStatus,
  setFeaturedCollection,
  updateLauncherCollections,
  setLauncherCollections,
} = collectionSlice.actions;

export default collectionSlice.reducer;
