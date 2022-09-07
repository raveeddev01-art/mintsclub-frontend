
import  { useMutation,useQuery} from "react-query";
import { handleRequest } from "../utils/functions";

export const useInsertData=(url:any,onSuccess:any,onError?:any)=>{
    // console.log("inserting data")
    return useMutation((paylaod:any)=>handleRequest("post",url,paylaod?paylaod:null),{onSuccess,onError})
  }

  export const useEditData=(url:any,onSuccess?:any,onError?:any)=>{
      return useMutation((paylaod:any)=>handleRequest("put",url,paylaod),{onSuccess,onError})

  }


  export const useGetData=(key:any,url:any,qs:any,onSuccess:any,onError:any)=>{
    //   console.log(qs,"qs")
     return useQuery([key],()=>handleRequest("get",url),{onSuccess,onError,refetchOnWindowFocus:false,refetchOnMount:false})
  }
