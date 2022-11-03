import polygonIcon from '../../assets/images/poligon.svg';
import ethereumIcon from '../../assets/images/ethereum2.svg';
import binance from '../../assets/images/about-binance.svg';
import algoran from '../../assets/images/about-algoran.svg';
import solana from '../../assets/images/about-solana.svg';
import { ENV } from '../../config/config';
import { formatBytes } from '../functions';
const CHAIN_LOGOS = {
	polygon: polygonIcon,
	ethereum: ethereumIcon,
	binance: binance,
	solana: solana,
	algorand: algoran,
};

const CHAIN_TITLE = {
	ethereum: 'Ethereum',
	polygon: 'Polygon',
	binance: 'BSC',
	solana: 'Solana',
	algorand: 'Algorand',
};

const CHAIN_CURRENCY = {
	ethereum: 'ETH',
	polygon: 'MATIC',
	binance: 'BNB',
	solana: 'SOL',
	algorand: 'ALGO',
};

const verifyOwner = (
	ownerAddress?: string,
	connectedAddress?: string,
	blockchainType?: string,
	username?: string
) => {
	if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		ENV.getUserKeys('blockchainType')?.blockchainType === blockchainType
	) {
		return 'you';
	} else if (username && username?.length > 19) {
		return username.substring(0, 19) + '...';
	} else if (username && username?.length <= 19) {
		return username;
	} else {
		return 'unnamed';
	}
};
const verifyNFTStatus = (
	ownerAddress?: string,
	connectedAddress?: string,
	sellingMethod?: number,
	auctionEnded?: boolean,
	blockchainType?: string,
	highestBidder: any = undefined,
	activeAuction: any = undefined,
	currentBidder: any = undefined,
	bidStatus: any = undefined,
	status: any = undefined
) => {
	const blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		blockChainType !== 'solana'
	) {
		return 'End Auction';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		blockChainType === 'solana'
	) {
		return 'Cancel Listing';
	} else if (
		highestBidder?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		status === 'claimNft' &&
		blockChainType === 'solana' &&
		activeAuction !== null
	) {
		return 'Claim NFT';
	} else if (
		connectedAddress?.toUpperCase() === currentBidder?.toUpperCase() &&
		sellingMethod === 2 &&
		blockChainType === 'solana' &&
		bidStatus === 'claimable'
	) {
		return 'Claim Bid';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 1 &&
		auctionEnded === false &&
		blockChainType === blockchainType
	) {
		return 'Resale';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		blockChainType === blockchainType
	) {
		return 'Sell';
	} else if (sellingMethod === 2 && auctionEnded === false) {
		return 'Place A Bid';
	} else if (sellingMethod === 1 && auctionEnded === false) {
		return 'Buy Now';
	} else {
		return 'invalid detail';
	}
};

const handleFilesValidation = (
	e: {
		dataTransfer: { files: { type: string }[] };
		target: { files: { type: string }[] };
	},
	status: string
) => {
	let files: any;
	let type: any;
	if (status === 'onDrag') {
		files = e.dataTransfer.files[0];
		type = e.dataTransfer.files[0].type;
	} else {
		files = e.target.files[0];
		type = e.target.files[0].type;
	}
	if (files) {
		if (
			type === 'image/jpeg' ||
			type === 'image/png' ||
			type === 'image/gif' ||
			type === 'video/mp4' ||
			type === 'audio/mpeg' ||
			type === 'image/webp'
		) {
			const fileSize = formatBytes(files.size).split(' ');
			if (
				(+fileSize[0] > 100 && fileSize[1] === 'MB') ||
				fileSize[1] === 'GB'
			) {
				return 'File size limit is exceeded';
			} else {
				return 'file matched';
			}
		} else {
			return 'File not supported!';
		}
	}
};

export {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
	verifyNFTStatus,
	handleFilesValidation,
};
