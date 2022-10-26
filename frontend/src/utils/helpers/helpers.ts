import polygonIcon from '../../assets/images/poligon.svg';
import ethereumIcon from '../../assets/images/ethereum2.svg';
import binance from '../../assets/images/about-binance.svg';
import algoran from '../../assets/images/about-algoran.svg';
import solana from '../../assets/images/about-solana.svg';
import { ENV } from '../../config/config';
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
	blockchainType?: string
) => {
	const blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		blockChainType === blockchainType
	) {
		return 'End Auction';
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

export {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
	verifyNFTStatus,
};
