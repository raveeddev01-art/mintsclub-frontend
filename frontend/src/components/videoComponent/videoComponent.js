

const VideoComponent=({videoUrl})=>{
 
    return(
        <>
        {videoUrl && 
            <video className="mt-4" width="210"src={videoUrl} controls >
     
    
          </video>
              }
        </>
)}

export default VideoComponent






