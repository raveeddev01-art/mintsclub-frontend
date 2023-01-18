import polygonIcon from '../../assets/images/poligon.svg';
import ethereumIcon from '../../assets/images/ethereum2.svg';
import binance from '../../assets/images/about-binance.svg';
import algoran from '../../assets/images/about-algoran.svg';
import solana from '../../assets/images/about-solana.svg';
import { ENV } from '../../config/config';
import { formatBytes } from '../functions';
import { STATUS_TYPE } from '../../interfaces/allnfts/types';
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
		blockChainType !== 'algorand' &&
		bidCount?.length > 0
	) {
		return 'End Auction';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		status === 'claimNft' &&
		blockChainType === 'algorand' &&
		activeAuction &&
		bidCount?.length > 0
	) {
		return 'Close Auction';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod &&
		auctionEnded === false &&
		blockChainType !== 'solana' &&
		blockChainType !== 'algorand' &&
		bidCount?.length === 0
	) {
		return 'Cancel Listing';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod &&
		auctionEnded === false &&
		(blockChainType === 'solana' || blockChainType === 'algorand') &&
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
		activeAuction
	) {
		return 'Claim NFT';
	} else if (
		ownerAddress?.toUpperCase() === connectedAddress?.toUpperCase() &&
		sellingMethod === 2 &&
		auctionEnded === false &&
		status === 'reclaimNft' &&
		(blockChainType === 'solana' || blockChainType === 'algorand') &&
		activeAuction
	) {
		return 'Cancel Listing';
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
		!activeAuction
	) {
		return 'Sell';
	} else if (
		sellingMethod === 2 &&
		auctionEnded === false &&
		ownerAddress?.toUpperCase() !== connectedAddress?.toUpperCase() &&
		status === 'active'
	) {
		return 'Place A Bid';
	} else if (
		sellingMethod === 1 &&
		auctionEnded === false &&
		ownerAddress?.toUpperCase() !== connectedAddress?.toUpperCase()
	) {
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

const capitalize = (words: string, caps: boolean) => {
	if (!caps) {
		return words;
	}
	return words
		.split(' ')
		.map((word) =>
			[
				word[0]?.toUpperCase(),
				...word.slice(1, word.length).toLowerCase(),
			]?.join('')
		)
		.join(' ');
};
const handleRemove = (i: number, status: string, nft: any, handlers: any) => {
	const newFormValues = [...nft[status]];
	newFormValues.splice(i, 1);
	const newNFTValues = [...nft[status]];
	newNFTValues.splice(i, 1);
	const nftUpdate = { ...nft, [status]: newNFTValues };
	handlers.handleModalsRemove(status, newFormValues, nftUpdate);
};
const blockchainScanUrlData = (blockchainType: any, transactionHash: any) => {
	const chaintype = blockchainType;
	const scansURL: any = {
		ethereum: `${process.env.REACT_APP_ETH_CHAIN_SCAN}/${transactionHash}`,
		polygon: `${process.env.REACT_APP_POLYGON_CHAIN_SCAN}/${transactionHash}`,
		bsc: `${process.env.REACT_APP_BSC_CHAIN_SCAN}/${transactionHash}`,
		solana: `${process.env.REACT_APP_SOLANA_CHAIN_SCAN}/${transactionHash}?'cluster=${process.env.REACT_APP_SOLANA_CLUSTER}`,
		algorand: `${process.env.REACT_APP_ALGORAND_CHAIN_SCAN}/${transactionHash}`,
	};
	return scansURL[chaintype];
};
const mintingAdressURL = (blockchainType: any) => {
	const chaintype = blockchainType;
	const mintAddress: any = {
		ethereum: `${process.env.REACT_APP_ETH_CHAIN_ADDRESS}/${process.env.REACT_APP_MintsClub_MINT_CONTRACT_ADDRESS}`,
		polygon: `${process.env.REACT_APP_POLYGON_CHAIN_ADDRESS}/${process.env.REACT_APP_MintsClub_MINT_POLYGON_CONTRACT_ADDRESS}`,
		bsc: `${process.env.REACT_APP_BSC_CHAIN_ADDRESS}/${process.env.REACT_APP_MintsClub_MINT_BSC_CONTRACT_ADDRESS}`,
	};
	return mintAddress[chaintype];
};
const mintingContractAddress = (blockchainType: any) => {
	const chaintype = blockchainType;
	const value: any = {
		ethereum: process.env.REACT_APP_MintsClub_MINT_CONTRACT_ADDRESS,
		polygon: process.env.REACT_APP_MintsClub_MINT_POLYGON_CONTRACT_ADDRESS,
		bsc: process.env.REACT_APP_MintsClub_MINT_BSC_CONTRACT_ADDRESS,
	};
	return value[chaintype];
};
const getSpecialCharacterReplaced = (str: string) => {
	if (str?.includes('#')) {
		return str?.replace('#', '%23');
	}
	return str;
};
const convertToExponential = (value: number) => {
	if (value?.toString().includes('.')) {
		return value.toExponential(2);
	} else {
		return value;
	}
};

const STATUS_COLOR: STATUS_TYPE = {
	completed: '#56f000',
	pending: '#a4abb6',
	processing: '#ffb301',
	failed: '#ff3839',
};

const STATUS_TEXT: STATUS_TYPE = {
	completed: 'Completed',
	pending: 'Pending',
	processing: 'Processing',
	failed: 'Failed',
};

const reduceString = (text: string, size: number) => {
	if (text.length > size) {
		return `${text.slice(0, size)}...`;
	}
	return text;
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
	handleRemove,
	getSpecialCharacterReplaced,
	convertToExponential,
	STATUS_COLOR,
	STATUS_TEXT,
	mintingAdressURL,
	mintingContractAddress,
	reduceString,
};
