import { toast } from "react-toastify";
import {
  GET_ERRORS,
  BEFORE_NFT,
  GET_NFTS,
  GET_NFT,
  UPSERT_NFT,
  NFTALL,
  SET_NFT_TOKEN,
  GET_NFTS_BY_COLLECTION,
  GET_MYLIKED_NFTS,
  GET_PROFILE_NFTS,
  CREATE_ACITIVITY,
  GET_ACTIVITIES
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
console.log(url,"upsert nft ==}}}}}}}}}}}}}}}}}}}}}")
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
        console.log(data,"response of upser nft ")
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

export const createActivity = (body) => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}activity/create`;

 
  axios.post(url,body)
  .then(function (response) {
  console.log(response,"response")
  
  })
  .catch(function (error) {
    console.log(error);
    dispatch({
            type: GET_ERRORS,
            payload: error,
          });
  });
};
export const getActivities = (qs=null) => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}activity/get`;
  if(qs){
    url+=`?${qs}`
  }

 
  axios.get(url)
  .then(function (response) {
  console.log( response.data.data,"response")

  dispatch({
    type:GET_ACTIVITIES,
    payload: response.data.data,
  });
  
  })
  .catch(function (error) {
    console.log(error);
    dispatch({
            type: GET_ERRORS,
            payload: error,
          });
  });
};

export const getNFTsByCollection=(id)=>(dispatch)=>{
  

  let data ={
    collectionId:id
  }


  dispatch(emptyError());

    const url = `${ENV.url}nfts/getNFTsByCollection`;
    axios.post(url,data)
    .then(function (response) {
  
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
  
  
}

export const getMyLikedNfts=(qs='')=>(dispatch)=>{


  dispatch(emptyError());

    let url = `${ENV.url}nftLikes/userNftLikes?`;
    url=url+qs
    axios.get(url)
    .then(function (response) {
console.log()
      if (response.data.success) {
        dispatch({
          type: GET_MYLIKED_NFTS,
          payload: response.data.data,
        });
         
            } else {
             
            }
    })
    .catch(function (error) {
      console.log(error);
    
    });
  
  
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
export const addNFTRecord = (formData) => async (dispatch) => {

  const res = await axiosPostFormData(
            "nfts/storeNFTData",
            formData,
            true
          );
};

export const getProfileNfts =
  (qs = "") =>
  (dispatch) => {
    dispatch(emptyError());
    let url = `${ENV.url}nfts/list`;
    if (qs) url += `?${qs}`;



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
        console.log(data,"profile nfts")
        if (data.success) {
          dispatch({
            type: GET_PROFILE_NFTS,
            payload: data.data,
          });
          
        } else {
     
        }
      })
      .catch((errors) => {
     
      });
  };




