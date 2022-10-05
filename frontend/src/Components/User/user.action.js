import { toast } from 'react-toastify';
import { ENV } from '../../config/config';
import {
  GET_ERRORS,
  SET_USER,
  GET_USER,
  SET_CREATORS,
  TOP_SELLERS,
  SET_INDIVIDUAL_USER,
  BEFORE_USER,
  UPDATE_API_STATEC,
  EDIT_APPROVAL,
  GET_APPROVALS
} from '../../redux/types';
// import { emptyError } from '../../redux/shared/error/error.action';


export const beforeUser = () => {
  return {
    type: BEFORE_USER,
  };
};

// method to set user data
export const setUser = (user) => (dispatch) => {
 // dispatch(emptyError());
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

// method to get user data
export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER,
  });
};

// method to login using wallet address and sign
export const login = (payload) => (dispatch) => {
 // dispatch(emptyError());
  const url = `${ENV.url}auth/login/`;


  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'Access-Control-Allow-Origin': '*',
      'x-auth-token': ENV.x_auth_token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        ENV.encryptUserData(data.data);
        const userId = data.data._id;
        // dispatch(getCollections());
        dispatch({
          type: SET_USER,
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

// method to signup using wallet address, sign, and payload
export const signup = (payload) => (dispatch) => {
 // dispatch(emptyError());
  const url = `${ENV.url}auth/register/`;

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: ENV.Authorization,
      'Access-Control-Allow-Origin': '*',
      'x-auth-token': ENV.x_auth_token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        ENV.encryptUserData(data.data);
        // dispatch(getCollections());
        dispatch({
          type: SET_USER,
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
      // console.log(errors, 'register resonse');
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// method to update user's profile, update user's payload
export const updateProfile = (body) => (dispatch) => {
 // dispatch(emptyError());
  const url = `${ENV.url}users/updateProfile`;

  fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') &&
        ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : '',
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        dispatch({
          type: SET_USER,
          payload: data.data,
        });
      } else {
        toast.success(data.message);
        dispatch({
          type: GET_ERRORS,
          payload: data,
        });     
      }
    })
    .catch((errors) => {
      // console.log(errors, 'update profile response');
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
  
    });
};
export const getApprovals = () => (dispatch) => {

 // dispatch(emptyError());
  const url = `${ENV.adminUrl}approvals/list`;
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') &&
        ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : '',
    },
  
  })
    .then((res) => res.json())
    .then((data) => {
   
      if(data.success){
        dispatch({
          type:GET_APPROVALS,
          payload:data.data
        })
      }
    })
    .catch((errors) => {
   
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
export const updateApprovals = (body) => (dispatch) => {

 // dispatch(emptyError());
  const url = `${ENV.adminUrl}approvals/edit`;
  fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') &&
        ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : '',
    },
    body
  
  })
    .then((res) => res.json())
    .then((data) => {
    
      if(data.success){
        toast.success(data.message)
        dispatch({
          type:EDIT_APPROVAL,
          payload:data.data
        })
      }
    })
    .catch((errors) => {
   
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// method to get authors' details
export const getTopSellers =
  (qs = null) =>
  (dispatch) => {
   // dispatch(emptyError());
    //console.log('query string', qs);

    let url = `${ENV.url}users/top-sellers`;

    if (qs) {
      url += `?${qs}`;
    }
   

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: ENV.Authorization,
        'x-auth-token': ENV.x_auth_token,
        'Access-Control-Allow-Origin': '*',
        'x-access-token':
          ENV.getUserKeys('accessToken') &&
          ENV.getUserKeys('accessToken').accessToken
            ? ENV.getUserKeys('accessToken').accessToken
            : '',
      },
      //   body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        
          dispatch({
            type: TOP_SELLERS,
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

// method to get authors' details
export const getCreators = (body) => (dispatch) => {
 // dispatch(emptyError());
  const url = `${ENV.url}users/creators`;
  // const url = `http://3.142.91.8/v1/front/users/creators`;

  fetch(url, {
    method: 'POST',
    headers: {
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') &&
        ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : '',
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        dispatch({
          type: SET_CREATORS,
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

// method to get authors' details
export const getUserById = (userId) => (dispatch) => {
 // dispatch(emptyError());
  const url = `${ENV.url}users/${userId}`;
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: ENV.Authorization,
      'x-auth-token': ENV.x_auth_token,
      'Access-Control-Allow-Origin': '*',
      'x-access-token':
        ENV.getUserKeys('accessToken') &&
        ENV.getUserKeys('accessToken').accessToken
          ? ENV.getUserKeys('accessToken').accessToken
          : '',
    },
  })
    .then((res) => res.json())
    .then((data) => {
     
      if (data.success) {
        dispatch({
          type: SET_INDIVIDUAL_USER,
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

// method to get authors' details
export const setIndividualUserData = (user) => (dispatch) => {
 // dispatch(emptyError());
  dispatch({
    type: SET_INDIVIDUAL_USER,
    payload: user,
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: SET_USER,
    userAuth: false,
    userData: null,
  });
  // dispatch(setAuthState());
  localStorage.removeItem('encuse');
};
