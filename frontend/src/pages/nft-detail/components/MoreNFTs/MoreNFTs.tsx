import React from 'react';
import NftCard from '../../../../Components/NftCard/NftCard';

const MoreNFTs = ({ info }: any) => {
	const { nfts, handleLikesTogleApi, likedNfts }: any = info;
	return (
		<div className="col-12 order-2 mt-5">
			<div className="detail-more-collection">
				<h6>More from this collection</h6>
			</div>
			<div className="row align-items-center g-3">
				{nfts && nfts.length > 0 ? (
					nfts.map((nft: any, id: any) => {
						if (id <= 3) {
							return (
								<div
									className="col-10 col-sm-6 col-md-4 col-lg-3 px-1"
									key={id}
								>
									{
										<NftCard
											data={nft}
											handleLikesTogleApi={handleLikesTogleApi}
											likedNfts={likedNfts}
											owner={nft?.owner[0]}
											path="/explore/nftdetail/"
										/>
									}
								</div>
							);
						}
					})
				) : (
					<p className="text-center mt-4 text">No NFTs Found</p>
				)}
			</div>
		</div>
	);
};
export default MoreNFTs;
