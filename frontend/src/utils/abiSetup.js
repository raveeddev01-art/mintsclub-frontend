import Web3 from 'web3';
import liveAuctionsAbi from './abis/ARISwapToken.json';
import { ENV } from '../config/config';
// const web3 = new Web3(
//   new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
// );

let web3Provider = window.ethereum;
let web3 = new Web3(web3Provider);
web3 = new Web3(Web3.givenProvider);
//it's the abi

let liveAuction = null;
try {
	liveAuction = new web3.eth.Contract(
		liveAuctionsAbi,
		'0xE400E3fb41B83a2f8161A8d6F34b7B3023441AF5'
	);
} catch (err) {
	// console.log(err,"error in abiSetup")
}

export { liveAuction };
