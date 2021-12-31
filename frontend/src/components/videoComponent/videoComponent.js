import './videoComponent.css'

const VideoComponent=({videoUrl})=>{
 
    return(
        <>
        {videoUrl && 
            <video className="mt-2 video-view" width="400"src={videoUrl} controls >
     
    
          </video>
              }
        </>
)}

export default VideoComponent





