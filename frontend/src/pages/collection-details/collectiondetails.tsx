/* eslint-disable no-empty-pattern */
import React, { useState, useEffect, useContext, FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './collectiondetails.scss';
import TickIcon from '../../assets/images/seller-tick-icon.svg';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import { validateNetwork } from '../../utils/web3';
import Listing from '../../Components/Listing/Listing';
import { toast } from 'react-toastify';
import Banner from '../../Components/Banner/Banner';
import BannerDark from '../../assets/images/bannerbg.png';
import BannerLight from '../../assets/images/bannerbg2.png';
import darkModeContext from '../../context/darkmode/DarkModeContext';
import { Images, blockchainIcons } from '../../assets/assets';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { CollectionDetailInt } from '../../interfaces/CollectionDetail/interface';
import { useGetMyLikedNFTs, useGetNFTs } from '../../hooks/CollectionDetails';
import { useInsertData, useDeleteData, useGetData } from '../../hooks/Common';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import { CHAIN_LOGOS, CHAIN_TITLE } from '../../utils/helpers/helpers';
import { CHAINS_INTERFACE } from '../../interfaces/components';

const CollectionDetailsPage: FC<CollectionDetailInt> = (props) => {
	const [nfts, setNfts] = useState<any>(null);
	const [filterationLoader, setFilterationLoader] = useState<boolean>(true);
	const [likedNfts, setLikedNfts] = useState<Array<any> | null>(null);
	const [likeButtonDisable, setLikeBtnDisable] = useState<boolean | null>(null);
	const [nftPagination, setNFTPagination] = useState<any>(null);
	const [disabled, setDisabled] = useState(false);
	const { darkMode } = useContext(darkModeContext);
	const location: any = useLocation();
	const [filter, setFilter] = useState<any>({
		collectionId: location.state.id,
	});
	const [items, setItem] = useState<any>('0');
	const { setError } = useContext(errorHandler);
	const history = useHistory();

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	////Get My liked NFTs
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
		nfts?.length > 0 ? true : false
	);

	//Get NFTs
	const onSuccessNFTs = (data: any) => {
		if (data.data.success) {
			setFilterationLoader(false);
			setNFTPagination(data.data.data.pagination);
			setItem(data.data.data.pagination.total);
			setNfts(data.data.data.nfts);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingNFTs } = useGetNFTs(filter, onSuccessNFTs);

	const onSuccessLikeDislike = () => {
		setLikeBtnDisable(false);
	};

	//Like/Dislike
	const { mutate } = useInsertData(
		'nftLikes/likeDislike',
		onSuccessLikeDislike
	);

	const fetchData = (filterObj: object) => {
		setFilter(filterObj);
	};
	const { mutate: deleteCollection } = useDeleteData(
		`collection/delete/${props.match.params.id}`,
		(res: any) => {
			if (res.data.success) {
				toast.success('Collection Deleted successfully');
				history.push('/my-collection');
			}
		}
	);
	const handleDeleteCollection = () => {
		if (isOwner()) {
			if (isOwnerLoggedIn()) {
				toast.info('Please sign in to delete NFT');
				return history.push('/connect-wallet');
			} else {
				deleteCollection(null);
			}
		}
	};
	const isOwner = () => {
		return (
			props?.connectedAddress?.toUpperCase() ===
				location?.state?.ownerAddress?.toUpperCase() &&
			blockchainType === ENV.getUserKeys('blockchainType').blockchainType
		);
	};
	const isOwnerLoggedIn = () => {
		const userId = ENV.getUserKeys('_id')._id;
		return !userId || userId !== location.state.userId;
	};
	const {
		name,
		logo,
		description,
		username,
		blockchainType,
		avgSalePrice,
		floorPriceForFixedAuction,
		floorPriceForTimedAuction,
		totalVolume,
		nftDetail,
	}: any = location.state;

	const bannerData = {
		subHeading: 'Explore',
		heading: name,
	};
	const volume = location.state.totalVolume;
	const floorTimedAuction = location.state.floorPriceForTimedAuction;
	const floorFixedAuction = location.state.floorPriceForFixedAuction;
	const floorPrice = Math.min(floorTimedAuction, floorFixedAuction);
	const avgSale = location.state.avgSalePrice;
	const item = location.state.nftDetail.length;
	console.log(location.state, 'location.state=========');

	return (
		<>
			<section className="user-profile pt-0 collection">
				<Banner
					subHeading={bannerData.subHeading}
					heading={bannerData.heading}
					// content={description && description}
					bgImg={darkMode ? BannerDark : BannerLight}
					createdby={username?.[0] && username?.[0]}
					bg={false}
					btns={isOwner()}
					onDelete={() => handleDeleteCollection()}
					onEdit={() => {
						if (isOwnerLoggedIn()) {
							toast.info('Please sign in to edit NFT');
							return history.push('/connect-wallet');
						}
						history.push(`/collection/edit/${props.match.params.id}`);
					}}
				/>
				<div className="container">
					<div className="collection-detail-cards">
						<div className="info-card">
							<h3>{floorPrice ? floorPrice : 0}</h3>
							<p>Floor Price</p>
						</div>
						<div className="info-card">
							<h3>{items ? items : 0}</h3>
							<p>Items</p>
						</div>
						<div className="info-card">
							<h3>{volume ? volume : 0}</h3>
							<p>Total Volume</p>
						</div>
						<div className="info-card">
							<h3>{avgSale ? avgSale : 0}</h3>
							<p>Avg Sale Price</p>
						</div>
						<div className="info-card">
							<img
								src={
									CHAIN_LOGOS[
										blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
									]
								}
							/>
							<p>
								{
									CHAIN_TITLE[
										blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
									]
								}
							</p>
						</div>
					</div>
				</div>
				<div className="collection-detail-content d-none">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="d-flex flex-column flex-md-row align-items-center align-items-sm-start">
									<div className="ms-lg-5 collection-owner-avatar user-avatar-container me-3 flex-fill">
										<img
											src={logo ? logo : Images.profilePlaceholder}
											alt="owner-avatar"
										/>
									</div>
									<div className="collection-owner-detail text-center text-sm-start mt-2 mt-sm-4">
										<div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
											<div className="collection-owner-name">
												<h3>
													{name}{' '}
													<span>
														<img
															src={TickIcon}
															alt="tick-icon"
															className="ms-2"
														/>
													</span>
												</h3>
											</div>
											{username?.[0] && (
												<div>
													<p>
														Created By: <span>{username?.[0]}</span>
													</p>
												</div>
											)}
										</div>
										<div className="collection-owner-description mt-3">
											<p>{description && description} </p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-12 col-sm-7 col-md-6 col-lg-5"></div>
						</div>
					</div>
				</div>
				<Listing
					disabled={disabled}
					totalItems={nfts && nfts.length}
					filterationLoader={filterationLoader}
					setFilterationLoader={setFilterationLoader}
					nfts={nfts}
					loader={isLoadingNFTs}
					likedNfts={likedNfts}
					nftPagination={nftPagination}
					fetchData={fetchData}
					path="/explore/nftdetail/"
					collectionDetail
				/>
			</section>
			<OwnCollectionToday />
		</>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(CollectionDetailsPage);
