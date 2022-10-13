import Audio from "../../../Components/Audio/Audio";
import NFTDetailLoader from "../../../Components/ContentLoader/NftDetailLoader";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
const FileView=({data}:any)=>{
    const {nftDetail,blockchainIcons,fileType,contentLoader,image,setContentLoader,videoElement,togglePlay,playerState}=data
    return (
        <div className="col-xl-6 position-relative">
        {nftDetail?.lazyMinted && (
          <div className="minting-title">
            <div className="imgdiv">
              <img src={blockchainIcons.mintingIcon} alt="/" />
            </div>
            <p>Lazy Minted</p>
          </div>
        )}
        {fileType === "image" ? (
          <div className="nft-img-container mx-auto mx-lg-0">
            <div
              style={{
                display: `${contentLoader ? "block" : "none"}`,
              }}
            >
              <NFTDetailLoader />
            </div>
            <img
              src={image}
              alt="nft-image"
              onLoad={() => setContentLoader(false)}
              style={{
                display: `${!contentLoader ? "block" : "none"}`,
              }}
            />
          </div>
        ) : fileType === "video" ? (
          <div className="nft-img-container nft-video-container mx-auto mx-lg-0">
            <div
              style={{
                display: `${contentLoader ? "block" : "none"}`,
              }}
            >
              <NFTDetailLoader />
            </div>
            <video
              src={image}
              ref={videoElement}
              onEnded={() => {
                togglePlay();
              }}
              onCanPlay={() => {
                setContentLoader(false);
              }}
              // onTimeUpdate={handleOnTimeUpdate}
              style={{
                display: `${!contentLoader ? "block" : "none"}`,
              }}
            />
            <div className="controls">
              <div className="actions">
                <button
                  className="play-pause-btn d-flex align-items-center justify-content-center"
                  onClick={togglePlay}
                >
                  {playerState.isPlaying ? (
                    <BsFillPauseFill />
                  ) : (
                    <BsFillPlayFill />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : fileType === "audio" ? (
          <>
            <div
              style={{
                display: `${contentLoader ? "block" : "none"}`,
              }}
            >
              <NFTDetailLoader />
            </div>
            <Audio
              src={image}
              onLoadCallback={async () => setContentLoader(false)}
              loader={contentLoader}
              fileType={""}
            />
          </>
        ) : (
          ""
        )}
      </div>

    )
}
export default FileView