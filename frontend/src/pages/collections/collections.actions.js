import { toast } from 'react-toastify';
import Web3 from 'web3';
import { connectMetamask } from '../../utils/web3';
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
  COLLECTION_DEPLOY_ABI
} from '../../redux/types';
import { emptyError } from '../../redux/shared/error/error.action';
import { ENV } from '../../config/config';

export const beforeCollection = () => {
  return {
    type: BEFORE_COLLECTION
  };
};

export const getCollection = (collectionId) => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}collection/get/${collectionId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: GET_COLLECTION,
          payload: data
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        payload: error
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
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: ENV.Authorization,
        'x-auth-token': ENV.x_auth_token,
        'Access-Control-Allow-Origin': '*',
        'x-access-token':
          ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
            ? ENV.getUserKeys('accessToken').accessToken
            : ''
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_COLLECTIONS,
            payload: data.data
          });
        } else {
          toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data
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
          payload: error
        });
      });
  };
export const myCollections = (userId) => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}collection/myCollectionList`;

  if (userId) url += `?userId=${userId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: MY_COLLECTIONS,
          payload: data.data
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data.message
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
        payload: error
      });
    });
};
export const upsertCollection =
  (apiURL, body, method = 'POST') =>
  (dispatch) => {
    dispatch(emptyError());
    const url = `${ENV.url}${apiURL}`;
    fetch(url, {
      method,
      headers: {
        Authorization: ENV.Authorization,
        'x-auth-token': ENV.x_auth_token,
        'Access-Control-Allow-Origin': '*',
        'x-access-token':
          ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
            ? ENV.getUserKeys('accessToken').accessToken
            : ''
      },
      body
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // toast.success(data.message);
          dispatch({
            type: UPSERT_COLLECTION,
            payload: data
          });
        } else {
          // toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error
        });
      });
  };

export const deleteCollection = (collectionId) => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}collection/delete/${collectionId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.message);
        dispatch({
          type: DELETE_COLLECTION,
          payload: data
        });
      } else {
        toast.error(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        payload: error
      });
    });
};

export const setAuthState = () => (dispatch) => {
  dispatch({
    type: SET_AUTH_STATE
  });
};
export const beforeCategory = () => {
  return {
    type: BEFORE_CATEGORY
  };
};
export const getCategories = () => (dispatch) => {
  dispatch(emptyError());
  const url = `${ENV.url}category/list`;

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        dispatch({
          type: COLLECTION_CATEGORES,
          payload: data.categories
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: data
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
        payload: error
      });
    });
};
export const toggleLikeDislike = (body) => (dispatch) => {
  let data = JSON.stringify(body);
  const url = `${ENV.url}collectionLikes/likeDislike`;

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    },
    data
  })
    .then((res) => res.json())
    .then((data) => {})
    .catch((error) => {
      //console.log(error, 'error likes');
    });
};

export const beforePopularCollection = () => {
  return {
    type: BEFORE_POPULAR_COLLECTION
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
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: ENV.Authorization,
        'x-auth-token': ENV.x_auth_token,
        'Access-Control-Allow-Origin': '*',
        'x-access-token':
          ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
            ? ENV.getUserKeys('accessToken').accessToken
            : ''
      }
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data, 'popular collections api response');
        if (data.success) {
          dispatch({
            type: GET_POPULAR_COLLECTIONS,
            payload: data.data
          });
        } else {
          toast.error(data.message);
          dispatch({
            type: GET_ERRORS,
            payload: data
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
          payload: error
        });
      });
  };
export const deployContract = () => (dispatch) => {
  dispatch(emptyError());
  let url = `${ENV.url}collection/deploy`;
  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') && ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : ''
    }
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status) {
        console.log('data', data);
        const abi = data?.data.abi;
        dispatch({
          type: COLLECTION_DEPLOY_ABI,
          payload: data
        });
        // if (await validateNetwork()) {
        try {
          const web3 = new Web3(Web3.givenProvider);
          // const gasPrice = "5000000";
          const address = await connectMetamask();
          // console.log('bytecode', data.data.bytecode);
          let contract = await new web3.eth.Contract(abi, null, {
            data: data.data.bytecode,
            from: address
            // gas: 4600000,
          });
          console.log('contract', contract);
          contract
            .deploy({
              data: data?.data?.bytecode,
              arguments: ['test']
            })
            .send({
              from: address
              // gas: gasPrice,
            })
            .then((contractInstance) => {
              toast.success('Contract Deployed Successfully!');
              let info = {
                ...data.data,
                contractAddress: contractInstance.options.address
              };
              console.log('info', info);
              // dispatch({
              //   type: SET_CONTRACT_INFO,
              //   payload: {
              //     data: { ...info },
              //   },
              // });
              // dispatch({
              //   type: CONTRACT_ADDRESS,
              //   payload: contractInstance.options.address,
              // });
              const contractData = {
                contractadd: contractInstance.options.address,
                Network: 'Etherium',
                Deployed: true
              };
              console.log('contractData', contractData);

              // dispatch({
              //   type: CONTRACT_REPONSE,
              //   payload: contractData,
              // });
            })
            .catch((err) => {
              console.log('error', err);
              // dispatch({
              //   type: LOADER,
              //   payload: false,
              // });
              toast.error('Transaction Failed please check wallet history!');
            });
        } catch (err) {
          console.log('error', err);
          // dispatch({
          //   type: LOADER,
          //   payload: false,
          // });
          toast.error('Transaction Failed please check wallet history!');
        }
        // }
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: data
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};
