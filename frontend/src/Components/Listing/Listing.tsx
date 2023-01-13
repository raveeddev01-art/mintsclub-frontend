import React, { useState, useEffect, FC, useContext } from 'react';
import './Listing.scss';
import { decimalnumbervalidator } from '../../utils/functions';
import { listingInt } from '../../interfaces/components';
import SortFilter from '../Filters/SortFIlter';
import OwnerFilters from '../Filters/OwnerFilters';
import StatusFilter from '../Filters/StatusFIlter';
import PriceFilter from '../Filters/PriceFilter';
import CollectionFilter from '../Filters/CollectionFilter';
import FilteredNftsList from '../Filters/FilteredNftsList';
import { ENV } from '../../config/config';

import SocketContext from '../../contexts/SocketContext';

const Listing: FC<listingInt> = (props) => {
	const socket = useContext(SocketContext);
	const [minValue, setMinValue] = useState<any>('');
	const [maxValue, setMaxValue] = useState<any>('');
	const [statusActive, setStatusActive] = useState<any>(null);
	const [filterActive, setFilterActive] = useState<any>(false);
	const [initial, setInitial] = useState<any>(true);
	const [selectedOption, setSelectedOption] = useState<any>();
	const [collectionActive, setCollectionActive] = useState<any>(null);
	const [isActive, setIsActive] = useState<any>(null);
	const [keyword, setKeyword] = useState<any>(
		props.initialKeyword ? props.initialKeyword : ''
	);

	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(9);

	const [filter, setFilter] = useState<any>({
		collectionId: false,
		gtePrice: false,
		ltePrice: false,
		categoryId: false,
		oldest: false,
		lowToHigh: false,
		highToLow: false,
		newest: false,
		buy: false,
		auction: false,
		latest: false,
		keyword: props.initialKeyword ? props.initialKeyword : '',
		collected: false,
		created: false,
		userOwned: ENV.getUserKeys('_id')._id,
	});
	const priceOptions = [
		{ value: 'lowtohigh', label: 'Low To High' },
		{ value: 'hightolow', label: 'High To Low' },
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'newest', label: 'Recently Created' },
	];

	useEffect(() => {
		const { initialKeyword } = props;
		if (initialKeyword) {
			const capitalizeValue = capitalize(initialKeyword);
			setKeyword(capitalizeValue);
			handleSearchKeyword(capitalizeValue);
		}
	}, [props.initialKeyword]);

	useEffect(() => {
		fetchData(filter);
	}, []);

	useEffect(() => {
		socket.on('newAuctionCreated', (newAuctionCreatedInformation: any) => {
			refetchNFTs();
		});

		socket.on('auctionUpdated', (auctionUpdatedInformation: any) => {
			refetchNFTs();
		});

		socket.on('nftCreated', (nftCreatedInformation: any) => {
			refetchNFTs();
		});
		socket.on('newNftAdded', (nftAddedInformation: any) => {
			refetchNFTs();
		});
	}, [socket]);

	useEffect(() => {
		setPage(1);
		props?.setNfts([]);
		fetchData(filter);
	}, [filter]);

	useEffect(() => {
		fetchData({ ...filter, page, limit });
	}, [page]);

	const handleSelectChange = (selectedOption: any) => {
		setSelectedOption(selectedOption);
	};
	const selectCustomStyles = {};

	const statusData = ['Buy Now', 'On Auction'];
	const handleFilters = () => {
		setFilterActive(!filterActive);
	};
	const isHideCollection = () => {
		if (props.collectionDetail) {
			return false;
		}
		if (props.UserProfile) {
			if (isActive === 1) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};

	const handleSortOptions = (e: any) => {
		setFilterationLoader(true);
		setInitial(false);

		const { label } = e;
		if (label === 'Low To High') {
			setFilter((prev: any) => ({
				...prev,
				lowToHigh: true,
				highToLow: false,
				oldest: false,
				newest: false,
			}));
		} else if (label === 'High To Low') {
			setFilter((prev: any) => ({
				...prev,
				highToLow: true,
				lowToHigh: false,
				oldest: false,
				newest: false,
			}));
		} else if (label === 'Oldest') {
			setFilter((prev: any) => ({
				...prev,
				oldest: true,
				highToLow: false,
				lowToHigh: false,
				newest: false,
			}));
		} else if (label === 'Recently Created') {
			setFilter((prev: any) => ({
				...prev,
				newest: true,
				oldest: false,
				highToLow: false,
				lowToHigh: false,
			}));
		} else {
			// Empty Block Statement
		}
	};

	const onChangeMinPrice = (e: any) => {
		setMinValue(e.target.value);
	};
	const onChangeMaxPrice = (e: any) => {
		setMaxValue(e.target.value);
	};

	const handlePagination = () => {
		setInitial(false);
		setFilterationLoader(false);
		setPage(page + 1);
	};

	const applyMinMaxFilter = () => {
		setInitial(false);
		setFilterationLoader(true);
		setFilter((prev: any) => ({
			...prev,
			gtePrice: minValue,
			ltePrice: maxValue,
		}));
	};

	const handleCollectionsFilter = (id: string) => {
		setInitial(false);
		setFilterationLoader(true);
		setFilter((prev: any) => ({ ...prev, collectionId: id }));
	};

	const handleSearchKeyword = (value: any) => {
		setInitial(false);
		setFilterationLoader(true);
		refetchNFTs();
		let capitalizeValue = '';
		if (value) {
			capitalizeValue = capitalize(value);
		}
		setFilter((prev: any) => ({ ...prev, keyword: capitalizeValue }));
	};

	const handleStatusFilter = (id: string) => {
		setInitial(false);
		setFilterationLoader(true);
		if (id === 'Buy Now') {
			setFilter((prev: any) => ({
				...prev,
				buy: true,
				auction: false,
				newest: false,
			}));
		} else if (id === 'On Auction') {
			setFilter((prev: any) => ({
				...prev,
				auction: true,
				buy: false,
				newest: false,
			}));
		} else {
			setFilter((prev: any) => ({
				...prev,
				newest: true,
				buy: false,
				auction: false,
			}));
		}
	};

	const handleNftFilter = (id: string, data = false) => {
		setInitial(false);
		setFilterationLoader(true);
		if (id === 'Collected') {
			// console.log('This is collected,id', filter.collected);
			setFilter((prev: any) => ({
				...prev,
				collected: ENV.getUserKeys('_id')._id,
				created: false,
			}));
		} else if (id === 'Created') {
			setFilter((prev: any) => ({
				...prev,
				created: ENV.getUserKeys('_id')._id,
				collected: false,
			}));
		}
	};
	const handleClearFilter = (id: any) => {
		if (id === 'status') {
			setFilterationLoader(true);
			setFilter((prev: any) => ({
				...prev,
				buy: false,
				auction: false,
				newest: false,
			}));
		} else if (id === 'item') {
			setFilterationLoader(true);
			setFilter((prev: any) => ({
				...prev,
				collected: false,
				created: false,
			}));
		} else if (id === 'price') {
			setFilterationLoader(true);
			setMinValue('');
			setMaxValue('');
			setFilter((prev: any) => ({ ...prev, ltePrice: false, gtePrice: false }));
		} else if (id === 'collections') {
			setFilterationLoader(true);
			setFilter((prev: any) => ({ ...prev, collectionId: false }));
		} else {
			setMinValue('');
			setMaxValue('');
			setStatusActive(null);
			setCollectionActive(null);
			setSelectedOption(null);
			setFilterActive(null);
			setKeyword('');
			setIsActive(null);
			setFilter({
				collectionId: false,
				gtePrice: false,
				ltePrice: false,
				categoryId: false,
				oldest: false,
				lowToHigh: false,
				highToLow: false,
				newest: false,
				page: filter.page,
				limit: filter.limit,
				buy: false,
				auction: false,
				latest: false,
				created: false,
				collected: false,
				userOwned: ENV.getUserKeys('_id')._id,
				keyword: props.initialKeyword || '',
			});
		}
	};
	const capitalize = (word: string) => {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	};

	const {
		collections,
		disabled,
		menuData,
		// handleNftFilter,
		setMenuFilter,
		filterationLoader,
		setFilterationLoader,
		nfts,
		loader,
		totalItems,
		likedNfts,
		nftPagination,
		handleLikesTogleApi,
		fetchData,
		path,
		getPaginatedData,
		UserProfile,
		refetchNFTs,
	}: any = props;
	return (
		<div className="filterhoc-wrapper padding-wrapper">
			<div className="container">
				<div className="row justify-content-center justify-content-lg-start">
					<SortFilter
						data={{
							keyword,
							handleSearchKeyword,
							setKeyword,
							handleSelectChange,
							handleSortOptions,
							priceOptions,
							selectedOption,
							selectCustomStyles,
							filterActive,
							handleFilters,
						}}
					/>

					<OwnerFilters
						data={{
							menuData,
							setIsActive,
							isActive,
							handleNftFilter,
							setMenuFilter,
							nftPagination,
							totalItems,
							setStatusActive,
						}}
					/>
					<div
						className={`${
							filterActive ? 'd-block d-lg-block' : 'd-none d-lg-block'
						} col-md-5 col-lg-4 col-xl-3 order-1 order-lg-2 mt-4 mt-lg-0`}
					>
						<StatusFilter
							data={{
								statusData,
								statusActive,
								setStatusActive,
								handleStatusFilter,
								handleClearFilter,
							}}
						/>

						<PriceFilter
							data={{
								minValue,
								maxValue,
								decimalnumbervalidator,
								onChangeMinPrice,
								onChangeMaxPrice,
								applyMinMaxFilter,
								disabled,
								handleClearFilter,
							}}
						/>

						<CollectionFilter
							data={{
								isHideCollection,
								collections,
								handleCollectionsFilter,
								setCollectionActive,
								collectionActive,
								handleClearFilter,
							}}
						/>
						<div className="d-flex align-items-center justify-content-center btn-clear-all">
							<button onClick={() => handleClearFilter(null)}>
								Clear All Filters
							</button>
						</div>
					</div>

					<FilteredNftsList
						data={{
							filterationLoader,
							nfts,
							handleLikesTogleApi,
							likedNfts,
							path,
							nftPagination,
							handlePagination,
							loader,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Listing;
