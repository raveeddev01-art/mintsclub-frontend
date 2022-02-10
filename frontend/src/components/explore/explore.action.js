
import { ENV } from './../../config/config';

export const toggleLikeDislike = (body) => dispatch => {
    console.log(body,"body generated")
    let data=JSON.stringify(body)
       const url = `${ENV.url}nftLikes/likeDislike`;
       console.log(body,"body")
       fetch(url, {
           method: 'POST',
           headers: {
               'content-type': 'application/json',
               'Authorization': ENV.Authorization,
               'x-auth-token': ENV.x_auth_token,
               'Access-Control-Allow-Origin': '*',
              
           },
           data
       }).then(res => res.json()).then(data => {
       console.log(data,"likes success data")
          
       }).catch(error => {
        console.log(error,"error likes")
       })
   };