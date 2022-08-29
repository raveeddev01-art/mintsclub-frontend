
import  { useMutation} from "react-query";
import { handleRequest } from "../utils/functions";

export const useInsertData=(url:any,onSuccess:any,)=>{
    return useMutation((paylaod:any)=>handleRequest("post",url,paylaod))
  }


  export const useEditData=(url:any,onSuccess?:any,onError?:any)=>{
      return useMutation((paylaod:any)=>handleRequest("put",url,paylaod),{onSuccess,onError})

  }