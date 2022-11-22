import React, { useState, FC } from 'react';
import { useHistory } from 'react-router';
import ImageLoader from '../ContentLoader/HeroLoader';
import { connect } from 'react-redux';
import { HeroCardInt } from '../../interfaces/components';
import './HeroCards.scss';

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
	} = data;
	const [loader, setLoader] = useState<boolean>(true);
	const history = useHistory();
	return (
		<div className="hero-new-card">
			<div className="hero-img-container">
				<div style={{ display: `${loader ? 'block' : 'none'}` }}>
					<ImageLoader />
				</div>
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
