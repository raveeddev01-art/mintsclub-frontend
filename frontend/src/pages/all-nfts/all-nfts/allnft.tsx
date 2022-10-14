/* eslint-disable no-empty-pattern */
import React, { useState, useEffect, useContext, FC } from 'react';
import { connect } from 'react-redux';
import './allnft.scss';
import { ENV } from '../../../config/config';
import { validateNetwork } from '../../../utils/web3';
import { toast } from 'react-toastify';
import Listing from '../../../Components/Listing/Listing';
import Banner from '../../../Components/Banner/Banner';
import BannerBg from '../../../assets/images/hero-bg.png';
import BannerImage from '../../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../../Components/OwnCollectionToday/OwnCollectionToday';
import { useHistory } from 'react-router-dom';
import { AllNFTsbBanner } from '../../../utils/exportData';
import { ALLNFTINT } from '../../../interfaces/allnfts/interface';
import {
	useGetMyLikedNFTs,
	useGetNFTs,
} from '../../../hooks/CollectionDetails';
import { useInsertData } from '../../../hooks/Common';
import { useGetCollections } from '../../../hooks/AllNFTs';
import errorHandler from '../../../context/errorHandler/ErrorHandlerContext';

const AllNFT: FC<ALLNFTINT> = (props) => {
	const [nftPagination, setNFTPagination] = useState<any>(null);
	const [nfts, setNFTs] = useState<any>([]); // NFTs for explore section
	const [collections, setCollections] = useState<Array<object>>([]);
	const [filterationLoader, setFilterationLoader] = useState(true);
	const [likedNfts, setLikedNfts] = useState<any>(null);
	const [likeButtonDisable, setLikeBtnDisable] = useState<boolean | null>(null);
	const [disabled, setDisabled] = useState(false);
	const [filter, setFilter] = useState<any>({ limit: 10, page: 1 });
	const { setError } = useContext(errorHandler);
	const history = useHistory();

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	useEffect(() => {
		if (props?.location?.state) {
			const searchQs: object | string = {
				keyword: props.location.state,
				page: 1,
				limit: 10,
			};
			setFilter(searchQs);
			setFilterationLoader(true);
			window.history.replaceState(null, '');
		}
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
		onSuccessLikedNFTs
	);

	//Get NFTs

	const onSuccessNFTs = (data: any) => {
		if (data?.data?.success) {
			setFilterationLoader(false);
			setNFTPagination(data.data.data.pagination);
			setNFTs(data.data.data.nfts);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingNFTs, refetch: refetchNFTs } = useGetNFTs(
		filter,
		onSuccessNFTs
	);

	const onSuccessLikeDislike = () => {
		setLikeBtnDisable(false);
	};

	//Like/Dislike
	const { mutate } = useInsertData(
		'nftLikes/likeDislike',
		onSuccessLikeDislike
	);
	const fetchData = (filterObj: object | null) => {
		setFilter(filterObj);
		refetchNFTs();
		// getNFTs(filterObj);
	};

	//Get Collections
	const onSuccessCollections = (data: any) => {
		if (data.data.success) {
			setCollections(data.data.data.collections);
		} else {
			setError(data.data.message);
		}
	};
	const { isLoading } = useGetCollections(
		onSuccessCollections,
		nfts ? true : false
	);

	const handleLikesTogleApi = async (
		nftId: string,
		status: string,
		likesCount: number
	) => {
		if (
			ENV.getUserKeys('address')?.address?.toUpperCase() ===
			props.connectedAddress?.toUpperCase()
		) {
			if (await validateNetwork()) {
				if (!likeButtonDisable || likeButtonDisable === null) {
					setLikeBtnDisable(true);
					const userId = ENV.getUserKeys('_id')._id;

					const body = {
						userId,
						nftId,
						count: 1,
					};

					if (status === 'dislike' && likesCount > 0) {
						const result = likedNfts.filter(
							(item: any) => item.nftId !== nftId
						);

						setLikedNfts(result);
						increOrDecreLikes(nftId, 'dec');

						mutate(body);
					}

					if (status === 'like') {
						let myLikedNfts: any = [];
						if (likedNfts && likedNfts.length > 0) {
							myLikedNfts = likedNfts;
						}

						const obj = {
							_id: '1234455',
							nftId,
						};

						myLikedNfts.push(obj);

						setLikedNfts(myLikedNfts);
						increOrDecreLikes(nftId, 'inc');
						mutate(body);
					}
					// setNFTs(nfts);
				}
			} else {
				toast.error(
					'Please Connect Your Metamask With Ethereum Rinkby Network'
				);
			}
		} else {
			if (ENV.getUserKeys('address')?.address) {
				toast.info('Please login with new connected account');
			} else {
				toast.info('Please login first to continue');
			}
			history.push({
				pathname: `/connect-wallet`,
				state: `/explore/allNFT`,
			});
		}
	};
	const increOrDecreLikes = (id: string, status: string) => {
		if (status === 'dec') {
			const newResult = nfts.map((item: any) => {
				if (item._id !== id) {
					return item;
				} else {
					if (item?.likeCount > 0) {
						return { ...item, likeCount: item.likeCount - 1 };
					}
				}
			});
			setNFTs(newResult);
		} else {
			const final = nfts.map((item: any) => {
				if (item._id !== id) {
					return item;
				} else {
					return { ...item, likeCount: item.likeCount + 1 };
				}
			});
			setNFTs(final);
		}
	};
	return (
		<>
			<section className="explore-collection-section padding-wrapper pt-0">
				<Banner
					subHeading={AllNFTsbBanner.subHeading}
					heading={AllNFTsbBanner.heading}
					content={AllNFTsbBanner.content}
					bgImg={BannerBg}
					bannerImg={BannerImage}
				/>
				<Listing
					collections={collections}
					disabled={disabled}
					totalItems={nfts && nfts.length}
					filterationLoader={filterationLoader}
					setFilterationLoader={setFilterationLoader}
					refetchNFTs={refetchNFTs}
					nfts={nfts}
					loader={isLoadingNFTs}
					likedNfts={likedNfts}
					nftPagination={nftPagination}
					handleLikesTogleApi={handleLikesTogleApi}
					fetchData={fetchData}
					initialKeyword={props?.location?.state}
					path="/explore/nftdetail/"
				/>
			</section>
			<OwnCollectionToday />
		</>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(AllNFT);
