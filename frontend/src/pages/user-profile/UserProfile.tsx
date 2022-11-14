/* eslint-disable no-empty-pattern */
import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import './UserProfile.scss';
import { ENV } from '../../config/config';
import { getNFTs } from '../../Components/Nfts/nfts.action';

import darkModeContext from '../../context/darkmode/DarkModeContext';
import { Images } from '../../assets/assets';
import { validateNetwork } from '../../utils/web3';
import { toast } from 'react-toastify';
import moment from 'moment';
import Banner from '../../Components/Banner/Banner';
import BannerDark from '../../assets/images/bannerbg.png';
import BannerLight from '../../assets/images/bannerbg2.png';
import EthIcon from '../../assets/images/eth-icon.svg';
import CopyIcon from '../../assets/images/copy-icon.svg';
import Listing from '../../Components/Listing/Listing';
import { Link } from 'react-router-dom';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { useHistory } from 'react-router';
import { useGetMyLikedNFTs } from '../../hooks/CollectionDetails';
import { useGetCollections, useGetNFTs } from '../../hooks/AllNFTs';
import { useGetUserDataById } from '../../hooks/UserProfile';
import { useInsertData } from '../../hooks/Common';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
const UserProfile = (props: any) => {
	const [isAddressCopied, setAddressCopied] = useState<boolean>(false);
	const [nfts, setNFTs] = useState<any>([]); // NFTs for explore section
	const [nftsCopy, setNFTsCopy] = useState<any>([]);
	const [loader, setLoader] = useState<boolean>(true);
	const [filterationLoader, setFilterationLoader] = useState<boolean>(true);
	const [user, setUser] = useState<any>(null);
	const [likedNfts, setLikedNfts] = useState<any>();
	const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
	const [initial, setInitial] = useState<boolean>(true);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copy, setCopy] = useState<boolean>(false);
	const [collections, setCollections] = useState<any>(null);
	const [nftPagination, setNFTPagination] = useState<any>(null);
	const [dataLimit, setDataLimit] = useState<number>(9);
	const [menuFilter, setMenuFilter] = useState<any>(false);
	const [accAddress, setAccountAddress] = useState<string>(
		props.connectedAddress
	);
	const { darkMode } = useContext(darkModeContext);
	const { setError } = useContext(errorHandler);
	const [filter, setFilter] = useState({ page: 1, limit: 9999999 });
	const userId = ENV.getUserKeys('_id')._id;
	const history = useHistory();
	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const onSuccessNFTs = (data: any) => {
		if (data?.data?.success) {
			setFilterationLoader(false);
			setNFTPagination(data.data.data.pagination);
			setNFTs(data.data.data.nfts);
		} else {
			setError(data.data.message);
		}
	};
	// const onSuccessNFTs = (res: any) => {
	// 	// eslint-disable-next-line no-unsafe-optional-chaining
	// 	const { nfts } = res?.data?.data;
	// 	const data: any = nfts;
	// 	if (!menuFilter) {
	// 		const Nfts = data?.filter((item: any) => item.ownerId === userId);
	// 		if (Nfts?.length > 0) {
	// 			setDisabled(false);
	// 		} else {
	// 			if (initial) {
	// 				setDisabled(true);
	// 			}
	// 		}
	// 		setNFTs(Nfts);
	// 		setNFTPagination({ total: Nfts?.length });
	// 	} else {
	// 		setNFTPagination(data.length);
	// 		handleNftFilter(menuFilter, data);
	// 	}
	// 	setInitial(false);
	// 	setNFTsCopy(data);
	// 	setLoader(false);
	// 	setFilterationLoader(false);
	// };
	const { isLoading: isLoadingNFTs, refetch } = useGetNFTs(
		filter,
		onSuccessNFTs,
		9999999
	);

	const onSuccessUser = (data: any) => {
		if (data.data.success) {
			setUser(data.data.data);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingUser } = useGetUserDataById(
		ENV.getUserKeys('_id')._id,
		onSuccessUser
	);
	const onSuccessLikedNFTs = (data: any) => {
		if (data.data.success) {
			setLikedNfts(data.data.data);
		} else {
			setError(data.data.message);
		}
	};
	const {} = useGetMyLikedNFTs(
		ENV.objectToQueryString({ userId: ENV.getUserKeys('_id')._id }),
		onSuccessLikedNFTs,
		nfts ? true : false
	);
	const onSuccessCollections = (data: any) => {
		if (data.data.success) {
			const myCollections = data?.data?.data?.collections.filter(
				(item: any) => item.userId === userId
			);
			setCollections(myCollections);
		} else {
			setError(data.data.message);
		}
	};
	const {} = useGetCollections(onSuccessCollections, nfts ? true : false);

	const onSuccessLikeDislike = () => {
		setLikeBtnDisable(false);
	};

	//Like/Dislike
	const { mutate } = useInsertData(
		'nftLikes/likeDislike',
		onSuccessLikeDislike
	);

	useEffect(() => {
		if (props.myLikedNftsStatus) {
			setLikedNfts(props.myLikedNfts);
		}
	}, [props.myLikedNftsStatus]);

	const ChangeTooltip = () =>
		setTimeout(() => {
			setAddressCopied(false);
		}, 3000);

	const fetchData = (filterObj: any) => {
		setFilter(filterObj);
		getNFTs(filterObj);
		refetch();
	};
	const getPaginatedData = () => {
		setDataLimit((prev) => prev + 9);
	};

	const bannerData = {
		subHeading: '',
		heading: 'User Profile',
	};
	const menuData = ['Collected', 'Created'];

	if (
		props.connectedAddress === '' ||
		ENV.getUserKeys('address')?.address?.toUpperCase() ===
			props.connectedAddress?.toUpperCase()
	) {
		return (
			<>
				<section className="user-profile pt-0">
					<Banner
						subHeading={bannerData.subHeading}
						heading={bannerData.heading}
						bgImg={darkMode ? BannerDark : BannerLight}
						bg={true}
						// className="mb-0"
					/>
					<div className="user-detail-content">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<div className="d-flex flex-column flex-md-row align-items-center align-items-sm-start">
										<div className="user-avatar-edit">
											<div className="ms-lg-5 user-owner-avatar user-avatar-container me-3">
												<img
													src={
														user?.profileImage
															? user.profileImage
															: Images.placeholderImg
													}
													alt="owner-avatar"
												/>
											</div>
											<Link to="/editprofile" className="user-edit-icon">
												<img src={Images.editIconSmall} />
											</Link>
										</div>
										<div className="user-owner-detail text-center text-sm-start mt-4">
											{user && (
												<div className="user-owner-name">
													<h3>{user.username ? user.username : 'unnamed'}</h3>
												</div>
											)}

											<div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
												{user?.address && (
													<div className="user-address mt-2 d-flex  align-items-center ">
														<span className={`${copy ? 'd-block' : 'd-none'}`}>
															{isAddressCopied ? 'Copied' : 'Copy'}
														</span>
														{user && (
															<>
																<img
																	src={EthIcon}
																	alt="eth-icon"
																	className="me-1"
																/>

																<p className="acc-adress d-none d-md-block">
																	{user.address}
																</p>
																<p className="acc-address d-md-none">
																	{user.address.slice(0, 10) +
																		'...' +
																		user.address.slice(-10)}
																</p>

																<img
																	onMouseLeave={() => {
																		setCopy(false);
																	}}
																	onMouseOver={() => {
																		setCopy(true);
																	}}
																	onClick={() => {
																		navigator.clipboard.writeText(user.address);
																		setAddressCopied(true);
																		ChangeTooltip();
																	}}
																	src={CopyIcon}
																	alt="copy-icon"
																	className="user-address-copy ms-4"
																/>
															</>
														)}
													</div>
												)}

												<div className="mt-2 mt-sm-0">
													{user && (
														<p className="join-date">
															Joined:{' '}
															<span>
																{moment(user.createdAt).format('MMMM DD YYYY')}
															</span>
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Listing
						collections={collections}
						disabled={disabled}
						totalItems={nfts && nfts.length}
						filterationLoader={filterationLoader}
						setFilterationLoader={setFilterationLoader}
						nfts={nfts?.slice(0, dataLimit)}
						loader={isLoadingNFTs}
						likedNfts={likedNfts}
						// handleLikesTogleApi={handleLikesTogleApi}
						// handleNftFilter={handleNftFilter}
						nftPagination={nftPagination}
						fetchData={fetchData}
						setMenuFilter={setMenuFilter}
						menuData={menuData}
						path="/explore/nftdetail/"
						getPaginatedData={getPaginatedData}
						UserProfile
					/>
				</section>
				<OwnCollectionToday />
			</>
		);
	} else {
		toast.info('Please login with new connected account');
		localStorage.clear();
		history.push({
			pathname: `/connect-wallet`,
			state: `/userprofile`,
		});
		return <React.Fragment> </React.Fragment>;
	}
};

const mapStateToProps = (state: any) => ({
	myLikedNfts: state.nft.myLikedNfts,
	myLikedNftsStatus: state.nft.myLikedNftsStatus,
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
	getNFTs,
})(UserProfile);
