import React from 'react';
import { toast } from 'react-toastify';

const UploadFiles = ({ data }: any) => {
	const { collection, onFileChange, Images } = data;
	const fileChange = (e: any) => {
		if (e.target.files.length < 1) {
			return;
		}
		const file = e.target.files[0];
		const validExtensions = ['png', 'jpeg', 'jpg'];
		const fileExtension = file.type.split('/')[1];
		if (validExtensions.includes(fileExtension)) {
			onFileChange(e);
		} else {
			toast.info('This file is not Supported ');
		}
	};
	console.log(data, 'data');
	return (
		<div className="upload-container flex-md-row flex-column align-items-center align-items-md-end ps-md-5 ps-0">
			<div className="logo-wrapper">
				<div className="logo-image">
					{collection?.logoUrl && collection?.logoUrl != ' ' ? (
						<img className="uploaded-logo-img" src={collection?.logoUrl} />
					) : (
						<label>
							<input
								id="logo"
								type="file"
								accept=".png,.jpeg,.jpg"
								onChange={fileChange}
								style={{ display: 'none' }}
								name="logo"
							/>
							<span className="logo-img-round">
								<img className="upload-icon" src={Images.logoImage} />
							</span>
						</label>
					)}
				</div>

				<div className="upload-feature-icon-logo">
					<label>
						<input
							id="logo"
							type="file"
							accept=".png,.jpeg,.jpg"
							onChange={(e) => fileChange(e)}
							style={{ display: 'none' }}
							name="logo"
						/>
						<img src={Images.editIconSmall} />
					</label>
				</div>
				<p className="feature-img-title mt-3 mx-2">Logo Image*</p>
			</div>
			<div className="feature-wrapper pt-md-0 pt-5">
				<div className="feature-image">
					<span className="feature-img-round">
						{collection && collection.featuredImgUrl ? (
							<img
								className="uploaded-feature-img"
								src={collection.featuredImgUrl}
							/>
						) : (
							<label className="upload-icon">
								<input
									id="featuredImg"
									type="file"
									accept=".png,.jpeg,.jpg"
									style={{ display: 'none' }}
									name="featuredImg"
									onChange={fileChange}
								/>
								<img src={Images.featureImageInputBG} />
								<div className="feature-img-round-info">
									<p className="text-center mb-2 browse-file">Browse Files</p>
									{/* <p className="mb-0">PNG, GIF, WEBP, MP4, MP3 </p> */}
									<p className="text-center mb-0">Max 100mb</p>
								</div>
							</label>
						)}
					</span>
				</div>
				<div className="upload-feature-icon">
					<label>
						<input
							id="featuredImg"
							type="file"
							accept=".png,.jpeg,.jpg"
							style={{ display: 'none' }}
							name="featuredImg"
							onChange={fileChange}
						/>
						<img src={Images.editIconLarge} />
					</label>
				</div>
				<p className="feature-img-title mt-3 mx-2 text-center text-md-start">
					Feature Image*
				</p>
			</div>
		</div>
	);
};
export default UploadFiles;
