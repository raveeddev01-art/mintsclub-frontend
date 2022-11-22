import React from 'react';
import SellNFTLoader from '../../../Components/ContentLoader/SellNFTLoader';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import Audio from '../../../Components/Audio/Audio';

const ImageView = ({ info }: any) => {
	const {
		fileType,
		contentLoader,
		image,
		setContentLoader,
		videoElement,
		togglePlay,
		playerState,
	} = info;
	return (
		<div className=" col-lg-6 col-xl-5">
			{fileType === 'image' ? (
				<div className="nft-img-container mx-auto mx-lg-0">
					<div
						style={{
							display: `${contentLoader ? 'block' : 'none'}`,
						}}
					>
						<SellNFTLoader />
					</div>
					<img
						src={image}
						alt="nft-image"
						onLoad={() => setContentLoader(false)}
						style={{
							display: `${!contentLoader ? 'block' : 'none'}`,
						}}
					/>
				</div>
			) : fileType === 'video' ? (
				<div className="card-img-top">
					<div className="nft-video-container mx-auto mx-lg-0">
						<div
							style={{
								display: `${contentLoader ? 'block' : 'none'}`,
							}}
						>
							<SellNFTLoader />
						</div>
						<video
							src={image}
							ref={videoElement}
							// onTimeUpdate={handleOnTimeUpdate}
							onEnded={() => {
								togglePlay();
							}}
							onCanPlay={() => {
								setContentLoader(false);
							}}
							style={{
								display: `${!contentLoader ? 'block' : 'none'}`,
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
				</div>
			) : fileType === 'audio' ? (
				<>
					<div
						style={{
							display: `${contentLoader ? 'block' : 'none'}`,
						}}
					>
						<SellNFTLoader />
					</div>
					<Audio
						src={image}
						onLoadCallback={async () => setContentLoader(false)}
						loader={contentLoader}
						fileType={''}
					/>
				</>
			) : (
				' '
			)}
		</div>
	);
};
export default ImageView;
