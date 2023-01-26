import React, { useState, FC, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router';
import useVideoPlayer from '../TestVideoCard/Components/UseVideoPlayer';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import placeholderImg from '../../assets/images/placeholder.png';
import { connect } from 'react-redux';
import './NftCard.scss';
import { Images } from '../../assets/assets';
import ImageLoader from '../ContentLoader/ImageLoader';
import Audio from '../Audio/Audio';
import { CHAINS_INTERFACE, NFTCardInt } from '../../interfaces/components';
import {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
} from '../../utils/helpers/helpers';
import { useGetData, useInsertData } from '../../hooks/Common';
import { ENV } from '../../config/config';
const NFTCard: FC<NFTCardInt> = (props) => {
	const history = useHistory();
	const videoElement = React.useRef(null);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);
	const [loader, setLoader] = useState<any>(true);
	const {
		image,
		name,
		_id,
		fileType,
		cardBg,
		ownerId,
		likeCount,
		currentPrice,
		copies,
		remainingCopies,
		ownerAddress,
		compressedFile,
		blockchainType,
	} = props.data;

	const [nftLikes, SetNftLikes] = useState(likeCount);
	const [likeButtonDisable, setLikeBtnDisable] = useState<any>(null);
	const [likesbyUser, setLikesbyUser] = useState<boolean>(false);

	const { username, profileImage, profilePhoto }: any = props?.owner || {};
	const { likedNfts } = props;

	const validateIfLiked = (likedNfts1: any, id: string) => {
		if (likedNfts && likedNfts?.length > 0) {
			const result = likedNfts.find((item) => item.nftId === id);
			if (result) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	//React Query to post likedislike
	const likeDislikeSuccess = () => {
		setLikeBtnDisable(false);
		refetch();
		setLikesbyUser(!likesbyUser);
	};

	const { mutate: toggleLikeDislike } = useInsertData(
		'nftLikes/likeDislike',
		likeDislikeSuccess
	);

	//React Query to get likedislike

	const onSuccess = (data: any) => {
		SetNftLikes(data?.data?.data.length);
	};

	const { refetch } = useGetData(
		'nftLike',
		'nftLikes/getNftLikes',
		ENV.objectToQueryString({
			nftId: props.data._id,
		}),
		onSuccess
	);

	// React Query to Check Liked NFTs
	const onResponse = (data: any) => {
		setLikesbyUser(data.data.likedByUser);
	};
	if (ENV.getUserKeys('_id')._id) {
		useGetData(
			'checkLikes',
			'nftLikes/checkNftLikes',
			ENV.objectToQueryString({
				nftId: props.data._id,
				userId: ENV.getUserKeys('_id')._id,
			}),
			onResponse
		);
	}

	useEffect(() => {
		refetch();
	}, [props?.data?._id]);

	return (
		<div className="card_wrap">
			<Card
				className={`nft-card ${cardBg} m-1 mx-auto mx-sm-1`}
				onClick={() => history.push(`${props.path}${_id}`)}
			>
				<div className="nft-img-wrapper">
					<div className="nft-chain">
						<img
							src={
								CHAIN_LOGOS[
									(props.data?.blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE) ||
										'ethereum'
								]
							}
							alt=""
							className="icon"
						/>
						<span className="name">
							{
								CHAIN_TITLE[
									(props.data?.blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE) ||
										'ethereum'
								]
							}
						</span>
					</div>
					{fileType === 'image' ? (
						<>
							<div style={{ display: `${loader ? 'block' : 'none'}` }}>
								<ImageLoader />
							</div>
							<Card.Img
								variant="top"
								onLoad={() => setLoader(false)}
								onClick={() => history.push(`${props.path}${_id}`)}
								src={compressedFile ? compressedFile : image}
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
									id="video1"
									src={compressedFile ? compressedFile : image}
									ref={videoElement}
									onEnded={() => {
										togglePlay();
									}}
									onCanPlay={() => {
										setLoader(false);
									}}
									style={{ display: `${!loader ? 'block' : 'none'}` }}
								/>

								<div className="controls">
									<div className="actions">
										<button
											className="play-pause-btn d-flex align-items-center justify-content-center"
											onClick={(e: any) => {
												e.stopPropagation();
												togglePlay();
											}}
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
							<Audio
								src={image}
								onLoadCallback={() => {
									setLoader(false);
									return false;
								}}
								loader={loader}
								fileType={fileType}
							/>
						</>
					) : (
						' '
					)}
				</div>
				<Card.Body>
					<Card.Title>
						<div>
							{name && name.length > 25 ? name.slice(0, 25) + '...' : name}
						</div>
						<div className="nft-owner-price d-flex align-items-center">
							<span className="me-2">{nftLikes ? nftLikes : 0}</span>
							{!likesbyUser ? (
								<img
									src={Images.whiteEmptyHeart}
									alt=""
									onClick={() => {
										if (!ENV.getUserKeys('_id')._id) {
											history.push('/connect-wallet');
											return;
										}
										toggleLikeDislike({
											nftId: props.data._id,
											userId: ENV.getUserKeys('_id')._id,
										});
									}}
								/>
							) : (
								<img
									src={Images.whiteFillHeart}
									alt=""
									onClick={() => {
										if (!ENV.getUserKeys('_id')._id) {
											history.push('/connect-wallet');
											return;
										}
										toggleLikeDislike({
											nftId: props.data._id,
											userId: ENV.getUserKeys('_id')._id,
										});
									}}
								/>
							)}
						</div>
					</Card.Title>
					<div className="nft-status d-none">
						<div className="status-info status-sold">
							<span className="status">
								Sold:{' '}
								<span className="status-count">{copies - remainingCopies}</span>{' '}
							</span>
						</div>
						<div className="status-info status-remaining">
							<span className="status">
								Remaining:{' '}
								<span className="status-count">{remainingCopies}</span>{' '}
							</span>
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-between nft-bottom">
						<div className="nft-card-owner-container d-flex align-items-center">
							<div className="nft-owner-avatar">
								<img
									src={
										!profilePhoto && !profileImage
											? placeholderImg
											: profilePhoto
											? profilePhoto
											: profileImage
									}
									alt="avatar"
								/>
							</div>
							<div className="ms-2 nft-owner-name">
								<p className="d-flex flex-column">
									<OverlayTrigger
										placement="top"
										overlay={
											<Tooltip id="tooltip">
												{verifyOwner(
													ownerAddress,
													props.connectedAddress,
													blockchainType,
													username
												)}
											</Tooltip>
										}
									>
										<span className="text-capitalize ms-1 name">
											{verifyOwner(
												ownerAddress,
												props.connectedAddress,
												blockchainType,
												username
											)}
										</span>
									</OverlayTrigger>
									<span className="nft-price mt-1">
										<img className="me-2" src={Images.nftPriceTag} />
										<a className="price ms-1">
											{currentPrice}{' '}
											{
												CHAIN_CURRENCY[
													blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
												]
											}
										</a>
									</span>
								</p>
							</div>
						</div>
						<button
							className="nft-bit-btn"
							onClick={() => history.push(`${props.path}${_id}`)}
						>
							{'View Detail'}
						</button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(NFTCard);
