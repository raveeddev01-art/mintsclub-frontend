
import { ENV } from '../../config/config';
import { GET_SYSTEM_FEE } from '../types';
import axios from 'axios';

// method to get system fee
export const setSystemFee = () => async (dispatch) => {
    try {
        console.log()
        const authToken = (await localStorage.getItem("authToken")) || "";
        let res = await axios({
          method: "get",
          url: `${ENV.url}systemSetting/getAllSystemSetting`,
          headers: {
            "x-auth-token": authToken,
          },
        });
        dispatch({
            type: GET_SYSTEM_FEE,
            payload: res.data,
        });
      } catch (error) {
        console.log("🚀 ~ file: systemfee.action.js:22 ~ setSystemFee ~ error", error)
        return false
      }
	
};
