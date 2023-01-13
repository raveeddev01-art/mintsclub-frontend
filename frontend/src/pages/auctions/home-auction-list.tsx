import React, { useState, useEffect, useContext, FC } from 'react';
import AuctionsCards from '../../Components/AuctionsCards/AuctionsCards';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { AuctionsListInt } from '../../interfaces/auctions-list/interface';
import { useGetCategories } from '../../hooks/PopularCollections';
import { useGetLiveAuctions } from '../../hooks/HomeAuctions';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import './home-auction-list.scss';

import SocketContext from '../../contexts/SocketContext';

const AuctionsList: FC<AuctionsListInt> = () => {
	const socket = useContext(SocketContext);
	const [isActive, setIsActive] = useState(0);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const [auctions, setAuctions] = useState<Array<object> | null>(null);
	const [categories, setCategories] = useState<Array<object> | null>(null);
	const [categoryId, setCategoryId] = useState('all');
	const [empty, setEmpty] = useState(false);
	const [pagination, setPagination] = useState<any>(null);
	const { setError } = useContext(errorHandler);

	const onSuccessLiveAuctions = (data: any) => {
		if (data.data.success) {
			setAuctions(data.data.data.auctions);
			setPagination(data.data.data.pagination);
		} else {
			setError(data.data.message);
		}
	};

	const {
		isLoading: isLoadingLiveAuctions,
		isFetching: isFetchingAuction,
		refetch: refetchAuction,
	} = useGetLiveAuctions(categoryId, onSuccessLiveAuctions, limit);
	const handlePagination = () => {
		setPage(page);
		setLimit(limit + 12);
	};

	useEffect(() => {
		refetchAuction();
	}, [limit]);

	//Get Categories
	const onSuccessCategories = (data: any) => {
		if (data.data.success) {
			setCategories(data.data.categories);
		} else {
			setError(data.data.message);
		}
	};

	useEffect(() => {
		socket.on('auctionLive', (newAuctionCreatedInformation: any) => {
			refetchAuction();
		});

		socket.on('auctionUpdated', (auctionUpdated: any) => {
			refetchAuction();
		});
	}, [socket]);

	const { isLoading: isLoadingCategories } = useGetCategories(
		null,
		onSuccessCategories
	);

	const handleCategoryFilter = (desc: string) => {
		setCategoryId(desc);
	};
	const bannerData = {
		subHeading: 'Auctions',
		heading: 'Live Auctions',
		content:
			' Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.',
	};
	return (
		<>
			<Banner
				subHeading={bannerData.subHeading}
				heading={bannerData.heading}
				content={bannerData.content}
				bgImg={BannerBg}
				bannerImg={BannerImage}
			/>

			<section className="auction-collection-section home-auction-list padding-wrapper">
				{
					<div className="container">
						<div className="row mb-5">
							<div className="col-12 auction-collection-nav">
								<div className="d-none d-xxl-flex justify-content-lg-end text-end align-items-center">
									{categoryId === 'all' &&
									(!auctions || (auctions && auctions?.length <= 1)) &&
									isLoadingCategories
										? ''
										: categories &&
										  categories.length > 0 &&
										  categories.map((item: any, id: any) => {
												return (
													<button
														onClick={() => {
															setIsActive(id);
															handleCategoryFilter(item.description);
														}}
														key={id}
														className={`${
															id === isActive ? 'active-auction-nav' : ''
														} me-2 me-xl-3`}
													>
														{item.name}
													</button>
												);
										  })}
								</div>
								<div className="row justify-content-center justify-content-sm-start align-items-center text-center d-xxl-none">
									{categoryId === 'all' &&
									(!auctions || (auctions && auctions?.length <= 1)) &&
									isLoadingCategories
										? ''
										: categories &&
										  categories.length > 0 &&
										  categories.map((item: any, id: any) => {
												return (
													<div className="col-6 col-sm-3" key={id}>
														<button
															onClick={() => {
																setIsActive(id);
																handleCategoryFilter(item.description);
															}}
															className={`${
																id === isActive ? 'active-auction-nav' : ''
															} me-2 me-xl-3`}
														>
															{item.name}
														</button>
													</div>
												);
										  })}
								</div>
							</div>
						</div>
						<div className="row g-3 align-items-center justify-content-left">
							{isLoadingLiveAuctions || isLoadingCategories ? (
								<div className="spinner-border" role="status"></div>
							) : auctions && auctions.length > 0 ? (
								auctions.map((item: any, index: number) => {
									return (
										<div className="col-sm-6 col-md-4 col-xl-3" key={index}>
											<AuctionsCards
												key={index}
												item={item}
												ownerName={item?.username}
												userId={ENV.getUserKeys('_id')._id}
												ownerId={item?.userId}
												bidsProfile={item?.bidDetail}
											/>
										</div>
									);
								})
							) : (
								<p className="text-center mt-5 text-color">
									No Live Auctions Found
								</p>
							)}

							<div className="col-12">
								<div className="mt-5 text-center">
									{auctions?.length &&
										!isFetchingAuction &&
										pagination.total > auctions.length && (
											<button
												className="btn btn-linear-gradient px-5"
												onClick={() => handlePagination()}
											>
												Load More...
											</button>
										)}
									{auctions?.length &&
										isFetchingAuction &&
										pagination.total > auctions.length && (
											<button className="btn btn-linear-gradient px-5">
												Loading...
											</button>
										)}
								</div>
							</div>
						</div>
					</div>
				}
				<OwnCollectionToday />
			</section>
		</>
	);
};

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {})(AuctionsList);
