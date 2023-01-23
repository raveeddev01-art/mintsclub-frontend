import React, { useState, FC } from 'react';
import { useHistory } from 'react-router';
import ImageLoader from '../ContentLoader/HeroLoader';
import { connect } from 'react-redux';
import { CHAINS_INTERFACE, HeroCardInt } from '../../interfaces/components';
import { ReactComponent as AudioIcon } from '../../assets/images/audio-icon.svg';
import useVideoPlayer from '../TestVideoCard/Components/UseVideoPlayer';
import './HeroCards.scss';
import {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
} from '../../utils/helpers/helpers';
import nftdetail from '../../pages/nft-detail/nftdetail';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

const HeroCards: FC<HeroCardInt> = ({ data, connectedAddress, status }) => {
	const {
		nftImage,
		Totalbids,
		owner,
		username,
		_id,
		ownerAddress,
		nftId,
		compressedFile,
		blockchainType,
	} = data;
	const [loader, setLoader] = useState<boolean>(true);
	const history = useHistory();
	const videoElement = React.useRef(null);
	const { playerState, togglePlay } = useVideoPlayer(videoElement);
	return (
		<div className="hero-new-card">
			<div className="hero-img-container">
				{CHAIN_LOGOS && blockchainType && CHAIN_TITLE ? (
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
				<div style={{ display: `${loader ? 'block' : 'none'}` }}>
					<ImageLoader />
				</div>
				{data.fileType === 'video' ? (
					<>
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
						<video
							src={
								status === 'nfts'
									? data.img
									: compressedFile
									? compressedFile
									: nftImage
							}
							onEnded={() => {
								togglePlay();
							}}
							onCanPlay={() => {
								setLoader(false);
							}}
							ref={videoElement}
							style={{ display: `${!loader ? 'block' : 'none'}` }}
							onClick={() => history.push(`explore/nftdetail/${nftId}`)}
						/>
					</>
				) : data.fileType === 'audio' ? (
					<>
						<div className="auction-audio-icon">
							<AudioIcon />
						</div>
						<audio
							controls
							controlsList="nodownload noplaybackrate"
							style={{ display: `${!loader ? 'block' : 'none'}` }}
							onLoadedData={() => setLoader(false)}
						>
							<source
								src={
									status === 'nfts'
										? data.img
										: compressedFile
										? compressedFile
										: nftImage
								}
							/>
						</audio>
					</>
				) : (
					<img
						src={
							status === 'nfts'
								? data.img
								: compressedFile
								? compressedFile
								: nftImage
						}
						onLoad={() => setLoader(false)}
						alt="heroImg"
						style={{ display: `${!loader ? 'block' : 'none'}` }}
					/>
				)}
				{status !== 'nfts' && (
					<>
						<div className="hero-owner text-center">
							<p>
								Owned by:{' '}
								<span className="text-capitalize">
									{connectedAddress.toUpperCase() === ownerAddress.toUpperCase()
										? 'You'
										: data?.username
										? username
										: 'unnamed'}
								</span>
							</p>
						</div>
						<button
							className="hero-btn-bid cursor-pointer"
							onClick={() => history.push(`/explore/nftdetail/${nftId}`)}
						>
							View Detail
						</button>
					</>
				)}
			</div>
			<div className="hero-placed-bid text-center">
				{status !== 'nfts' ? (
					<h6>
						{data.Totalbids > 0
							? `${data.Totalbids} ${
									data.Totalbids >= 4 ? '+' : ''
							  } People Placed Bid`
							: 'No Bids Found'}
					</h6>
				) : (
					<h6>{"World's Famous NFTs "}</h6>
				)}
			</div>
		</div>
	);
};
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(HeroCards);
