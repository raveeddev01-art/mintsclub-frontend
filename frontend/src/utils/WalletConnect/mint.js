import MINT_CONTRACT_ABI from '../abis/binance/mint.json';
// import BATCH_MINT_CONTRACT_ABI from '../abis/batchMint-abi.json';
// import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ENV } from '../../config/config';

const goerliMintingContract = ENV.goerliMintingContract;
const polygonMintingContract = ENV.polygonMintingContract;
const binanceMintingContract = ENV.bscMintingContract;

const COMMON_CONFIG = {
	polygon: {
		address: polygonMintingContract,
		abi: MINT_CONTRACT_ABI,
	},
	binance: {
		address: binanceMintingContract,
		abi: MINT_CONTRACT_ABI,
	},
	ethereum: {
		address: goerliMintingContract,
		abi: MINT_CONTRACT_ABI,
	},
};

const interactionConfig = (chain, functionName) => {
	return { ...COMMON_CONFIG[chain], functionName };
};

export default interactionConfig;
