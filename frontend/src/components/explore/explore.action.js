
import { ENV } from './../../config/config';
import axios from 'axios'

export const toggleLikeDislike = (body) => dispatch => {
 
    let data=JSON.stringify(body)
       const url = `${ENV.url}nftLikes/likeDislike`;
    
    axios.post(url,body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
   };