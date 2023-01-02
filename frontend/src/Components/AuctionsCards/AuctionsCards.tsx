import React, { useState, FC } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ArrowUp from '../../assets/images/arrowUp.svg';
import Countdown from 'react-countdown';
import { ENV } from '../../config/config';
import useVideoPlayer from '../TestVideoCard/Components/UseVideoPlayer';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import './AuctionsCard.scss';
import { Images } from '../../assets/assets';
import ImageLoader from '../ContentLoader/ImageLoader';
import AuctionAudio from '../AuctionAudio/AuctionAudio';
import {
	AuctionCardInterface,
	CHAINS_INTERFACE,
} from '../../interfaces/components';

import {
	verifyOwner,
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
} from '../../utils/helpers/helpers';

const AuctionsCards: FC<AuctionCardInterface> = ({
	ownerName,
	userId,
	bidsProfile,
	item,
	cardBg,
	key,
	connectedAddress,
}) => {
	const { countDownRenderer } = ENV;
	const history = useHistory();
	const videoElement = React.useRef(null);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);
	const [loader, setLoader] = useState<any>(true);
	const {
		nftImage,
		auctionEndDate,
		nftName,
		compressedFile,
		_id,
		nftId,
		highestBid,
		Totalbids,
		currentPrice,
		fileType,
		ownerAddress,
		username,
		profilePhoto,
		blockchainType,
	} = item;

	return (
		<div className="card_wrap">
			<Card key={key} className={`auction-card ${cardBg} mx-auto mx-sm-2`}>
				<div className="auction-img-wrapper">
					{blockchainType ? (
						<div className="nft-chain">
							<img
								src={
									CHAIN_LOGOS[
										(blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE) ||
											'ethereum'
									]
								}
								alt=""
								className="icon"
							/>
							<span className="name">
								{
									CHAIN_TITLE[
										(blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE) ||
											'ethereum'
									]
								}
							</span>
						</div>
					) : null}

					{fileType === 'image' ? (
						<>
							<div style={{ display: `${loader ? 'block' : 'none'}` }}>
								<ImageLoader />
							</div>
							<Card.Img
								variant="top"
								onLoad={() => setLoader(false)}
								onClick={() => history.push(`explore/nftdetail/${nftId}`)}
								src={compressedFile ? compressedFile : nftImage}
								alt="AuctionTopImg"
								style={{ display: `${!loader ? 'block' : 'none'}` }}
							/>
						</>
					) : fileType === 'video' ? (
						<div className="card-img-top">
							<div className="video-wrapper">
								<div style={{ display: `${loader ? 'block' : 'none'}` }}>
									<ImageLoader />
								</div>

								<video
									src={nftImage}
									onEnded={() => {
										togglePlay();
									}}
									onCanPlay={() => {
										setLoader(false);
									}}
									ref={videoElement}
									// onTimeUpdate={handleOnTimeUpdate}
									style={{ display: `${!loader ? 'block' : 'none'}` }}
									onClick={() => history.push(`explore/nftdetail/${nftId}`)}
								/>

								<div className="controls">
									<div className="actions">
										<button
											className="play-pause-btn d-flex align-items-center justify-content-center"
											onClick={togglePlay}
										>
											{playerState.isPlaying ? (
												<BsFillPauseFill />
											) : (
												<BsFillPlayFill />
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					) : fileType === 'audio' ? (
						<>
							<div style={{ display: `${loader ? 'block' : 'none'}` }}>
								<ImageLoader />
							</div>

							<AuctionAudio
								src={nftImage}
								onLoadCallback={() => setLoader(false)}
								loader={loader}
								onClick={() => history.push(`explore/nftdetail/${nftId}`)}
							/>
						</>
					) : (
						' '
					)}
					<div className="auction-countdown d-flex flex-column justify-content-center align-items-center">
						<Countdown date={auctionEndDate} renderer={countDownRenderer} />
						<div
							className="auction-card-avatar-container d-flex align-items-center justify-content-between"
							onClick={() => history.push(`explore/nftdetail/${nftId}`)}
						>
							<div className="auction-card-avatar d-flex align-items-center">
								{bidsProfile &&
									bidsProfile.length > 0 &&
									bidsProfile.map((item: any, i: any) => {
										return Totalbids !== 0 ? (
											<img
												src={
													item.bidByProfile === null
														? Images.placeholderImg
														: !item.bidByProfile
														? Images.placeholderImg
														: item.bidByProfile
												}
												alt="Avatar"
												key={i}
											/>
										) : (
											''
										);
									})}
								<span className={`${Totalbids === 0 ? '' : 'ms-2'}`}>
									{Totalbids === 0
										? 'No bid found'
										: Totalbids < 4
										? Totalbids + ' people placed bid'
										: Totalbids - 1 + '+ people placed bid'}
								</span>
							</div>
						</div>
					</div>
				</div>
				<Card.Body onClick={() => history.push(`explore/nftdetail/${nftId}`)}>
					<Card.Title>
						<div>
							{nftName && nftName.length > 15
								? nftName.slice(0, 15) + '...'
								: nftName}
						</div>
						<div className="auction-owner-price d-flex align-items-center">
							<img src={ArrowUp} alt="" className="me-1" />
							<span>{Totalbids > 0 ? highestBid : currentPrice}</span>
						</div>
					</Card.Title>
					<div className="auction-card-owner-container d-flex align-items-center mb-2">
						<div className="auction-owner-avatar">
							<img
								src={profilePhoto ? profilePhoto : Images.placeholderImg}
								alt="avatar"
							/>
						</div>
						<div className="ms-2 auction-owner-name">
							<p>
								{'Owned by:'}
								<span className="text-capitalize ms-1">
									{verifyOwner(
										ownerAddress,
										connectedAddress,
										blockchainType,
										username
									)}
								</span>
							</p>
						</div>
					</div>
					<button className="auction-bit-btn">
						{connectedAddress?.toUpperCase() === ownerAddress?.toUpperCase() &&
						ENV.getUserKeys('_id')?._id === userId
							? 'View'
							: 'Place a Bid'}
					</button>
				</Card.Body>
			</Card>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(AuctionsCards);
