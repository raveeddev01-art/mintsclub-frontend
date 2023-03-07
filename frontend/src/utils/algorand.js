import MyAlgoConnect from '@randlabs/myalgo-connect';
import { OnApplicationComplete } from 'algosdk';
import approval_program from './algorand/auctionContract/approval.teal';
import clear_program from './algorand/auctionContract/clear.teal';
import fixed_approval_program from './algorand/fixedPriceContract/approval.teal';
import fixed_clear_program from './algorand/fixedPriceContract/clear.teal';
import { lazyMint } from './web3';

const crypto = require('crypto-browserify');
const algosdk = require('algosdk');
const enc = new TextEncoder();
const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
const nobleEd25519 = require('@noble/ed25519');
const settings = {
	shouldSelectOneAccount: false,
	openManager: false,
};

const algodToken = { 'X-API-Key': '7zCiHvmx5B9FPCY7zuj5S5h4VBdBcAwn5A0BDwhd' };
const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
const algodPort = '';

let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export const connectWallet = async (setIsButtonDisabled) => {
	try {
		const accounts = await myAlgoConnect.connect(settings);
		const sk = await accounts.map((account) => account.sk);
		const address = accounts.map((account) => account.address);
		const name = accounts.map((account) => account.name);
		setIsButtonDisabled(false);
		// let account_mnemonic = algosdk.secretKeyToMnemonic(accounts[0].sk);
		return address;

		//   setaccountaddress(address);
		// let account_mnemonic = algosdk.secretKeyToMnemonic(nemonic.sk);
		// setnemonic(account_mnemonic);
	} catch (err) {
		setIsButtonDisabled(false);
		console.error(err);
	}
};
const checkAlgoBalance = async (accountaddress, errorMessage) => {
	let accountInfo = await algodClient.accountInformation(accountaddress).do();
	let err = undefined;
	if (errorMessage.includes('below min')) {
		const match = errorMessage.match(/balance\s(\d+)\sbelow\smin\s(\d+)/);
		let minBalance = accountInfo.amount + parseInt(match[2]);
		minBalance = await algosdk.microalgosToAlgos(minBalance);
		err = `Insufficeint funds.Minimum balance for this transaction should be atleast ${minBalance} ALGOs`;
	} else {
		err = errorMessage;
	}
	const data = { amount: accountInfo?.amount, err };
	return data;
};
const getAlgoBalance = async (accountaddress) => {
	let accountInfo = await algodClient.accountInformation(accountaddress).do();
	return accountInfo;
};

const sendAmount = async (accountaddress, to_address, amount) => {
	const params = await algodClient.getTransactionParams().do();
	const note = enc.encode('Amount is being sent');

	const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
		suggestedParams: {
			...params,
		},
		from: accountaddress.toString(),
		to: to_address,
		amount,
		note: note,
	});

	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

	const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
};

///////////////////////////////////algo sdk code ////////////
// const fs = require('fs').promises
// see ASA param conventions here: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md
// for JavaScript SDK doc see: https://algorand.github.io/js-algorand-sdk/

const keypress = async () => {
	process.stdin.setRawMode(true);
	return new Promise((resolve) =>
		process.stdin.once('data', () => {
			process.stdin.setRawMode(false);
			resolve();
		})
	);
};
// createAccount
// once created sucessfully, you will need to add funds
// The Algorand TestNet Dispenser is located here:
// https://dispenser.testnet.aws.algodev.network/
async function createAsset(algodClient, inputFields) {
	try {
		const { assetName, total, metaData, connectedAddress } = inputFields;
		const params = await algodClient.getTransactionParams().do();
		const decimals = 0;
		const defaultFrozen = false;

		const unitName = assetName.substring(0, 6);

		const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
			assetName: assetName,
			assetURL: metaData.metaDataUrl,
			decimals: decimals,
			defaultFrozen: defaultFrozen,
			from: connectedAddress.toString(),
			suggestedParams: params,
			total: 1,
			unitName: unitName,
			manager: connectedAddress.toString(),
			freeze: connectedAddress.toString(),
			clawback: connectedAddress.toString(),
		});
		const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

		const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
		let nftID = null;
		// wait for transaction to be confirmed
		const confirmedTxn = await algosdk.waitForConfirmation(
			algodClient,
			tx.txId,
			4
		);
		//Get the completed Transaction
		nftID = confirmedTxn['asset-index'];
		const data = { success: true, nftID };

		return { data };
	} catch (err) {
		return err;
	}
}

async function createNFT(inputFields) {
	try {
		// CREATE ASSET
		const response = await createAsset(algodClient, inputFields);
		return response;
	} catch (err) {
		console.log('🚀 ~ file: algorand.js:147 ~ createNFT ~ err', err.message);
	}
}

const compileProgram = async (client, programSource) => {
	let encoder = new TextEncoder();
	let programBytes = encoder.encode(programSource);
	let compileResponse = await client.compile(programBytes).do();
	let compiledBytes = new Uint8Array(
		Buffer.from(compileResponse.result, 'base64')
	);

	return compiledBytes;
};

async function signMessageFromUserForAlgorand(nounce, accountaddress) {
	const data = enc.encode(`I am signing my one-time nonce: ${nounce}`);
	const sig = await myAlgoConnect.signBytes(data, accountaddress);
	return { publicAddress: accountaddress, signature: sig };
}

const createAuctionApp = async (
	startTime,
	endTime,
	nftID,
	copies,
	connectedAddress,
	royaltyAddress,
	setIsLoading
) => {
	try {
		const platformFee = process.env.REACT_APP_ALGORAND_PLATFORM_FEE;
		const platformFeeAccount = process.env.REACT_APP_ALGORAND_ADMIN_ACCOUNT;
		let approvalProg = '';
		let clearProg = '';
		await fetch(approval_program)
			.then((r) => r.text())
			.then((text) => {
				approvalProg = text;
			});

		await fetch(clear_program)
			.then((r) => r.text())
			.then((text) => {
				clearProg = text;
			});

		const approval_teal = await compileProgram(algodClient, approvalProg);
		const clear_teal = await compileProgram(algodClient, clearProg);

		const reserve = 1000000;
		const minBidIncrement = 100000;
		const royaltyfee = 35;
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;
		const app_args = [
			algosdk.decodeAddress(connectedAddress.toString()).publicKey,
			algosdk.encodeUint64(nftID),
			algosdk.encodeUint64(startTime),
			algosdk.encodeUint64(endTime),
			algosdk.encodeUint64(reserve),
			algosdk.encodeUint64(minBidIncrement),
			algosdk.encodeUint64(royaltyfee),
			algosdk.decodeAddress(royaltyAddress.toString()).publicKey,
			algosdk.encodeUint64(parseInt(platformFee)),
			algosdk.decodeAddress(platformFeeAccount.toString()).publicKey,
		];

		const txn = await algosdk.makeApplicationCreateTxn(
			connectedAddress.toString(),
			params,
			OnApplicationComplete.NoOpOC,
			approval_teal,
			clear_teal,
			0,
			0,
			9,
			4,
			app_args
		);
		const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

		let appID = null;
		const confirmedTxn = await algosdk.waitForConfirmation(
			algodClient,
			response.txId,
			4
		);
		appID = confirmedTxn['application-index'];
		// App transaction will remain same
		const result = await setupAuctionApp(
			appID,
			nftID,
			connectedAddress,
			copies,
			setIsLoading
		);
		if (result?.success) {
			const data = { appId: appID, globalState: result?.global_state };
			return data;
		}
		return result;
	} catch (err) {
		setIsLoading(false);
		console.log('🚀 ~ file: algorand.js ~ line 339 ~ err', err.message);
		return err;
	}
};
const setupAuctionApp = async (
	appid,
	nftID,
	accountaddress,
	copies,
	setIsLoading
) => {
	try {
		const app_address = algosdk.getApplicationAddress(appid);
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;
		const fundingAmount = 100000 + 100000 + 3 * 1000;

		const fundAppTxn =
			await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
				suggestedParams: {
					...params,
				},
				from: accountaddress.toString(),
				to: app_address,
				amount: fundingAmount,
			});

		const setupTxn = await algosdk.makeApplicationCallTxnFromObject({
			from: accountaddress.toString(),
			appIndex: appid,
			onComplete: OnApplicationComplete.NoOpOC,
			appArgs: [algosdk.encodeUint64(5)],
			foreignAssets: [nftID],
			suggestedParams: params,
		});

		const fundNftTxn =
			await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
				from: accountaddress.toString(),
				to: app_address,
				assetIndex: nftID,
				amount: copies,
				suggestedParams: params,
			});

		let txnsArray = [fundAppTxn, setupTxn, fundNftTxn];

		const groupID = algosdk.computeGroupID(txnsArray);
		for (let i = 0; i < txnsArray.length; i++) txnsArray[i].group = groupID;

		const signedTxns = await myAlgoConnect.signTransaction(
			txnsArray.map((txn) => txn.toByte())
		);
		let transactions = [];

		signedTxns.forEach((element) => transactions.push(element.blob));
		const sendGroupTransactions = await algodClient
			.sendRawTransaction(transactions)
			.do();
		if (sendGroupTransactions.txId) {
			const global_state = await getAppGlobalState(appid, accountaddress);
			const data = { success: true, global_state };
			return data;
		}
		return;
	} catch (err) {
		setIsLoading(false);
		console.log(
			'🚀 ~ file: algorand.js:322 ~ error while setting up app',
			err.message
		);
		return err;
	}
};

const getAppGlobalState = async (appid, accountaddress) => {
	const appinfo = await algodClient
		.accountApplicationInformation(accountaddress.toString(), appid)
		.do();
	const state = await decodeState(appinfo['created-app']['global-state']);
	return state;
};

const decodeState = async (stateArray) => {
	let state = {};
	stateArray.forEach((pair) => {
		let key = Buffer.from(pair['key'], 'base64');
		let value = pair['value'];
		let valueType = value['type'];

		if (valueType === 2) {
			value = value['uint'];
		} else if (valueType === 1) {
			value = Buffer.from(value['bytes'], 'base64');
		} else {
			console.log('Unexpected State Type: ', valueType);
		}

		state[key] = value;
	});

	return state;
};
function checkAddress(elem) {
	return elem;
}

const placeBidOnAlgorand = async (
	bid,
	bidder_address,
	ownerAddress,
	appid,
	nftID,
	global_state,
	setLoader
) => {
	try {
		const bidAmount = await algosdk.algosToMicroalgos(bid);
		const app_address = await algosdk.getApplicationAddress(appid);

		let prevBidLeader = undefined;

		if (global_state['bid_account']['data'].some(checkAddress)) {
			prevBidLeader = algosdk.encodeAddress(
				global_state['bid_account']['data']
			);
			prevBidLeader = [prevBidLeader];
		} else {
			prevBidLeader = [];
		}

		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const payTxn = await algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			from: bidder_address,
			to: app_address,
			amount: bidAmount,
			suggestedParams: params,
		});

		const appCallTxn = await algosdk.makeApplicationCallTxnFromObject({
			from: bidder_address,
			appIndex: appid,
			onComplete: OnApplicationComplete.NoOpOC,
			appArgs: [algosdk.encodeUint64(6)],
			foreignAssets: [nftID],
			accounts: prevBidLeader,
			suggestedParams: params,
		});

		const assetoptin =
			await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
				amount: 0,
				assetIndex: nftID,
				from: bidder_address,
				to: bidder_address,
				suggestedParams: {
					...params,
				},
			});
		let txnsArray = [payTxn, appCallTxn, assetoptin];

		const groupID = algosdk.computeGroupID(txnsArray);
		for (let i = 0; i < txnsArray.length; i++) txnsArray[i].group = groupID;

		const signedTxns = await myAlgoConnect.signTransaction(
			txnsArray.map((txn) => txn.toByte())
		);
		let transactions = [];

		signedTxns.forEach((element) => transactions.push(element.blob));
		const sendGroupTransactions = await algodClient
			.sendRawTransaction(transactions)
			.do();

		await sleep(15000);
		const new_global_state = await getAppGlobalState(appid, ownerAddress);
		if (sendGroupTransactions?.txId) {
			const data = { success: true, new_global_state };
			return data;
		}
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js:439 ~ error while algorand bidding',
			err.message
		);
		setLoader(false);
		return err;
	}
};

const closeAuction = async (
	appId,
	seller_address,
	nftID,
	appGlobalState,
	highestBidder
) => {
	try {
		let accounts = [];
		accounts.push(seller_address);
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		if (appGlobalState['bid_account']) {
			accounts.push(
				algosdk.encodeAddress(appGlobalState['bid_account']['data'])
			);
		}
		if (appGlobalState['royalty_address']) {
			accounts.push(
				algosdk.encodeAddress(appGlobalState['royalty_address']['data'])
			);
		}
		const platformFeeAccount = process.env.REACT_APP_ALGORAND_ADMIN_ACCOUNT;
		accounts.push(platformFeeAccount);

		const deleteTxn = await algosdk.makeApplicationDeleteTxnFromObject({
			from: seller_address,
			appIndex: appId,
			accounts: accounts,
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: {
				...params,
			},
		});

		const changeManager =
			await algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
				from: seller_address.toString(),
				assetIndex: nftID,
				manager: highestBidder,
				clawback: highestBidder,
				freeze: highestBidder,
				suggestedParams: params,
				strictEmptyAddressChecking: false,
			});

		const txnsArray = [deleteTxn, changeManager];

		const groupID = algosdk.computeGroupID(txnsArray);
		for (let i = 0; i < txnsArray.length; i++) txnsArray[i].group = groupID;

		const signedTxns = await myAlgoConnect.signTransaction(
			txnsArray.map((txn) => txn.toByte())
		);
		let transactions = [];

		signedTxns.forEach((element) => transactions.push(element.blob));
		const sendGroupTransactions = await algodClient
			.sendRawTransaction(transactions)
			.do();

		if (sendGroupTransactions?.txId) {
			const data = { success: true, tx: sendGroupTransactions?.txId };
			return data;
		}
		return;
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 579 ~ closeAuction ~ err',
			err.message
		);
		return err;
	}
};

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const createFixedPriceApp = async (
	nftID,
	royaltyaddress,
	connectedAddress,
	price,
	algoLazyMinted,
	setIsLoading
) => {
	try {
		const platformFee = process.env.REACT_APP_ALGORAND_PLATFORM_FEE;
		const platformFeeAccount = process.env.REACT_APP_ALGORAND_ADMIN_ACCOUNT;

		let approvalProg = '';
		let clearProg = '';
		await fetch(fixed_approval_program)
			.then((r) => r.text())
			.then((text) => {
				approvalProg = text;
			});

		await fetch(fixed_clear_program)
			.then((r) => r.text())
			.then((text) => {
				clearProg = text;
			});

		const approval_teal = await compileProgram(algodClient, approvalProg);
		const clear_teal = await compileProgram(algodClient, clearProg);
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const foreignAssets = [];
		foreignAssets.push(nftID);
		const waiting_time = 15;
		const royaltyfee = 35;

		const app_args = [
			algosdk.decodeAddress(connectedAddress.toString()).publicKey,
			algosdk.encodeUint64(nftID),
			algosdk.encodeUint64(royaltyfee),
			algosdk.encodeUint64(waiting_time),
			algosdk.decodeAddress(royaltyaddress.toString()).publicKey,
			algosdk.encodeUint64(parseInt(platformFee)),
			algosdk.decodeAddress(platformFeeAccount.toString()).publicKey,
		];

		const txn = await algosdk.makeApplicationCreateTxn(
			connectedAddress.toString(),
			params,
			OnApplicationComplete.NoOpOC,
			approval_teal,
			clear_teal,
			3,
			0,
			5,
			3,
			app_args,
			undefined,
			undefined,
			foreignAssets
		);

		const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
		setIsLoading(true);

		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
		setIsLoading(true);

		const confirmedTxn = await algosdk.waitForConfirmation(
			algodClient,
			response.txId,
			4
		);

		const appID = confirmedTxn['application-index'];
		const appAddr = algosdk.getApplicationAddress(appID);

		// Opt in
		const optin = await algosdk.makeApplicationOptInTxnFromObject({
			appIndex: appID,
			from: connectedAddress.toString(),
			suggestedParams: params,
		});

		const txnsArray = [optin];
		const result = await setupSale(
			price,
			appID,
			nftID,
			connectedAddress,
			txnsArray,
			algoLazyMinted,
			setIsLoading
		);
		if (result?.txId) {
			const data = { success: true, appID };
			return data;
		}
		return result;
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 645 ~ createFixedPriceApp ~ err',
			err.message
		);
		return err;
	}
};
const setupSale = async (
	price,
	appID,
	nftID,
	connectedAddress,
	txnsArray,
	algoLazyMinted,
	setIsLoading
) => {
	try {
		setIsLoading(true);
		let NFT_PRICE = await algosdk.algosToMicroalgos(price);

		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const appAddr = algosdk.getApplicationAddress(appID);

		//  Funding App
		const amount = 200000;
		const fundAppTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			suggestedParams: {
				...params,
			},
			from: connectedAddress.toString(),
			to: appAddr.toString(),
			amount: amount,
		});
		if (algoLazyMinted === true) {
			const amount = (NFT_PRICE / 100) * 3.5;

			NFT_PRICE = NFT_PRICE - amount;
		}
		const enc = new TextEncoder();
		const note = enc.encode('setupSale');

		const app_args = [note, algosdk.encodeUint64(NFT_PRICE)];

		// Setting Clawback Address
		const tx = await algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
			from: connectedAddress.toString(),
			assetIndex: nftID,
			clawback: appAddr,
			freeze: appAddr,
			suggestedParams: params,
			strictEmptyAddressChecking: false,
			manager: appAddr,
		});
		const setsale = algosdk.makeApplicationCallTxnFromObject({
			appIndex: appID,
			from: connectedAddress.toString(),
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: params,
			appArgs: app_args,
		});

		txnsArray.push(tx);
		txnsArray.push(setsale);
		txnsArray.push(fundAppTxn);
		const groupID = algosdk.computeGroupID(txnsArray);
		for (let i = 0; i < txnsArray.length; i++) txnsArray[i].group = groupID;

		const signedTxns = await myAlgoConnect.signTransaction(
			txnsArray.map((txn) => txn.toByte())
		);
		let transactions = [];

		signedTxns.forEach((element) => transactions.push(element.blob));
		const sendGroupTransactions = await algodClient
			.sendRawTransaction(transactions)
			.do();

		return sendGroupTransactions;
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 751 ~ setupSale ~ err',
			err.message
		);
		return err;
	}
};

const buyFixedPriceNFT = async (
	price,
	nftID,
	appIndex,
	connectedAddress,
	royaltyAddress,
	sellerAddress, //ownerAddress
	algoLazyMinted
) => {
	try {
		const platformFeeAccount = process.env.REACT_APP_ALGORAND_ADMIN_ACCOUNT;
		let NFT_PRICE = await algosdk.algosToMicroalgos(price);

		let txnsArray = [];
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const accountInfo = await algodClient
			.accountInformation(connectedAddress.toString())
			.do();

		const createdApps = accountInfo['apps-local-state'];
		const isAccountOptIn = createdApps.some((element) => {
			if (element['id'] === appIndex) {
				return true;
			}
			return false;
		});

		if (!isAccountOptIn) {
			const appoptin = await algosdk.makeApplicationOptInTxnFromObject({
				appIndex: appIndex,
				from: connectedAddress, //buyer address
				suggestedParams: params,
			});
			txnsArray.push(appoptin);
		}
		const enc = new TextEncoder();

		let note = enc.encode('buy');
		if (isAccountOptIn) {
			note = enc.encode('buyNew');
		}

		const appAddr = algosdk.getApplicationAddress(appIndex);
		const app_args = [note, algosdk.encodeUint64(nftID)];

		if (algoLazyMinted === true) {
			const amount = (NFT_PRICE / 100) * 3.5;
			const sendRoyalityAmountFirstTime = await sendAmount(
				connectedAddress,
				royaltyAddress,
				amount
			);
			NFT_PRICE = NFT_PRICE - amount;
		}

		const buy = await algosdk.makeApplicationCallTxnFromObject({
			appIndex: appIndex,
			from: connectedAddress, //buyer address
			appArgs: app_args,
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: params,
			accounts: [sellerAddress, royaltyAddress, platformFeeAccount],
		});
		txnsArray.push(buy);

		const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			suggestedParams: {
				...params,
			},
			from: connectedAddress, // buyer address
			to: appAddr, // app address will take from appId
			amount: NFT_PRICE,
		});

		txnsArray.push(paymentTxn);

		const transferAsset = await executeTransfer(
			nftID,
			connectedAddress,
			appIndex,
			sellerAddress,
			royaltyAddress,
			txnsArray,
			isAccountOptIn,
			platformFeeAccount
		);
		if (transferAsset) {
			return transferAsset;
		}
	} catch (err) {
		console.log('🚀 ~ file: algorand.js ~ line 848 ~ err', err.message);
		return err;
	}
};
const executeTransfer = async (
	nftID,
	connectedAddress,
	appID,
	sellerAddress,
	royaltyAddress,
	txnsArray,
	isAccountOptIn,
	platformFeeAccount
) => {
	const params = await algodClient.getTransactionParams().do();
	params.fee = 1000;
	params.flatFee = true;

	const assetoptin =
		await algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
			amount: 0,
			assetIndex: nftID,
			from: connectedAddress, // buyer address
			to: connectedAddress, // buyer address
			suggestedParams: {
				...params,
			},
		});

	const enc = new TextEncoder();
	let note = enc.encode('executeTransfer');
	if (isAccountOptIn) {
		note = enc.encode('executeTransferNew');
	}

	const app_args = [note];

	const execute = await algosdk.makeApplicationCallTxnFromObject({
		appIndex: appID,
		from: connectedAddress,
		foreignAssets: [nftID],
		onComplete: OnApplicationComplete.NoOpOC,
		suggestedParams: params,
		appArgs: app_args,
		accounts: [sellerAddress, royaltyAddress, platformFeeAccount],
	});

	txnsArray.push(assetoptin);
	txnsArray.push(execute);

	// push sendAmount transaction in txnxArray

	const groupID = algosdk.computeGroupID(txnsArray);
	for (let i = 0; i < txnsArray.length; i++) txnsArray[i].group = groupID;

	const signedTxns = await myAlgoConnect.signTransaction(
		txnsArray.map((txn) => txn.toByte())
	);
	let transactions = [];

	signedTxns.forEach((element) => transactions.push(element.blob));
	const sendGroupTransactions = await algodClient
		.sendRawTransaction(transactions)
		.do();

	return sendGroupTransactions;
};

const cancelListForLiveAuction = async (
	appId,
	seller_address,
	nftID,
	appGlobalState
) => {
	try {
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const deleteTxn = await algosdk.makeApplicationDeleteTxnFromObject({
			from: seller_address,
			appIndex: appId,
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: {
				...params,
			},
		});

		const signedTxn = await myAlgoConnect.signTransaction(deleteTxn.toByte());
		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

		if (response) {
			const data = { success: true, response };
			return data;
		}
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 579 ~ closeAuction ~ err',
			err.message
		);
		return err;
	}
};

const cancelItemForFixPriceListing = async (appId, seller_address, nftID) => {
	try {
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;
		const note = enc.encode('cancel_listing');

		const app_args = [
			note,
			algosdk.decodeAddress(seller_address.toString()).publicKey,
		];

		const execute = await algosdk.makeApplicationCallTxnFromObject({
			appIndex: appId,
			from: seller_address,
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: params,
			appArgs: app_args,
		});

		const signedTxn = await myAlgoConnect.signTransaction(execute.toByte());
		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

		if (response) {
			const data = { success: true, response };
			return data;
		}
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 579 ~ closeAuction ~ err',
			err.message
		);
		return err;
	}
};
export {
	signMessageFromUserForAlgorand,
	checkAlgoBalance,
	createNFT,
	createAuctionApp,
	placeBidOnAlgorand,
	closeAuction,
	createFixedPriceApp,
	buyFixedPriceNFT,
	setupSale,
	cancelListForLiveAuction,
	cancelItemForFixPriceListing,
	getAlgoBalance,
};
