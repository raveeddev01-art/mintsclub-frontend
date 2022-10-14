import React, { useState, useEffect, FC, useContext } from 'react';
import CollectionsCard from '../../Components/CollectionsCards/CollectionsCard';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import { Images } from '../../assets/assets';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { popularBanner } from '../../utils/exportData';
import { PopularCollectionlistInt } from '../../interfaces/PopularCollectionsList/interface';
import {
	useGetCategories,
	useGetPopularCollections,
} from '../../hooks/PopularCollections';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import './popular-collections-list.scss';

const Populars: FC<PopularCollectionlistInt> = (props) => {
	const [popular, setpopular] = useState([]);
	const [isActive, setIsActive] = useState('All');
	const [categoryId, setCategoryId] = useState('all');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [categories, setCategories] = useState<any[] | null>(null);
	const [empty, setEmpty] = useState(false);
	const [loader, setLoader] = useState(true);
	const [pagination, setPagination] = useState<any>(null);
	const { error, setError } = useContext(errorHandler);
	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const onSuccessPopular = (data: any) => {
		if (data.data.success) {
			calcualtePopularCollections(data.data?.data);
		} else {
			setError(data.data.message);
		}
	};

	const onErrorPopular = (error: any) => {
		setError(error);
	};

	const {
		isFetching: isFetchingPopular,
		isLoading,
		refetch: refetchPopular,
	} = useGetPopularCollections(
		onErrorPopular,
		onSuccessPopular,
		categoryId,
		limit
	);

	const onSuccessCategories = (data: any) => {
		if (data.data.success) {
			setCategories(data.data.categories);
		} else {
			setError(data.data.message);
		}
	};

	const {
		isFetching: isFetchingCategories,
		isLoading: categoryIsLoading,
	}: any = useGetCategories(
		(error: any) => console.log(error),
		onSuccessCategories
	);

	useEffect(() => {
		refetchPopular();
	}, [page, categoryId]);

	const calcualtePopularCollections = (data: any) => {
		if (data.collectionsList.length > 0) {
			const collectionListing = data.collectionsList;
			const pagination = data.pagination;

			if (collectionListing) {
				collectionListing.forEach((element: any, i: number) => {
					if (element.likesCount.length > 0) {
						const sumLikes = element.likesCount.reduce(function (
							a: number,
							b: number
						) {
							return a + b;
						},
						0);
						collectionListing[i].likesCount = sumLikes;
					}
					collectionListing[i].likesCount = 0;

					collectionListing[i].totalNfts = element.nftDetail[0].image
						? element.nftDetail?.length
						: 0;
					if (element.soldCopies.length > 0) {
						const soldCopiesSum = element.soldCopies.reduce(function (
							a: number,
							b: number
						) {
							return a + b;
						},
						0);
						collectionListing[i].soldCopies = soldCopiesSum;
					}

					collectionListing[i].soldCopies = 0;
				});
			}

			const finalCollectionListing = collectionListing.sort(
				(a: any, b: any) =>
					b.likesCount - a.likesCount || b.soldCopies - a.soldCopies
			);

			setPagination(pagination);
			const userId = ENV.getUserKeys('_id')._id;
			if (props.finalCollectionListing) {
				const finalCollectionListing = props.finalCollectionListing.filter(
					(item: any) => item.userId === userId
				);
				setpopular(finalCollectionListing);
			} else {
				if (finalCollectionListing === null) {
					setEmpty(true);
				} else {
					setEmpty(false);
				}
				setpopular(finalCollectionListing);
			}
		} else {
			setpopular([]);
		}
	};

	const handlePagination = () => {
		// window.scroll(0, 500);
		setPage(page);
		setLimit(limit + 10);
	};

	const handleFilterCategory = (category: string) => {
		setCategoryId(category);
		setLoader(true);
		setPage(1);
		setLimit(10);
	};

	const handleImage = (item: any, index: number) => {
		if (item?.nftDetail[index]?.image) {
			const result = item.nftDetail.filter(
				(nft: any) => nft.fileType === 'image'
			);
			if (result.length >= index) {
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
			<Banner
				subHeading={popularBanner.subHeading}
				heading={popularBanner.heading}
				content={popularBanner.content}
				bgImg={BannerBg}
				bannerImg={BannerImage}
			/>
			{categoryIsLoading && isLoading ? (
				<FullPageLoader />
			) : (
				<>
					{' '}
					<section className="popular-collection-section padding-wrapper">
						<div className="container">
							<div className="row mb-5">
								<div className="col-12 popular-collection-nav">
									<div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
										{categoryId === 'all' &&
										popular &&
										popular?.length === 0 &&
										!loader
											? ''
											: categories &&
											  categories.length > 0 &&
											  categories.map((item: any, index: number) => {
													return (
														<button
															onClick={() => {
																setIsActive(item.name);
																handleFilterCategory(item.description);
															}}
															key={index}
															className={`${
																item.name === isActive
																	? 'active-popular-nav'
																	: ''
															} me-2 me-xl-3`}
														>
															{item.name}
														</button>
													);
											  })}
									</div>
									<div className="row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none">
										{categoryId === 'all' &&
										popular &&
										popular?.length === 0 &&
										!loader
											? ''
											: categories &&
											  categories.length > 0 &&
											  categories.map((item: any, index: number) => {
													return (
														<div className="col-6 col-sm-3" key={index}>
															<button
																onClick={() => {
																	setIsActive(item.name);
																	handleFilterCategory(item.description);
																}}
																className={
																	isActive === item.name
																		? 'active-popular-nav'
																		: ''
																}
															>
																{item.name}
															</button>
														</div>
													);
											  })}
									</div>
								</div>
							</div>
							<div className="row g-1 align-items-center">
								{isLoading || isFetchingCategories || isFetchingPopular ? (
									<div className="d-flex justify-content-center">
										<div className="spinner-border" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</div>
								) : popular && popular.length > 0 ? (
									popular.map((collection: any, index: number) => {
										return (
											<div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
												<CollectionsCard
													CardImg={collection.featuredImg}
													Subimg1={handleImage(collection, 0)}
													Subimg2={handleImage(collection, 1)}
													Subimg3={handleImage(collection, 2)}
													name={collection.name}
													id={collection._id}
													collection={collection}
													userName={collection.username[0]}
													NFTCount={collection.TotalNfts}
													profileImage={collection.profileImage[0]}
													ownerAddress={collection.ownerAddress}
													connectedAddress={props.connectedAddress}
												/>
											</div>
										);
									})
								) : (
									<p className="text-center  not-found-title mt-5">
										No popular collection found
									</p>
								)}

								<div className="col-12">
									<div className="mt-5 text-center">
										{!empty &&
											popular?.length === 10 &&
											pagination.totalRecords > popular.length && (
												<button
													className="btn btn-rounded-bordered px-5"
													onClick={() => handlePagination()}
												>
													Load more...
												</button>
											)}
									</div>
								</div>
							</div>
						</div>
					</section>
					<OwnCollectionToday />
				</>
			)}
		</>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {}, null, { forwardRef: true })(
	Populars
);
