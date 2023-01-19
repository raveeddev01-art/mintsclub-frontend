import React from 'react';
import Audio from '../../../../Components/Audio/Audio';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

const UploadFile = ({ data }: any) => {
	const {
		onDrop,
		dragOver,
		dragEnter,
		dragLeave,
		imageURL,
		onFileChange,
		UploadWhiteIcon,
		validator,
		videoURL,
		myRef,
		nft,
		playerState,
		togglePlay,
		audioUrl,
		UploadIcon,
	} = data;
	return (
		<div className="col-12">
			<div
				className="upload-nft-container mb-4 mb-lg-5 mx-auto mx-md-0"
				onDrop={(e) => onDrop(e)}
				onDragOver={(e) => dragOver(e)}
				onDragEnter={(e) => dragEnter(e)}
				onDragLeave={(e) => dragLeave(e)}
			>
				{imageURL ? (
					<label className="w-100">
						<div className="uploaded-img-container px-sm-0 px-2 mx-auto">
							<label>
								<input
									type="file"
									style={{ display: 'none' }}
									onChange={(e) => onFileChange(e, 'onChange')}
									accept=".mp4, .png, .jpeg, .webp, .jpg, .mp3"
									name="image"
								/>
							</label>
							<img className="uploaded-img" src={imageURL} />
							<div className="upload-icon-container uploaded-img-content text-center">
								<img src={UploadWhiteIcon} alt="upload" className="mb-1 mt-4" />
								<h6 className="mb-1 text-white">Drag and drop your files</h6>
								<p className="mb-1 text-white">
									PNG, JPEG, JPG, GIF, WEBP, MP4 or MP3. Max 100mb.
								</p>
								<div className="mx-3 my-1">
									<span className="text-white">|</span>
									<h6 className="text-white">OR</h6>
									<span className="text-white">|</span>
								</div>
								<span className="btn uploaded-img-browse upload-nft-btn ">
									Browse File
								</span>
								<span className="text-danger text-center mt-3">
									{validator.message('image', nft.image, 'required')}
								</span>
							</div>
						</div>
					</label>
				) : videoURL ? (
					<>
						<div className="uploaded-img-container">
							<div className="create-nft-video-container px-sm-0 px-2 mx-auto">
								<video
									src={videoURL}
									ref={myRef}
									// onTimeUpdate={handleOnTimeUpdate}
								/>
								<div className="controls">
									<div className="actions">
										<button
											className="play-pause-btn d-flex align-items-center justify-content-center"
											onClick={() => togglePlay()}
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

							<label className="video-upload-label">
								<div className="uploaded-video-container mx-auto">
									<label>
										<input
											type="file"
											style={{ display: 'none' }}
											onChange={(e) => onFileChange(e, 'onChange')}
											accept=".mp4, .png, .jpeg, .webp, .jpg, .mp3"
											name="image"
										/>
									</label>

									<div className="upload-icon-container uploaded-video-content text-center">
										<img
											src={UploadWhiteIcon}
											alt="upload"
											className="mb-1 mt-4"
										/>
										<h6 className="mb-1 text-white">
											Drag and drop your files
										</h6>
										<p className="mb-1 text-white">
											PNG, JPEG, JPG, GIF, WEBP, MP4 or MP3. Max 100mb.
										</p>
										<div className="mx-3 my-1">
											<span className="text-white">|</span>
											<h6 className="text-white">OR</h6>
											<span className="text-white">|</span>
										</div>
										<span className="btn uploaded-img-browse upload-nft-btn ">
											Browse File
										</span>
									</div>
									<span className="text-danger text-center mt-3">
										{validator.message('image', nft.image, 'required')}
									</span>
								</div>
							</label>
						</div>
					</>
				) : audioUrl ? (
					<>
						<div className="uploaded-img-container">
							<div className="create-nft-video-container px-sm-0 px-2 mx-auto">
								{/* <Waveform url={audioUrl} auction={false} /> */}
								<Audio
									src={audioUrl}
									// eslint-disable-next-line @typescript-eslint/ban-types
									onLoadCallback={function (): {} {
										throw new Error('Function not implemented.');
									}}
									loader={false}
									fileType={''}
								/>
							</div>
							<label className="video-upload-label">
								<div className="uploaded-video-container mx-auto">
									<label>
										<input
											type="file"
											style={{ display: 'none' }}
											onChange={(e) => onFileChange(e, 'onChange')}
											accept=".mp4, .png, .jpeg, .webp, .jpg, .mp3"
											name="image"
										/>
									</label>

									<div className="upload-icon-container uploaded-video-content text-center">
										<img
											src={UploadWhiteIcon}
											alt="upload"
											className="mb-1 mt-4"
										/>
										<h6 className="mb-1 text-white">
											Drag and drop your files
										</h6>
										<p className="mb-1 text-white">
											PNG, JPEG, JPG, GIF, WEBP, MP4 or MP3. Max 100mb.
										</p>
										<div className="mx-3 my-1">
											<span className="text-white">|</span>
											<h6 className="text-white">OR</h6>
											<span className="text-white">|</span>
										</div>
										<span className="btn uploaded-img-browse upload-nft-btn ">
											Browse File
										</span>
									</div>
									<span className="text-danger text-center mt-3">
										{validator.message('image', nft.image, 'required')}
									</span>
								</div>
							</label>
						</div>
					</>
				) : (
					<label className="w-100">
						<div className="upload-icon-container text-center ">
							<img src={UploadIcon} alt="upload" className="mb-2" />
							<h6 className="mb-2">Drag and drop your files</h6>
							<p className="mb-2">
								PNG, JPEG, JPG, GIF, WEBP, MP4 or MP3. Max 100mb.
							</p>
							<div className="">
								<span>|</span>
								<h6>OR</h6>
								<span>|</span>
							</div>

							<input
								type="file"
								style={{ display: 'none' }}
								onChange={(e) => onFileChange(e, 'onChange')}
								accept=".mp4, .png, .jpeg, .webp, .jpg, .mp3"
								name="image"
							/>
							<span className="btn btn-linear-gradient upload-nft-btn text-white mt-3">
								Browse File
							</span>
							<div className="text-danger text-center mb-3 mt-2">
								{validator.message('image', nft.image, 'required')}
							</div>
						</div>
					</label>
				)}
			</div>
		</div>
	);
};
export default UploadFile;
