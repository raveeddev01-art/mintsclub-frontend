import {useEffect,useRef} from'react'

const VideoComponent=({videoUrl})=>{
    const refElement=useRef(null)
    useEffect(()=>{
       if(refElement.current){
          //  debugger
       }
    },[videoUrl])
    return(
        <>
        {videoUrl && 
            <video className="mt-4" width="210" ref={refElement} controls >
            <source   src={videoUrl}  />
    
          </video>
              }
        </>
)}

export default VideoComponent






