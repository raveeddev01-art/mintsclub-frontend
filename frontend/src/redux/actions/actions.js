import { toast } from "react-toastify";
import Web3 from "web3";
import {
  // HOME_TEST,
  CURRENT_STEP,
  CURRENT_STEP_DECREMENT,
  CLEAR_CURRENT_STEP,
  // DEPLOY_CONTRACT,
  SET_CONTRACT_INFO,
  CONNECT_WELLET,
  CONTRACT_ERROR_MESSAGE,
  CONTRACT_REPONSE,
  TOKEN_ID,
  MINTING_RESPONSE,
  LOADER,
  CONTRACT_ADDRESS,
} from "../types/types";


import { ENV } from "../../config/config";
import { connectMetamaskCopy } from "../../utils/web3";
import axios from "axios";
import dotenv from "dotenv";
export const currentStepAction = () => (dispatch) => {
  // alert("called")
  
  dispatch({
    type: CURRENT_STEP,
  });
};
export const currentStepDecrement = () => (dispatch) => {
  dispatch({
    type: CURRENT_STEP_DECREMENT,
  });
};
export const clearCurrentStep = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_STEP,
  });
};

export const contractResponse = () => (dispatch) => {
  dispatch({
    type: CONTRACT_REPONSE,
  });
};

export const deployContract = (data, address, supply) => (dispatch) => {
  // dispatch({
  //   type: CONNECT_WELLET,
  //   payload: address,
  // });

  dispatch({
    type: LOADER,
    payload: true,
  });

  const config = {
    headers: {
      // 'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
  };

  let url = `${ENV.url}/createUser`;
  // console.log(url);
  axios
    .post(url, data, config)
    .then(
      (res) => {
        // console.log(res, "response from backendfdkfd");
        const abi = res.data.data.abi;
        if (res.data.status === true) {
          let metaDataList = [];
          for (let i = 1; i <= supply; i++) {
            metaDataList.push(res.data.data.metaData);
            dispatch({
              type: SET_CONTRACT_INFO,
              payload: res.data,
            });
          }

          try {
            const web3 = new Web3(Web3.givenProvider);
            // const gasPrice = "5000000";
            let contract = new web3.eth.Contract(abi, null, {
              data: res.data.data.bytecode,

              from: address,
              // gas: 4600000,
            });
            contract
              .deploy({
                data: res.data.data.bytecode,
                arguments: [res.data.data.name, res.data.data.symbol],
              })
              .send({
                from: address,
                // gas: gasPrice,
              })
              .then((contractInstance) => {
                toast.success("Contract Deployed Successfully!");
                dispatch({
                  type: LOADER,
                  payload: false,
                });

                let info = {
                  ...res.data,
                  contractAddress: contractInstance.options.address,
                };
                dispatch({
                  type: SET_CONTRACT_INFO,
                  payload: {
                    data: { ...info },
                  },
                });
                dispatch({
                  type: CONTRACT_ADDRESS,
                  payload: contractInstance.options.address,
                });
                const contractData = {
                  contractadd: contractInstance.options.address,
                  Network: "Etherium",
                  Deployed: true,
                };

                dispatch({
                  type: CONTRACT_REPONSE,
                  payload: contractData,
                });
              })
              .catch((err) => {
                // console.log("error", err);
                dispatch({
                  type: LOADER,
                  payload: false,
                });
                toast.error("Transaction Failed please check wallet history!");
              });
          } catch (err) {
            dispatch({
              type: LOADER,
              payload: false,
            });
            toast.error("Transaction Failed please check wallet history!");
          }
        } else {
          dispatch({
            type: LOADER,
            payload: false,
          });
          // console.log(res, "dkfjdkfjkdjfkd");
          toast.error(res.data.data);

          // dispatch({
          //   type: CONTRACT_REPONSE,
          //   payload: res.data,
          // });
        }
        // console.log(res);
      },
      (error) => {
        console.log(error,"error handle")
        toast.error(error.response.data.data);
        dispatch({
          type: LOADER,
          payload: false,
        });
        // console.log(error, "error==dfjdkf");
        dispatch({
          type: CONTRACT_ERROR_MESSAGE,
          payload: error,
        });
        // alert("contract response")
        // dispatch({
        //   type: CONTRACT_REPONSE,
        //   payload: error,
        // });
        // resolve(error)
      }
    )
    .catch((err) => {
      console.log(err, "error later==>");
    });
};

export const mintToken = (data, address, supply, email) => (dispatch) => {
  dispatch({
    type: LOADER,
    payload: true,
  });
  // console.log('here is data', data)
  dispatch({
    type: CONNECT_WELLET,
    payload: address,
  });
  let metaDataList = [];
  // console.log(data, "data=====>");
  let metaData = "";
  if (!data.data) {
    metaData = data;
  } else {
    metaData = data.data.metaData;
  }

  for (let i = 1; i <= supply; i++) {
    metaDataList.push(metaData);
  }
  const config = {
    headers: {
      // 'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
  };
  // console.log("metaDataList", metaDataList);

  try {
    const web3 = new Web3(Web3.givenProvider);
    // console.log('web3', web3);
    const contractM = new web3.eth.Contract(
      data.data.abi,
      data.contractAddress
    );
    // console.log("metaDataList", metaDataList);
    contractM.methods
      .batchMint(address, metaDataList, supply)
      .send({
        from: address,
        // gas: 5000000,
      })
      .then((response) => {
        // console.log(response, "res of createNFT===>");
        handleEmailRequest(email);
        let count = localStorage.getItem(address);
        if (count) {
          console.log(typeof (+count*1),"issueee")
          localStorage.setItem(address, (+count*1) + 1);
        } else {
          localStorage.setItem(address, 1);
        }
        toast.success("Minting Successful");
        dispatch({
          type: LOADER,
          payload: false,
        });
        dispatch({
          type: TOKEN_ID,
          payload: response,
        });
        dispatch({
          type: MINTING_RESPONSE,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err, "error==>");
        dispatch({
          type: LOADER,
          payload: false,
        });
        toast.error("Transaction Failed please check wallet history!");
      });
  } catch (err) {
    dispatch({
      type: LOADER,
      payload: false,
    });
    toast.error("Transaction Failed please check wallet history!");
  }
};
const handleEmailRequest = (email) => {
  let data = {
    email,
  };

  const config = {
    headers: {
      // 'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
  };

  let url = `${ENV.url}/addEmail`;
  // console.log(url);
  axios
    .post(url,data, config)
    .then((res) => {
      // console.log(res, "email response==>");
    })
    .catch((err) => console.log(err));
};
export const setContractInfo = () => (dispatch) => {
  dispatch({
    type: SET_CONTRACT_INFO,
  });
};

export const connectWallet = () => (dispatch) => {
  connectMetamaskCopy()
    .then((address) =>
      // console.log(address,"address"),
      dispatch({
        type: CONNECT_WELLET,
        payload: address,
      })
    )
    .catch((err) => console.log(err, "error"));
};

export const hometest = () => (dispatch) => {
  // dispatch({
  // type:HOME_TEST,
  // payload: data
  // })
  // dispatch(emptyError());
  // const url = `${ENV.url}/nfts/${type}`;
  // fetch(url, {
  // method,
  // headers: {
  // 'Authorization': ENV.Authorization,
  // 'x-auth-token': ENV.x_auth_token,
  // 'Access-Control-Allow-Origin': '*',
  // 'x-access-token': ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken ? ENV.getUserKeys('accessToken').accessToken : ''
  // },
  // body
  // }).then(res => res.json()).then(data => {
  // if (data.success) {
  // toast.success(data.message)
  // dispatch({
  // type: UPSERT_NFT,
  // payload: data
  // })
  // } else {
  // toast.error(data.message)
  // dispatch({
  // type: GET_ERRORS,
  // payload: data
  // })
  // }
  // }).catch(error => {
  // if (error.response && error.response.data) {
  // const { data } = error.response
  // if (data.message)
  // toast.error(data.message)
  // }
  // dispatch({
  // type: GET_ERRORS,
  // payload: error
  // })
  // })
};
