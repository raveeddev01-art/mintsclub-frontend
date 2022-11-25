import NftCard from '../NftCard/NftCard';
import React, { useState } from 'react';

const FilteredNftsList = ({ data }: any) => {
	const {
		filterationLoader,
		nfts,
		likedNfts,
		path,
		nftPagination,
		handlePagination,
		loader,
	} = data;
	return (
		<div className="col-lg-8 col-xl-9 order-3">
			{/* {loader ? (
<FullPageLoader />
) : ( */}
			<div className="row g-1">
				{filterationLoader ? (
					<div className="text-center">
						<div className="spinner-border text-secondary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : nfts && nfts.length > 0 ? (
					nfts.map((nft: any, index: number) => {
						return (
							<div
								key={index}
								className="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4"
							>
								{
									<NftCard
										data={nft}
										likedNfts={likedNfts}
										owner={nft.owner}
										path={path}
										index={index}
									/>
								}
							</div>
						);
					})
				) : (
					<p className="text-center mt-5 no-nft-title">No NFTs Found</p>
				)}
				<div className="col-12">
					<div className="mt-5 text-center">
						{nfts &&
							nftPagination?.total > nfts.length &&
							!filterationLoader &&
							!loader && (
								<button
									className="btn btn-rounded-bordered px-5"
									onClick={() => handlePagination()}
								>
									Load More...
								</button>
							)}
						{nfts &&
							nftPagination?.total > nfts.length &&
							!filterationLoader &&
							loader && (
								<button className="btn btn-rounded-bordered px-5">
									Loading...
								</button>
							)}
					</div>
				</div>
			</div>
			{/* ) */}
			{/* } */}
		</div>
	);
};
export default FilteredNftsList;
