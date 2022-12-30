import React, { useEffect, useState } from 'react';
import { ENV } from '../../config/config';
import { verifyOwner, verifyNFTStatus } from '../../utils/helpers/helpers';
const FileDetail = ({ info }: any) => {
	const {
		name,
		copies,
		remainingCopies,
		currentPrice,
		copiesForAuction,
		sellingMethod,
		exchangeRate,
		auctionEndDate,
		auctionStartDate,
		checkIfAuctionIsStarted,
		checkIfAuctionStartedorEnded,
		user,
		ownerAddress,
		handleRouting,
		claimNFT,
		connectedAddress,
		auctionEnded,
		EndAuction,
		Images,
		blockchainType,
		highestBidder,
		activeAuction,
		currentBidder,
		bidStatus,
		status,
		bidCount,
	}: any = info;
	const buttonText = verifyNFTStatus(
		ownerAddress,
		connectedAddress,
		sellingMethod,
		auctionEnded,
		blockchainType,
		highestBidder,
		activeAuction,
		currentBidder,
		bidStatus,
		status,
		bidCount
	);
	const sold = copies - remainingCopies;
	return (
		<div className="col-xl-6">
			<div className="nft-img-detail">
				<h5>NFT Details:</h5>
			</div>
			<div className="nft-img-detail-box">
				<div className="nft-detail-rounded-box">
					<p>{name && name.length > 30 ? name.slice(0, 30) + '...' : name}</p>
				</div>
				<div className="row g-2 g-sm-4">
					<div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
						<div className="nft-detail-rounded-box">
							<p>
								Total Copies: <span>{copies}</span>
							</p>
						</div>
					</div>
					<div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
						<div className="nft-detail-rounded-box">
							<p>
								Sold: <span>{sold || 0}</span>
							</p>
						</div>
					</div>
					<div className="col-6 col-sm-4 col-xl-6 col-xxl-4">
						<div className="nft-detail-rounded-box">
							<p>
								Remaining: <span>{remainingCopies}</span>
							</p>
						</div>
					</div>
				</div>
				<div className="nft-detail-price d-flex align-items-center  mb-3">
					<div className="d-flex align-items-center me-2">
						<img src={Images.onsale} className="me-3" />
						<h2>{currentPrice}</h2>
					</div>
					<div className="price-in-dollar">
						<p> ($ {(currentPrice * exchangeRate || 0).toExponential(2)})</p>
					</div>
				</div>
				{blockchainType !== 'solana' && (
					<div className="nft-detail-rounded-box on-sale">
						<p>
							Copies On Sale:{' '}
							<span> {copiesForAuction ? copiesForAuction : 0}</span>
						</p>
					</div>
				)}
				<div className="nft-detail-date d-flex align-items-center">
					<p>
						{sellingMethod === 2 && (
							<>
								{
									<>
										<img
											src={Images.ClockIcon}
											alt="clock-icon"
											className="me-1"
										/>
										<span>
											{checkIfAuctionIsStarted(
												auctionStartDate,
												auctionEndDate
											)}{' '}
											{/* {auctionEndTimeConversion(
                            new Date(auctionEndDate)
                          )}{" "} */}
										</span>
									</>
								}
							</>
						)}
					</p>
				</div>
			</div>
			<div className="nft-detail-owner d-flex align-items-center">
				<img
					src={user?.profileImage ? user?.profileImage : Images.placeholderImg}
					alt="avatar"
					className="me-2"
				/>
				<p>
					Owned by:
					<span className="text-capitalize ms-1">
						{' '}
						{verifyOwner(
							ownerAddress,
							connectedAddress,
							blockchainType,
							user?.username
						)}
					</span>
				</p>
			</div>
			<div className="nft-detail-btn">
				{checkIfAuctionStartedorEnded(
					auctionStartDate,
					auctionEndDate,
					blockchainType
				) &&
					!claimNFT &&
					buttonText !== 'invalid detail' && (
						<button onClick={() => handleRouting()}>
							{verifyNFTStatus(
								ownerAddress,
								connectedAddress,
								sellingMethod,
								auctionEnded,
								blockchainType,
								highestBidder,
								activeAuction,
								currentBidder,
								bidStatus,
								status,
								bidCount
							)}
						</button>
					)}

				{claimNFT && (
					<button onClick={() => EndAuction()}>{'Claim NFT'}</button>
				)}
			</div>
		</div>
	);
};
export default FileDetail;
