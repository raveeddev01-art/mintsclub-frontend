import React, { useRef, FC } from 'react';
import { useHistory } from 'react-router';
import { Card } from 'react-bootstrap';
import HeartIcon from '../../assets/images/unlike-icon.svg';
import { AiFillHeart } from 'react-icons/ai';
import './VideoCard.scss';
import useVideoPlayer from './Components/UseVideoPlayer';
import { ENV } from '../../config/config';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {
	VideoCardInterface,
	CHAINS_INTERFACE,
} from '../../interfaces/components';
import {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
} from '../../utils/helpers/helpers';

const VideoCard: FC<VideoCardInterface> = ({
	CardImg,
	handleLikesTogleApi,
	id,
	name,
	price,
	likesCount,
	likedNfts,
	ownerId,
	sellingMethod,
	userProfile,
	auctionStartDate,
	auctionEndDate,
	copies,
	remainingCopies,
	ownerName,
	blockchainType,
}) => {
	const history = useHistory();
	const [toggle, setToggle] = React.useState(true);
	// React.useEffect(() => {
	//   return () => "";
	// }, [toggle]);

	const validateIfLiked = (likedNfts1: any, id: string) => {
		if (likedNfts && likedNfts?.length > 0) {
			const result = likedNfts.find(
				(item: { nftId: any }) => item.nftId === id
			);
			if (result) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	const checkIfAuctionStartedorEnded = (startDate: Date, endDate: Date) => {
		if (startDate !== null || endDate !== null) {
			const currentDate = new Date();
			const auctionStartDate = new Date(startDate);
			const auctionEndDate = new Date(endDate);

			if (
				auctionStartDate.setHours(0, 0, 0, 0) <=
					currentDate.setHours(0, 0, 0, 0) &&
				auctionEndDate.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0)
			) {
				return true;
			}
		} else {
			return false;
		}
	};
	const videoElement = useRef(null);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);

	return (
		<div className="card_wrap">
			<Card
				className="auction-card listing-card"
				onClick={(e: any) => {
					history.push(`/nftdetail/${id}`);
				}}
			>
				<div className="auction-img-wrapper">
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
					<div className="card-img-top">
						<div className="video-wrapper">
							<video src={CardImg} ref={videoElement} />
							<div className="controls">
								<div className="actions">
									<button
										className="play-pause-btn d-flex align-items-center justify-content-center"
										onClick={(e: any) => {
											e.stopPropagation();
											togglePlay();
										}}
									>
										{playerState.isPlaying && playerState.progress !== 100 ? (
											<BsFillPauseFill />
										) : (
											<BsFillPlayFill />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Card.Body className="d-flex flex-column">
					<div className="listing-card-title-container d-flex align-items-center justify-content-between">
						<Card.Title onClick={() => history.push(`/nftdetail/${id}`)}>
							{name ? name : 'item name'}
						</Card.Title>
						{!userProfile && (
							<div className="options-icon like-icon text-white">
								{validateIfLiked(likedNfts, id) ? (
									<div className="heart-filled-container d-flex align-items-end">
										<AiFillHeart
											className="heart-fill-icon "
											onClick={() => {
												handleLikesTogleApi(id, 'dislike', likesCount);
												setToggle(!toggle);
											}}
										/>{' '}
										<p> {likesCount ? likesCount : 0} </p>
									</div>
								) : (
									<div className="heart-filled-container d-flex align-items-end">
										<img
											src={HeartIcon}
											alt="OptionsIcon"
											onClick={() => {
												handleLikesTogleApi(id, 'like', likesCount);
												setToggle(!toggle);
											}}
										/>
										<p className="ms-1"> {likesCount ? likesCount : 0} </p>
									</div>
								)}
							</div>
						)}
					</div>
					<div className="auction-card-owner-container d-flex justify-content-between align-items-center">
						<div className="auction-owner-name">
							<p>{copies - remainingCopies} Sold</p>
						</div>
						<div className="auction-owner-name">
							<p>{remainingCopies} Remaining</p>
						</div>
					</div>
					<div
						className="auction-card-owner-container d-flex justify-content-between align-items-center mb-2"
						onClick={() => history.push(`/nftdetail/${id}`)}
					>
						<div className="auction-owner-name">
							<p>Price</p>
						</div>
						<div className="d-flex align-items-center">
							<span>{price} ETH</span>
						</div>
					</div>
					<div className="auction-card-owner-container d-flex justify-content-between align-items-center  mb-2">
						<div className="auction-owner-name">
							<p>Owner</p>
						</div>
						<div className="d-flex align-items-center ps-1">
							<span>{ownerName}</span>
						</div>
					</div>
					<button
						className="auction-bit-btn listing-buy-btn d-flex align-items-center justify-content-center"
						onClick={() => history.push(`/nftdetail/${id}`)}
					>
						<p>
							{ownerId === ENV.getUserKeys('_id')._id ||
							!sellingMethod ||
							!checkIfAuctionStartedorEnded(auctionStartDate, auctionEndDate)
								? 'View'
								: sellingMethod === 2
								? 'Place Bid'
								: 'Buy Now'}
						</p>
					</button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default VideoCard;
