import React, { useState, useEffect, useContext, FC } from 'react';
import './my-pending-batch.scss';
import CollectionsCard from '../../Components/CollectionsCards/CollectionsCard';
import { connect } from 'react-redux';
import { ENV } from '../../config/config';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg.png';

import { Images } from '../../assets/assets';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { ExploreCollectionInt } from '../../interfaces/ExploreCollections/interface';
import { useGetMyCollections, useGetMyPendingBatch } from '../../hooks/AllNFTs';
import { useGetCategories } from '../../hooks/PopularCollections';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import Banner from '../../Components/Banner/Banner';
import { myPendingBatch } from '../../utils/exportData';
import PendingBatchCard from '../../Components/PendingBatchCard/PendingBatchCard';
import { PENDING_BATCH } from '../../interfaces/allnfts/types';
import SocketContext from '../../contexts/SocketContext';

const MyCollections: FC<ExploreCollectionInt> = (props) => {
	const socket = useContext(SocketContext);
	const [pendingBatches, setPendingBatches] = useState<PENDING_BATCH[] | any[]>(
		[]
	);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(12);
	const [empty, setEmpty] = useState(false);
	const [pagination, setPagination] = useState<any>(null);
	const { setError } = useContext(errorHandler);
	const userId = ENV.getUserKeys('_id')._id;

	const onSuccessPendingBatch = (data: any) => {
		if (data.data.success) {
			const serverResponse = data.data.data;
			if (serverResponse?.pendingBatches.length > 0) {
				setEmpty(false);
			}
			setPagination(serverResponse?.pagination);
			if (serverResponse?.pagination?.page === 1) {
				setPendingBatches(serverResponse?.pendingBatches);
				return;
			}
			setPendingBatches([
				...(pendingBatches || []),
				...(serverResponse?.pendingBatches || []),
			]);
		} else {
			setError(data.data.message);
		}
	};
	const {
		isFetching: isFetchingPendingBatches,
		isLoading: isPendingBatchLoading,
		refetch: getPendingBatches,
	} = useGetMyPendingBatch(
		onSuccessPendingBatch,
		true,
		ENV.objectToQueryString({
			page: page,
			limit: limit,
			userId: userId,
		})
	);

	useEffect(() => {
		socket.on('batchStatusUpdated', (batchStatusUpdateInformation: any) => {
			getPendingBatches();
		});
	}, [socket]);

	const handlePagination = () => {
		setPage(page + 1);
	};

	React.useEffect(() => {
		getPendingBatches();
	}, [page]);

	return (
		<>
			<section className="explore-collection-section padding-wrapper pt-0">
				<Banner
					subHeading={myPendingBatch.subHeading}
					heading={myPendingBatch.heading}
					content={myPendingBatch.content}
					bgImg={BannerBg}
					bg={true}
					bannerImg={BannerImage}
				/>
				<div className="container mt-5">
					<div className="row g-1 align-items-center">
						{pendingBatches && pendingBatches.length > 0 ? (
							pendingBatches.map((pendingBatch: any, index: number) => {
								return (
									<div className="col-sm-6 col-md-4 col-xl-3" key={index}>
										<PendingBatchCard batchInformation={pendingBatch} />
									</div>
								);
							})
						) : (
							<p className="text-center not-found-title mt-5 no-found">
								No pending batch found
							</p>
						)}
						<div className="col-12">
							{pendingBatches?.length ? (
								<div className="mt-5 d-flex justify-content-center align-items-center">
									{!empty &&
										pendingBatches?.length &&
										!isFetchingPendingBatches &&
										pagination.total > pendingBatches.length && (
											<button
												className="btn btn-rounded-bordered px-5"
												onClick={() => handlePagination()}
											>
												Load More...
											</button>
										)}
									{!empty &&
										pendingBatches?.length &&
										isFetchingPendingBatches &&
										pagination.total > pendingBatches.length && (
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
		</>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(MyCollections);
