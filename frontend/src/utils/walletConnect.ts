import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider,
} from '@web3modal/ethereum';

// import { Web3Modal } from '@web3modal/react';

import { configureChains, createClient, WagmiConfig } from 'wagmi';

import {
	mainnet,
	goerli,
	polygon,
	polygonMumbai,
	bscTestnet,
	bsc,
} from 'wagmi/chains';
import { ENV } from '../config/config';

// const chains = [arbitrum, mainnet, polygon, polygonMumbai,bscTestnet, bsc];

const testNetChains = [goerli, polygonMumbai, bscTestnet];
const mainnetChains = [mainnet, polygon, bsc];

const chains = ENV.networks === 'testnet' ? testNetChains : mainnetChains;
// Wagmi client
const { provider } = configureChains(chains, [
	walletConnectProvider({ projectId: ENV.walletConnectAppId }),
]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: modalConnectors({ appName: 'web3Modal', chains }),
	provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export { wagmiClient, ethereumClient };
