import React, { useState, useEffect, useContext, FC } from 'react';
import './my-collections.scss';
import CollectionsCard from '../../Components/CollectionsCards/CollectionsCard';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';

import { Images } from '../../assets/assets';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import { myCollectionBanner } from '../../utils/exportData';
import { ExploreCollectionInt } from '../../interfaces/ExploreCollections/interface';
import { useGetMyCollections } from '../../hooks/AllNFTs';
import { useGetCategories } from '../../hooks/PopularCollections';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
const MyCollections: FC<ExploreCollectionInt> = (props) => {
	const [collections, setCollections] = useState<any[] | null>(null);
	const [categories, setCategories] = useState<any[] | null>(null);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const [empty, setEmpty] = useState(false);
	const [pagination, setPagination] = useState<any>(null);
	const { setError } = useContext(errorHandler);
	const userId = ENV.getUserKeys('_id')._id;

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const onSuccessCollections = (data: any) => {
		if (data.data.success) {
			const { collections, pagination } = data.data.data;
			if (collections.length > 0) {
				setEmpty(false);
			}
			setCollections(collections.Collections);
			setPagination(pagination);
		} else {
			setError(data.data.message);
		}
	};
	const { isFetching: isFetchingCollection, isLoading: isLoadinCollections } =
		useGetMyCollections(
			onSuccessCollections,
			true,
			ENV.objectToQueryString({
				page: page,
				limit: limit,
				userId: userId,
			})
		);
	const onSuccessCategories = (data: any) => {
		if (data.data.success) {
			setCategories(data.data.categories);
		} else {
			setError(data.data.message);
		}
	};
	const { isLoading: categoryIsLoading }: any = useGetCategories(
		(error: any) => console.log(error),
		onSuccessCategories
	);
	const handlePagination = () => {
		// window.scroll(0, 500);
		setPage(page);
		setLimit(limit + 12);
	};
	const handleImage = (item: any, index: number) => {
		if (item?.nftDetail[index]?.image) {
			const result = item.nftDetail.filter(
				(nft: any) => nft.fileType === 'image'
			);
			if (result.length >= index && result.length !== 0) {
				return result[index]?.image;
			} else {
				return Images.imagePlaceholder;
			}
		} else {
			return Images.imagePlaceholder;
		}
	};

	return (
		<>
			{categoryIsLoading && isLoadinCollections ? (
				<FullPageLoader />
			) : (
				<section className="explore-collection-section padding-wrapper pt-0">
					<Banner
						subHeading={myCollectionBanner.subHeading}
						heading={myCollectionBanner.heading}
						content={myCollectionBanner.content}
						bgImg={BannerBg}
						bg={true}
						bannerImg={BannerImage}
					/>
					<div className="container mt-5">
						<div className="row g-1 align-items-center">
							{categoryIsLoading && isLoadinCollections ? (
								<div className="d-flex justify-content-center">
									<div className="spinner-border" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</div>
							) : collections && collections.length > 0 ? (
								collections.map((collection: any, index: number) => {
									return (
										<div className="col-sm-6 col-md-4 col-xl-3" key={index}>
											<CollectionsCard
												CardImg={
													collection.featuredImg || Images.imagePlaceholder
												}
												Subimg1={handleImage(collection, 0)}
												Subimg2={handleImage(collection, 1)}
												Subimg3={handleImage(collection, 2)}
												name={collection.name}
												id={collection._id}
												collection={collection}
												userName={
													collection?.username[0] ? collection.username[0] : ''
												}
												NFTCount={
													collection.nftDetail ? collection.nftDetail.length : 0
												}
												profileImage={collection?.profileImage[0]}
												ownerAddress={collection?.ownerAddress}
												connectedAddress={props.connectedAddress}
												userId={collection.userId}
												blockchainType={collection.blockchainType}
											/>
										</div>
									);
								})
							) : (
								<p className="text-center not-found-title mt-5 no-found">
									No collection found
								</p>
							)}
							<div className="col-12">
								{collections?.length ? (
									<div className="mt-5 d-flex justify-content-center align-items-center">
										{!empty &&
											collections?.length &&
											!isFetchingCollection &&
											pagination.totalRecords > collections.length && (
												<button
													className="btn btn-rounded-bordered px-5"
													onClick={() => handlePagination()}
												>
													Load More...
												</button>
											)}
										{!empty &&
											collections?.length &&
											isFetchingCollection &&
											pagination.totalRecords > collections.length && (
												<button className="btn btn-rounded-bordered px-5">
													Loading...
												</button>
											)}
									</div>
								) : null}
							</div>
						</div>
					</div>
					<OwnCollectionToday />
				</section>
			)}
		</>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(MyCollections);
