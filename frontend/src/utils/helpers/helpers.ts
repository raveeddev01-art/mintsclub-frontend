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
	bsc: binance,
};

const CHAIN_TITLE = {
	ethereum: 'Ethereum',
	polygon: 'Polygon',
	binance: 'BSC',
	solana: 'Solana',
	algorand: 'Algorand',
	bsc: 'BSC',
};

const CHAIN_CURRENCY = {
	ethereum: 'ETH',
	polygon: 'MATIC',
	binance: 'BNB',
	solana: 'SOL',
	algorand: 'ALGO',
	bsc: 'BNB',
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
	status: any = undefined,
	bidCount: any = undefined
) => {
	const blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		blockChainType !== 'solana' &&
		bidCount?.length > 0
	) {
		return 'End Auction';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod &&
		auctionEnded === false &&
		blockChainType !== 'solana' &&
		bidCount?.length === 0
	) {
		return 'Cancel Listing';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod &&
		auctionEnded === false &&
		blockChainType === 'solana' &&
		bidCount?.length === 0 &&
		status !== 'reclaimNft'
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
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		status === 'reclaimNft' &&
		blockChainType === 'solana' &&
		activeAuction !== null
	) { 
		return 'Reclaim NFT';
	} else if (
		connectedAddress?.toUpperCase() === currentBidder?.toUpperCase() &&
		sellingMethod === 2 &&
		blockChainType === 'solana' &&
		bidStatus === 'claimable'
	) {
		return 'Claim Bid';
	}
	// else if (
	// 	ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
	// 	sellingMethod === 1 &&
	// 	auctionEnded === false &&
	// 	blockChainType === blockchainType
	// )
	//  {
	// 	return 'Resale';
	// }
	else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		blockChainType === blockchainType &&
		activeAuction === null
	) {
		return 'Sell';
	} else if (
		sellingMethod === 2 &&
		auctionEnded === false &&
		ownerAddress?.toUpperCase() !== connectedAddress?.toUpperCase() &&
		status === 'active'
	) {
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

const capitalize = (word: string) => {
	return word[0]?.toUpperCase() + word?.slice(1)?.toLowerCase();
};
const blockchainScanUrlData = (blockchainType: any, transactionHash: any) => {
	const chaintype = blockchainType;
	const scansURL: any = {
		ethereum: `${process.env.REACT_APP_ETH_CHAIN_SCAN}/${transactionHash}`,
		polygon: `${process.env.REACT_APP_POLYGON_CHAIN_SCAN}/${transactionHash}`,
		bsc: `${process.env.REACT_APP_BSC_CHAIN_SCAN}/${transactionHash}`,
		solana: `${process.env.REACT_APP_SOLANA_CHAIN_SCAN}/${transactionHash}?${process.env.REACT_APP_DEVNET}`,
		algorand: `${process.env.REACT_APP_ALGORAND_CHAIN_SCAN}/${transactionHash}`,
	};
	return scansURL[chaintype];
};
export {
	CHAIN_CURRENCY,
	CHAIN_LOGOS,
	CHAIN_TITLE,
	verifyOwner,
	verifyNFTStatus,
	handleFilesValidation,
	capitalize,
	blockchainScanUrlData,
};
