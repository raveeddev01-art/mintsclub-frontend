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
import { getSpecialCharacterReplaced } from '../../../utils/helpers/helpers';

const AllNFT: FC<ALLNFTINT> = (props) => {
	const [nftPagination, setNFTPagination] = useState<any>(null);
	const [nfts, setNFTs] = useState<any>([]); // NFTs for explore section
	const [collections, setCollections] = useState<Array<object>>([]);
	const [filterationLoader, setFilterationLoader] = useState(true);
	const [likedNfts, setLikedNfts] = useState<any>(null);
	const [likeButtonDisable, setLikeBtnDisable] = useState<boolean | null>(null);
	const [disabled, setDisabled] = useState(false);
	const [filter, setFilter] = useState<any>({ limit: 9, page: 1 });
	const { setError } = useContext(errorHandler);
	const history = useHistory();

	useEffect(() => {
		window.history.scrollRestoration = 'manual';
	}, []);

	useEffect(() => {
		if (props?.location?.state) {
			const searchQs: object | string = {
				keyword: getSpecialCharacterReplaced(props?.location?.state),
				page: 1,
				limit: 9,
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
			if (data.data.data.pagination?.page === 1) {
				setNFTs(data.data.data.nfts);
				return;
			}
			setNFTs([...nfts, ...data.data.data.nfts]);
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
					setNfts={setNFTs}
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
