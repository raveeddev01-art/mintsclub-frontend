import Web3 from 'web3';
import { toast } from 'react-toastify';
import { ENV } from './../config/config';
import ethMintAbi from './abis/ethereum/mint.json';
import ethMarketPlaceContract from './abis/ethereum/marketPlace.json';
import polygonMintAbi from './abis/polygon/mint.json';
import polygonMarketPlaceContract from './abis/polygon/marketPlace.json';
import binanceMintAbi from './abis/binance/mint.json';
import binanceMarketPlaceContract from './abis/binance/marketPlace.json';
import typedDataV4 from './typeDatav4';
import batchMintAbi from './abis/batchMint-abi.json';
import { NETWORK_CONFIG } from './exportData';
const goerliMintingContract = ENV.goerliMintingContract;
const polygonMintingContract = ENV.polygonMintingContract;
const binanceMintingContract = ENV.bscMintingContract;

let requiredChainId = parseInt(process.env.REACT_APP_REQUIRED_CHAIN);

/////////////////////////////////////////////////////////////////////////////MintsClub market start /////////////////////////

export const getWeb3 = async () => {
	let instance;
	if (window.ethereum) {
		await window.ethereum.enable();
		instance = new Web3(window.ethereum);
	} else {
		instance = new Web3('http://localhost:7545');
	}

	return instance;
};

const getContractMethods = async (abiJson, contract) => {
	let web3 = await getWeb3();
	const contractM = new web3.eth.Contract(abiJson, contract);
	return contractM;
};
const getNetworkName = (chainId) => {
	let networks = {
		1: 'Ethereum Mainnet',
		4: 'Ethereum Rinkeyby',
		3: 'Ethereum Ropsten',
		42: 'Ethereum Kovan',
		5: 'ethereum',
		80001: 'polygon',
		97: 'bsc',
	};
	return networks[chainId];
};

export const getNetworkNameByChainId = async () => {
	if (window.ethereum) {
		let web3 = await getWeb3();
		let chainId = await web3.eth.getChainId();
		let currentNetwork = getNetworkName(chainId);
		return currentNetwork;
	}
};
export const getChainId = async () => {
	if (window.ethereum) {
		let web3 = await getWeb3();
		let chainId = await web3.eth.getChainId();
		return chainId;
	}
};

export const validateNetwork = async () => {
	let prevNetwork = await getNetworkNameByChainId();

	if (prevNetwork === 'Ethereum Goerli') {
		return true;
	} else {
		return false;
	}
};
export const getBalance = async () => {
	let web3 = await getWeb3();
	let address = await getWalletAddress();
	let balance = await web3.eth.getBalance(address);
	let ethBalance = web3.utils.fromWei(balance, 'ether');

	return ethBalance;
};
const getMintContractInfo = () => {
	let abi = null;
	let contractAddress = null;
	let blockchainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	if (blockchainType === 'ethereum') {
		contractAddress = ENV.goerliMintingContract;
		abi = ethMintAbi;
	} else if (blockchainType === 'polygon') {
		contractAddress = ENV.polygonMintingContract;
		abi = polygonMintAbi;
	} else if (blockchainType === 'bsc') {
		contractAddress = ENV.bscMintingContract;
		abi = binanceMintAbi;
	} else {
		return toast.error('wrong network');
	}
	return { abi, contractAddress };
};

const getMarketPlaceContractInfo = () => {
	let abi = null;
	let contractAddress = null;
	let blockchainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	let NFTAdddress = null;
	if (blockchainType === 'ethereum') {
		contractAddress = ENV.goerliMarketPlaceContract;
		abi = ethMarketPlaceContract;
		NFTAdddress = goerliMintingContract;
	} else if (blockchainType === 'polygon') {
		contractAddress = ENV.polygonMarketPlaceContract;
		abi = polygonMarketPlaceContract;
		NFTAdddress = polygonMintingContract;
	} else if (blockchainType === 'bsc') {
		contractAddress = ENV.bscMarketPlaceContract;
		abi = binanceMarketPlaceContract;
		NFTAdddress = binanceMintingContract;
	} else {
		return toast.error('wrong network');
	}
	return { abi, contractAddress, NFTAdddress };
};
const getLatestTokenId = async (methods) => {
	const id = await methods.LatestTokenId().call();
	return +id + 1;
};

export const checkIsApprovedForAll = async (walletAddress) => {
	try {
		const web3 = await getWeb3();
		if (!web3) {
			toast.error('No web3 instance found');
			return false;
		}

		const { abi, contractAddress } = getMintContractInfo();
		const { contractAddress: marketplaceContractAddress } =
			getMarketPlaceContractInfo();
		let connectedAddress = await connectMetamask();
		const contract = await getContractMethods(abi, contractAddress);

		const isApproved = await contract.methods
			.isApprovedForAll(walletAddress, marketplaceContractAddress)
			.call({ from: connectedAddress });

		return isApproved;
	} catch (err) {
		console.log(err, 'error in mintNFT');
		toast.error(err.message);
		throw err;
	}
};

export const mintNFt = async (
	metaData,
	amount,
	collectionAddress = undefined
) => {
	let web3 = await getWeb3();
	if (!web3) {
		toast.error('No web3 instance found');
		return false;
	}
	const nftAmount = Number(amount);
	const { abi, contractAddress } = getMintContractInfo();

	try {
		let connectedAddress = await connectMetamask();
		let contractM = undefined;

		contractM = await getContractMethods(
			abi,
			collectionAddress ? collectionAddress : contractAddress
		);

		const id = await getLatestTokenId(contractM.methods);

		await contractM.methods
			.mint(connectedAddress, +id, nftAmount, metaData, 150)
			.send({ from: connectedAddress });
		return id;
	} catch (err) {
		console.log(err, 'error in mintNFT');
		toast.error(err.message);
		throw new Error(err);
	}
};

export const lazyMint = async (
	tokenId,
	copies,
	ownerAddress,
	metaData,
	price,
	collectionAddress = undefined,
	setTransactionHash,
	setConfirmed,
	royalityFee
) => {
	let web3 = await getWeb3();
	if (!web3) {
		toast.error('No web3 instance found');
		return false;
	}

	const { abi, contractAddress } = getMintContractInfo();
	const priceToMint = Number(BigInt(Web3.utils.toWei(`${price}`, 'ether')));

	try {
		let connectedAddress = await connectMetamask();

		const contractM = await getContractMethods(
			abi,
			collectionAddress ? collectionAddress : contractAddress
		);
		const latestTokenId = await getLatestTokenId(contractM.methods);

		let result = await contractM.methods
			.Lazymint(
				connectedAddress,
				latestTokenId,
				+copies,
				ownerAddress,
				metaData,
				royalityFee
			)
			.send({ from: connectedAddress, value: priceToMint })
			.on('transactionHash', function (hash) {
				setTransactionHash(hash);
				setConfirmed(true);
			});
		return latestTokenId;
	} catch (err) {
		setConfirmed(false);
		console.log(err, 'error in mintNFT');
		toast.error(err.message);
		throw new Error(err);
	}
};

export const editNFTUri = async (tokenId, metaData, collectionAddress) => {
	try {
		let web3 = await getWeb3();
		if (!web3) {
			toast.error('No web3 instance found');
			return false;
		}
		const { abi, contractAddress } = getMintContractInfo();
		const contractM = await getContractMethods(
			abi,
			collectionAddress ? collectionAddress : contractAddress
		);
		let connectedAddress = await connectMetamask();
		let result = await contractM.methods
			.EditNFTUri(+tokenId, metaData)
			.send({ from: connectedAddress });
		return result;
	} catch (err) {
		console.log(err, 'error while updating token uri');
		throw new Error(err.message);
	}
};

export const openNFTForBidding = async (
	biddingStartTime,
	biddingEndTime,
	tokenId,
	copies,
	initialPrice,
	collectionAddress = null
) => {
	try {
		const { abi, contractAddress, NFTAdddress } = getMarketPlaceContractInfo();
		let web3 = await getWeb3();
		let connectedAddress = await connectMetamask();
		const contractM = await getContractMethods(abi, contractAddress);
		let id = Number(tokenId);
		const intPrice = web3.utils.toWei(`${initialPrice}`, 'ether');

		// const intPrice=web3.utils.toHex(web3.utils.toWei(`${initialPrice}`, "ether"))
		const result = await contractM.methods
			.listItemForAuction(
				web3.utils.toBN(intPrice),
				biddingStartTime,
				biddingEndTime,
				id,
				+copies,
				collectionAddress ? collectionAddress : NFTAdddress
			)
			.send({ from: connectedAddress });

		let sellId = await Number(
			result.events.AuctionStart.returnValues._auctionid
		);
		return sellId;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const placeABid = async (amount, tokenId) => {
	try {
		const { abi, contractAddress } = getMarketPlaceContractInfo();

		let connectedAddress = await connectMetamask();
		const contractM = await getContractMethods(abi, contractAddress);
		const bidAmount = Number(BigInt(Web3.utils.toWei(`${amount}`, 'ether')));
		let id = Number(tokenId);
		let web3 = await getWeb3();

		const result = await contractM.methods.bid(id).send({
			from: connectedAddress,
			value: bidAmount,
		});

		if (result) {
			return result;
		}
	} catch (err) {
		console.log(err, 'error');
		if (err?.message) {
			toast.error(err.message);
		} else {
			toast.error('Transaction Failed ,Please check wallet history');
		}
		throw new Error(err);
	}
};

export const putonsale = async (
	tokenId,
	amount,
	price,
	collectionAddress = null
) => {
	try {
		const { abi, contractAddress, NFTAdddress } = getMarketPlaceContractInfo();

		let connectedAddress = await connectMetamask();
		const contractM = await getContractMethods(abi, contractAddress);
		let weiAmount = BigInt(Web3.utils.toWei(`${price}`, 'ether'));
		let web3 = await getWeb3();
		let id = Number(tokenId);
		const result = await contractM.methods
			.listItemForFixedPrice(
				id,
				+amount,
				weiAmount,
				// 150,
				collectionAddress ? collectionAddress : NFTAdddress
				// connectedAddress
			)
			.send({
				from: connectedAddress,
			});
		let sellId = Number(result.events.OfferSale.returnValues._fixeditemid);
		return sellId;
	} catch (err) {
		console.log(err, 'error=======');
		throw new Error(err.message);
	}
};

export const BuyFixedPriceNFT = async (
	amount,
	tokenId,
	setConfirmed,
	setTransactionHash
) => {
	setConfirmed('pending');
	try {
		const { abi, contractAddress } = getMarketPlaceContractInfo();

		let connectedAddress = await connectMetamask();
		const contractM = await getContractMethods(abi, contractAddress);

		const weiAmount = Number(BigInt(Web3.utils.toWei(`${amount}`, 'ether')));

		const result = await contractM.methods
			.BuyFixedPriceItem(tokenId)
			.send({ from: connectedAddress, value: weiAmount })
			.on('transactionHash', function (hash) {
				setTransactionHash(hash);
				setConfirmed(true);
			});

		if (result) {
			return result;
		}
	} catch (err) {
		setConfirmed(false);
		console.log(err);

		throw new Error(err);
	}
};
export const setApprovalForAll = async (
	setApprovalStatus,
	collectionAddress = null,
	setIsButtonDisabled
) => {
	try {
		let abi = null;
		let contractAddress = null;
		let contractToApprove = null;
		let blockchainType = ENV.getUserKeys('blockchainType')?.blockchainType;
		if (blockchainType === 'ethereum') {
			contractAddress = ENV.goerliMintingContract;
			contractToApprove = ENV.goerliMarketPlaceContract;
			abi = ethMintAbi;
		} else if (blockchainType === 'polygon') {
			contractAddress = ENV.polygonMintingContract;
			contractToApprove = ENV.polygonMarketPlaceContract;

			abi = polygonMintAbi;
		} else if (blockchainType === 'bsc') {
			contractAddress = ENV.bscMintingContract;
			contractToApprove = ENV.bscMarketPlaceContract;

			abi = binanceMintAbi;
		} else {
			return toast.error('wrong network');
		}
		const connectedAddress = await connectMetamask();
		const contractM = await getContractMethods(
			abi,
			collectionAddress ? collectionAddress : contractAddress
		);

		const result = await contractM.methods
			.setApprovalForAll(contractToApprove, true)
			.send({
				from: connectedAddress,
			})
			.on('transactionHash', function (hash) {
				// setTransactionHash(hash);
				setApprovalStatus('in-progress');
				setIsButtonDisabled(false);
			});
		if (result) {
			return result;
		}
	} catch (err) {
		toast.error(err.message);
		setIsButtonDisabled(false);
		throw new Error(err);
	}
};

export const claimNFTfromContract = async (tokenId) => {
	try {
		const { abi, contractAddress } = getMarketPlaceContractInfo();

		let web3 = await getWeb3();
		let connectedAddress = await getMetamaskConnectedAddress();
		const contractM = await getContractMethods(abi, contractAddress);
		const result = contractM.methods.claimNFT(tokenId).send({
			from: connectedAddress,
			gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
		});
		if (result) {
			return result;
		}
	} catch (err) {
		// console.log(err, "error");
		throw new Error(err);
	}
};
export const endAuctionFromContract = async (tokenId) => {
	try {
		const { abi, contractAddress } = getMarketPlaceContractInfo();

		let web3 = await getWeb3();
		let connectedAddress = await getMetamaskConnectedAddress();
		const contractM = await getContractMethods(abi, contractAddress);
		const result = contractM.methods.auctionEnd(tokenId).send({
			from: connectedAddress,
			// gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
		});
		if (result) {
			return result;
		}
	} catch (err) {
		// console.log(err, "error");
		throw new Error(err);
	}
};

export const getMetamaskConnectedAddress = async () => {
	let web3 = await getWeb3();
	let accounts = await web3.eth.getAccounts();
	return accounts[0];
};

// export const acceptOffer= async (amount,tokenId)=>{
//   try{

//     let connectedAddress = await connectMetamask();
//       const contractM = await getContractMethods();
//       let weiAmount = Number(amount) * 1000000000000000000;
//       let id=Number(tokenId)
//       const result = await contractM.methods
//       .BuyFixedPriceNFT(id,weiAmount)
//       .send({ from: connectedAddress});
//       if(result){
//         return result
//       }
//   }catch(err){
//     throw new Error(err);
//   }
// }

export const getCurrentAddress = async (wallet) => {
	if (wallet?.connected) {
		return wallet.publicKey.toBase58();
	}
	let web3 = await getWeb3();
	let accounts = await web3.eth.getAccounts();
	let address = accounts[0];
	return address;
};

export const handleSign = async (nounce, setIsButtonDisabled) => {
	const web3 = new Web3(Web3.givenProvider);
	const publicAddress = await connectMetamask();
	return new Promise((resolve, reject) =>
		web3.eth.personal.sign(
			web3.utils.fromUtf8(`I am signing my one-time nonce: ${nounce}`),
			publicAddress?.toLowerCase(),
			(err, signature) => {
				setIsButtonDisabled(false);
				if (err) return reject(err);
				return resolve({ publicAddress, signature });
			}
		)
	);
};

export const createVoucher = async (tokenId, amount, uri, price) => {
	let data = { ...typedDataV4 };
	data.message.tokenId = tokenId;
	data.message.amount = amount;
	data.message.uri = uri;
	data.message.minPrice = price;

	const publicAddress = await connectMetamask();
	return new Promise((resolve, reject) => {
		const web3 = new Web3(Web3.givenProvider);
		try {
			web3.currentProvider.sendAsync(
				{
					method: 'eth_signTypedData_v4',
					params: [publicAddress, JSON.stringify(data)],
					from: publicAddress,
				},
				function (err, result) {
					if (err) {
						resolve({ success: false, data: err });
					}
					resolve({ success: true, data: result.result });
				}
			);
		} catch (err) {
			resolve({ success: false, data: err });
		}
	});
};

export const redeemVoucher = async (
	voucher,
	setTransactionHash,
	setConfirmed
) => {
	const { tokenId, uri, minPrice, copies, signature } = voucher;
	let web3 = await getWeb3();
	const publicAddress = await connectMetamask();
	// BigInt(Web3.utils.toWei(`${minPrice}`, "ether"))
	try {
		const contractM = new web3.eth.Contract(
			batchMintAbi,
			// "0x3EB384f3BbF38be551a00b4e5549Eb1eF4C883A8" //ERC-721 WORKING
			ENV.batchMintLazyContract
		);
		let result = await contractM.methods
			.redeem(publicAddress, {
				tokenId,
				uri,
				minPrice: Web3.utils.toWei(`${minPrice}`, 'ether'),
				amount: copies,
				signature,
			})
			.send({
				from: publicAddress,
				value: Web3.utils.toWei(`${minPrice}`, 'ether'),
			})
			.on('transactionHash', function (hash) {
				setTransactionHash(hash);
				setConfirmed(true);
			});
		return result;
	} catch (err) {
		console.log(err, 'error');
		setConfirmed(false);
		throw new Error(err);
	}
};

//////////////////////////////////////////////////////////////////////////////////ariswap functions start///////////////////////////

export const connectMetamaskCopy = async (address) => {
	if (window.ethereum) {
		let web3 = await getWeb3();
		let accounts = await web3.eth.getAccounts();
		let chainId = await web3.eth.getChainId();

		let currentNetwork = getNetworkName(chainId);
		if (!currentNetwork) {
			// toast.error("Please Connect your metamask with Ethereum Network");
			return false;
		}
		if (chainId !== requiredChainId) {
			// empty block statement
		}

		if (accounts[0]) {
			if (accounts[0] === address) {
				toast.success('wallet is already connected');
			} else {
				// toast.success("wallet connected");
			}

			return accounts[0];
		} else {
			let address = await signRequest();

			// toast.success("wallet connected");
			return address[0];
		}
	} else {
		toast.error('This app requires metamask,Please Install Metamask ');
	}
};
export const getWalletAddress = async () => {
	let web3 = await getWeb3();

	let accounts = await web3.eth.getAccounts();
	return accounts[0];
};
export const connectMetamask = async () => {
	if (window.ethereum) {
		let web3 = await getWeb3();
		let accounts = await web3.eth.getAccounts();
		if (accounts?.length === 0) {
			await connectMetamask();
		}
		let chainId = await web3.eth.getChainId();
		if (chainId !== requiredChainId) {
			// empty block statement
		}
		return accounts[0];
	} else {
		toast.error('Please install metamask to connect to the Marketplace');
	}
};
export const connectWithMetamask = async () => {
	try {
		let web3 = await getWeb3();
		await window.ethereum.request({
			method: 'wallet_requestPermissions',
			params: [
				{
					eth_accounts: {},
				},
			],
		});
		let accounts = await web3.eth.getAccounts();
		return accounts[0];
	} catch (err) {
		toast.error(err.message);
	}
};
const addNetworkAutomatically = async (id, setIsButtonDisabled) => {
	setIsButtonDisabled(false);
	return await window.ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [NETWORK_CONFIG[id]],
	});
};
export const switchNetworkToChainId = async (id, setIsButtonDisabled) => {
	if (window.ethereum) {
		try {
			let web3 = await getWeb3();
			await web3.currentProvider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: Web3.utils.toHex(id) }],
			});
			setIsButtonDisabled(false);
			let accounts = await web3.eth.getAccounts();
			return accounts[0];
		} catch (err) {
			if (err.code === 4902) {
				try {
					await addNetworkAutomatically(id, setIsButtonDisabled);
					return true;
				} catch (err) {
					setIsButtonDisabled(false);
					return false;
				}
			}
			setIsButtonDisabled(false);
		}
	}
};
export const signRequest = async () => {
	if (window.ethereum) {
		let web3 = await getWeb3();

		let accounts = await web3.eth.getAccounts();
		let address = accounts[0];
		let signature = await handleSignMessage(address);
		return signature;
	} else {
		alert('Please install metamask to connect to the Marketplace');
	}
};

const handleSignMessage = (address) => {
	return new Promise((resolve, reject) => {
		try {
			const web3 = new Web3(Web3.givenProvider);
			web3.eth.personal.sign(
				web3.utils.fromUtf8(
					`${ENV.appName} uses this cryptographic signature in place of a password, verifying that you are the owner of this address.`
				),
				address,
				(err, signature) => {
					if (err) return reject(err);
					return resolve(signature);
				}
			);
		} catch (e) {
			// console.log(e);
		}
	});
};

export const deployCollectionContract = async (bytecode) => {
	// eslint-disable-next-line no-async-promise-executor
	const { abi } = getMintContractInfo();
	const address = await connectMetamask();
	const web3 = new Web3(Web3.givenProvider);
	let contract = await new web3.eth.Contract(abi, null, {
		data: bytecode,
		from: address,
	});
	return new Promise((resolve, reject) => {
		try {
			contract
				.deploy({
					data: bytecode,
					arguments: ['test'],
				})
				.send({
					from: address,
				})
				.then((contractInstance) => {
					toast.success('Contract Deployed Successfully!');
					const contractData = {
						contractadd: contractInstance.options.address,
						Network: 'Ethereum',
						Deployed: true,
					};
					return resolve(contractData);
				})
				.catch((err) => {
					reject(err);
				});
		} catch (err) {
			console.log('error', err);
			throw new Error(err);
		}
	});
};

export const cancelNFTListing = async (
	listingId,
	sellingMethod,
	setLoader,
	setIsButtonDisabled
) => {
	try {
		const { abi, contractAddress } = getMarketPlaceContractInfo();

		let web3 = await getWeb3();
		let connectedAddress = await getMetamaskConnectedAddress();
		const contractM = await getContractMethods(abi, contractAddress);
		let result;
		toast.warning("Please don't refresh/switch page during transaction.", {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: 'light',
			closeButton: false,
		});
		if (sellingMethod === 2) {
			result = await contractM.methods.cancelAuction(listingId).send({
				from: connectedAddress,
			});
			setIsButtonDisabled(false);
		} else {
			result = await contractM.methods
				.cancellListingForFixedPRice(listingId)
				.send({
					from: connectedAddress,
				});
			setIsButtonDisabled(false);
		}
		if (result) {
			return result;
		}
	} catch (err) {
		setLoader(false);
		setIsButtonDisabled(false);
		throw new Error(err.message);
	}
};
