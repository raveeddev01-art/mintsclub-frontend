import { toast } from "react-toastify";
import {
  GET_ERRORS,
  BEFORE_COLLECTION,
  SET_AUTH_STATE,
  GET_COLLECTION,
  GET_COLLECTIONS,
  UPSERT_COLLECTION,
  DELETE_COLLECTION,
  BEFORE_CATEGORY,
  COLLECTION_CATEGORES,
  MY_COLLECTIONS,
  GET_POPULAR_COLLECTIONS,
  BEFORE_POPULAR_COLLECTION,
} from "../../redux/types";
import { emptyError } from "../../redux/shared/error/error.action";
import { ENV } from "../../config/config";

export const beforeCollection = () => {
  return {
    type: BEFORE_COLLECTION,
  };
};

export const getCollection = (collectionId) => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}collection/get/${collectionId}`;

  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: GET_COLLECTION,
          payload: data,
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

export const getCollections =
  (qs = null) =>
  (dispatch) => {
    dispatch(emptyError());
    let url = `${ENV.url}collection/list`;

    if (qs) url += `?${qs}`;
    // console.log(url, "url sending=======>");

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: ENV.Authorization,
        "x-auth-token": ENV.x_auth_token,
        "Access-Control-Allow-Origin": "*",
        "x-access-token":
          ENV.getUserKeys("accessToken") &&
          ENV.getUserKeys("accessToken").accessToken
            ? ENV.getUserKeys("accessToken").accessToken
            : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_COLLECTIONS,
            payload: data.data,
          });
        } else {
          toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { data } = error.response;
          if (data.message) toast.error(data.message);
        }
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      });
  };
export const myCollections = (userId) => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}collection/myCollectionList`;

  if (userId) url += `?userId=${userId}`;

  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: MY_COLLECTIONS,
          payload: data.data,
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data.message,
        });
      }
    })
    .catch((error) => {
      // console.log(error, "erro while getting collections");
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};
export const upsertCollection =
  (apiURL, body, method = "POST") =>
  (dispatch) => {
    dispatch(emptyError());
    const url = `${ENV.url}${apiURL}`;
    fetch(url, {
      method,
      headers: {
        Authorization: ENV.Authorization,
        "x-auth-token": ENV.x_auth_token,
        "Access-Control-Allow-Origin": "*",
        "x-access-token":
          ENV.getUserKeys("accessToken") &&
          ENV.getUserKeys("accessToken").accessToken
            ? ENV.getUserKeys("accessToken").accessToken
            : "",
      },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // toast.success(data.message);
          dispatch({
            type: UPSERT_COLLECTION,
            payload: data,
          });
        } else {
          // toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      });
  };

export const deleteCollection = (collectionId) => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}collection/delete/${collectionId}`;

  fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
        dispatch({
          type: DELETE_COLLECTION,
          payload: data,
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data,
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

export const setAuthState = () => (dispatch) => {
  dispatch({
    type: SET_AUTH_STATE,
  });
};
export const beforeCategory = () => {
  return {
    type: BEFORE_CATEGORY,
  };
};
export const getCategories = () => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}category/list`;

  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        dispatch({
          type: COLLECTION_CATEGORES,
          payload: data.categories,
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: data,
        });
      }
    })
    .catch((error) => {

      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};
export const toggleLikeDislike = (body) => (dispatch) => {
  let data = JSON.stringify(body);
  const url = `${ENV.url}collectionLikes/likeDislike`;

  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
    data,
  })
    .then((res) => res.json())
    .then((data) => {
      // This comment added due to eslint error, Empity arrow function
    })
    .catch((error) => {
      // This comment added due to eslint error, Empity arrow function
    });
};

export const beforePopularCollection = () => {
  return {
    type: BEFORE_POPULAR_COLLECTION,
  };
};

export const getPopularCollections =
  (qs = null) =>
  (dispatch) => {
    dispatch(emptyError());

    let url = `${ENV.url}collection/popular`;

    if (qs) url += `?${qs}`;
    //console.log(url, 'url sending');

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: ENV.Authorization,
        "x-auth-token": ENV.x_auth_token,
        "Access-Control-Allow-Origin": "*",
        "x-access-token":
          ENV.getUserKeys("accessToken") &&
          ENV.getUserKeys("accessToken").accessToken
            ? ENV.getUserKeys("accessToken").accessToken
            : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_POPULAR_COLLECTIONS,
            payload: data.data,
          });
        } else {
          toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { data } = error.response;
          if (data.message) toast.error(data.message);
        }
        dispatch({
          type: GET_ERRORS,
          payload: error,
        });
      });
  };
