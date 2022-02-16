import { toast } from "react-toastify";
import {
  GET_ERRORS,
  BEFORE_NFT,
  GET_NFTS,
  GET_NFT,
  UPSERT_NFT,
  NFTALL,
  SET_NFT_TOKEN,
  GET_NFTS_BY_COLLECTION
} from "../../redux/types";
import { ENV } from "./../../config/config";
import { emptyError } from "../../redux/shared/error/error.action";
import {
    axiosPostFormData,
    decimalNumberValidator,
  } from "./../../utils/functions";
  import axios from 'axios'

export const beforeNFT = () => {
  return {
    type: BEFORE_NFT,
  };
};
export const upsertNFT =
  (type = "create", body, method = "POST") =>
  (dispatch) => {
    dispatch(emptyError());
    const url = `${ENV.url}/nfts/${type}`;

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
          toast.success(data.message);
          dispatch({
            type: UPSERT_NFT,
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

export const getNFTs =
  (qs = "") =>
  (dispatch) => {
    dispatch(emptyError());
    let url = `${ENV.url}nfts/list`;
    if (qs) url += `?${qs}`;

    console.log(url,"url for getting nfts list")

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
        console.log(data,"check data if ");
        console.log(data,"check dataddif ");
        if (data.success) {
          //change to data.data first dispatch
          dispatch({
            type: GET_NFTS,
            payload: data.data,
          });
          dispatch({
            type: NFTALL,
            payload: data.data,
          });
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: data,
          });
        }
      })
      .catch((errors) => {
        dispatch({
          type: GET_ERRORS,
          payload: errors,
        });
      });
  };

export const getNFT = (nftId) => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}nfts/get/${nftId}`;

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

      // alert("called")
      if (data.success) {
        dispatch({
          type: NFTALL,
          payload: data.data,
        });
        dispatch({
          type: GET_NFT,
          payload: data.data,
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: data,
        });
      }
    })
    .catch((errors) => {
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
   
    });
};

export const getNFTsByCollection=(id)=>(dispatch)=>{
  
  console.log("sending reqest==>",id)
  let data ={
    collectionId:id
  }


  dispatch(emptyError());

    const url = `${ENV.url}nfts/getNFTsByCollection`;
    axios.post(url,data)
    .then(function (response) {
      console.log(response);
      if (response.data.success) {
              dispatch({
                type:GET_NFTS_BY_COLLECTION,
                payload:response.data.data
              })
         
            } else {
              dispatch({
                type: GET_ERRORS,
                payload: response.data,
              });
            }
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
              type: GET_ERRORS,
              payload: error,
            });
    });
  
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: ENV.Authorization,
    //     "x-auth-token": ENV.x_auth_token,
    //     "Access-Control-Allow-Origin": "*",
    //     "x-access-token":
    //       ENV.getUserKeys("accessToken") &&
    //       ENV.getUserKeys("accessToken").accessToken
    //         ? ENV.getUserKeys("accessToken").accessToken
    //         : "",
    //   },
    //   data
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //        console.log(data,"nftByCollection")
    //     if (data.success) {
    //       dispatch({
    //         type:GET_NFTS_BY_COLLECTION,
    //         payload:data.data
    //       })
     
    //     } else {
    //       dispatch({
    //         type: GET_ERRORS,
    //         payload: data,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error,"errors by nftByCollection")
    //     dispatch({
    //       type: GET_ERRORS,
    //       payload: error,
    //     });
     
    //   });
}

export const createNFT= async (formData)=>{
    try {

        const res = await axiosPostFormData(
            "nfts/create",
            formData,
            true
          );
    }
    catch(err){

    }
}
export const setNftToken = (formData) => async (dispatch) => {

  const res = await axiosPostFormData(
            "nfts/storeNFTData",
            formData,
            true
          );
};




