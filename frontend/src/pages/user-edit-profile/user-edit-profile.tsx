import React, { useEffect, useState, useContext } from 'react';
import './user-edit-profile.scss';
/////////
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ENV } from '../../config/config';
import { Images } from '../../assets/assets';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/profileBg.png';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { useEditData } from '../../hooks/Common';
import { useGetUserDataById } from '../../hooks/UserProfile';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import { compressImage } from '../../utils/functions';

const EditProfile = (props: any) => {
	const [loader, setLoader] = useState<boolean>(false);
	const [errors, setErrors] = useState<string>('');
	const [image, setImage] = useState<any>('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [banner, setBannerImage] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [twitterLink, setTwitterLink] = useState<string>('');
	const [instaLink, setInstaLink] = useState<string>('');
	const [webLink, setWebLink] = useState<string>('');
	const [_id, setUserId] = useState<string>('');
	const { setError } = useContext(errorHandler);

	const history = useHistory();
	useEffect(() => {
		refetch();
	}, []);

	const onSuccessUser = (data: any) => {
		if (data.data.success) {
			const {
				address,
				email,
				bio,
				twitterLink,
				username,
				profileImage,
				bannerImage,
				instaLink,
				webLink,
			} = data.data.data;
			setLoader(false);
			setAddress(address ? address : '');
			setEmail(email ? email : '');
			setUserId(_id ? _id : '');
			setDescription(bio ? bio : '');
			setTwitterLink(twitterLink ? twitterLink : '');
			setUsername(username ? username : '');
			setImageUrl(profileImage ? profileImage : '');
			setImage(profileImage ? profileImage : '');
			setBannerImage(bannerImage ? bannerImage : '');
			setInstaLink(instaLink ? instaLink : '');
			setWebLink(webLink ? webLink : '');
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingUser, refetch } = useGetUserDataById(
		ENV.getUserKeys('_id')._id,
		onSuccessUser
	);
	const onSuccessUpdate = () => {
		toast.success('Profile updated successfully');
		history.push('/userprofile');
	};
	const { mutate, isLoading: isUpdatingData } = useEditData(
		'users/updateProfile',
		onSuccessUpdate
	);

	const onFileChange = (e: any) => {
		let file = e.target.files[0];
		let fileURL = '';
		if (file) {
			if (file.type.includes('image')) {
				fileURL = URL.createObjectURL(file);
			} else {
				file = {};
				fileURL = '';
				return toast.error('Invalid File');
			}
			setImageUrl(fileURL);
			setImage(file);
		}
	};

	const submit = async (e: any) => {
		e.preventDefault();
		setErrors('');
		setLoader(true);
		const formData = new FormData();
		let file = null;
		formData.append('userId', ENV.getUserKeys('_id')._id);
		if (image?.name) {
			file = await compressImage(image);
		} else {
			file = image;
		}

		formData.append('profileImage', file);
		// }
		if (banner) {
			formData.append('bannerImage', banner);
		}
		formData.append('bio', description);
		formData.append('twitterLink', twitterLink);
		formData.append('username', username);
		formData.append('email', email);
		formData.append('webLink', webLink);
		formData.append('instaLink', instaLink);

		mutate(formData);
	};
	const bannerData = {
		subHeading: 'Information',
		heading: 'User Profile',
	};

	return (
		<>
			<section className="user-profile padding-wrapper pt-0">
				<Banner
					subHeading={bannerData.subHeading}
					heading={bannerData.heading}
					bgImg={BannerBg}
					bg={true}
				/>
				{(isLoadingUser || loader || isUpdatingData) && <FullPageLoader />}
				<div className="collection-detail-content">
					<div className="container">
						<form onSubmit={submit}>
							<div className="row">
								<div className="col-12 mt-5">
									<div className="logo-wrapper">
										<div className="logo-image">
											{image && image ? (
												<img
													className="uploaded-logo-img"
													src={imageUrl ? imageUrl : Images.logoImage}
												/>
											) : (
												<label>
													<input
														id="logo"
														type="file"
														accept=".png,.jpeg,.jpg"
														onChange={(e) => onFileChange(e)}
														style={{ display: 'none' }}
														name="logo"
													/>
													<span className="logo-img-round">
														<img
															className="upload-icon"
															src={imageUrl ? imageUrl : Images.logoImage}
														/>
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
													onChange={(e) => onFileChange(e)}
													style={{ display: 'none' }}
													name="logo"
												/>
												<img src={Images.editIconSmall} />
											</label>
										</div>
										<p className="feature-img-title mt-3 mx-2">Profile Image</p>
									</div>
								</div>
								<div className="col-lg-4 col-md-6 col-sm-12">
									<label className="create-collection-label">Username</label>
									<input
										className="create-collection-input mt-2"
										id="name"
										type="text"
										name="name"
										onChange={(e) => {
											if (e.target.value.trim() === '' && username === '') {
												return false;
											} else {
												setUsername(e.target.value);
											}
										}}
										value={username}
										placeholder="Username"
										maxLength={15}
										minLength={3}
										autoComplete="off"
									/>
								</div>

								<div className="col-lg-4 col-md-6 mt-3 mt-md-0">
									<label className="create-collection-label">
										Email Address
									</label>

									<input
										className="create-collection-input mt-2"
										id="url"
										type="text"
										name="url"
										placeholder="Email Address"
										onChange={(e) => {
											if (e.target.value.trim() === '' && email === '') {
												return '';
											} else {
												setEmail(e.target.value);
											}
										}}
										value={email}
										maxLength={55}
										autoComplete="off"
									/>
								</div>

								<div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
									<label className="create-collection-label">
										Wallet Address:
									</label>

									<input
										className="create-collection-input mt-2"
										id="url"
										type="text"
										name="url"
										placeholder={address}
										required
										readOnly={true}
										autoComplete="off"
										// value={address}
										disabled={true}
									/>
								</div>

								<div className="col-12 mt-3 mt-lg-5">
									<label className="create-collection-label">BioData:</label>

									<textarea
										className="create-collection-area mt-2"
										name="description"
										placeholder="Enter BioData"
										maxLength={500}
										minLength={3}
										onChange={(e) => {
											if (e.target.value.trim() === '' && description === '') {
												return false;
											} else {
												setDescription(e.target.value);
											}
										}}
										value={description}
									></textarea>
								</div>

								<div className="col-lg-4 col-md-6 col-sm-12 mt-3 mt-lg-5">
									<label className="create-collection-label">
										Twitter Link:
									</label>
									<input
										className="create-collection-input mt-2"
										id="name"
										type="text"
										name="name"
										onChange={(e) => {
											if (e.target.value.trim() === '' && twitterLink === '') {
												return false;
											} else {
												setTwitterLink(e.target.value);
											}
										}}
										value={twitterLink}
										placeholder="Twitter Link"
										maxLength={55}
										autoComplete="off"
									/>
								</div>

								<div className="col-lg-4 col-md-6 mt-3 mt-md-0 mt-3 mt-lg-5">
									<label className="create-collection-label">
										Instagram Link:
									</label>

									<input
										className="create-collection-input mt-2"
										id="url"
										type="text"
										name="url"
										placeholder="Instagram Link"
										onChange={(e) => {
											if (e.target.value.trim() === '' && instaLink === '') {
												return false;
											} else {
												setInstaLink(e.target.value);
											}
										}}
										value={instaLink}
										maxLength={55}
										autoComplete="off"
									/>
								</div>

								<div className="col-lg-4 col-md-6 mt-3 mt-lg-0 mt-3 mt-lg-5 ">
									<label className="create-collection-label">
										Website Link:
									</label>
									<input
										className="create-collection-input mt-2"
										id="url"
										type="text"
										name="url"
										placeholder="Website Link"
										onChange={(e) => {
											if (e.target.value.trim() === '' && webLink === '') {
												return false;
											} else {
												setWebLink(e.target.value);
											}
										}}
										value={webLink}
										maxLength={55}
										autoComplete="off"
									/>
								</div>
								<div className="create-collection-btn-container">
									<button
										className="btn create-collection-btn btn-linear-gradient mt-5"
										type="submit"
									>
										Save Changes
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
			<OwnCollectionToday />
		</>
	);
};

const mapStateToProps = (state: any) => (console.log(state), {});

export default connect(mapStateToProps, {})(EditProfile);
