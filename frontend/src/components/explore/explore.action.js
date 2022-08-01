
import { ENV } from './../../config/config';
import {TOGGLE_LIKE_RES,BEFORE_TOGGLE_LIKE } from '../../redux/types';
import axios from 'axios'

export const beforeTogleLikeDislike=()=>dispatch=>{
  dispatch({
    type: BEFORE_TOGGLE_LIKE,
  });
}

export const toggleLikeDislike = (body) => dispatch => {
 
    let data=JSON.stringify(body)
       const url = `${ENV.url}nftLikes/likeDislike`;
    
    axios.post(url,body)
      .then(function (response) {
       
        dispatch({
          type: TOGGLE_LIKE_RES,
          payload: true,
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
   };