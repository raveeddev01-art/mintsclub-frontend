import MyAlgoConnect from '@randlabs/myalgo-connect';
import { OnApplicationComplete } from 'algosdk';
import approval_program from './algorand/auctionContract/approval.teal';
import clear_program from './algorand/auctionContract/clear.teal';
import fixed_approval_program from './algorand/fixedPriceContract/approval.teal';
import fixed_clear_program from './algorand/fixedPriceContract/clear.teal';

const crypto = require('crypto-browserify');
const algosdk = require('algosdk');
const enc = new TextEncoder();
const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
const nobleEd25519 = require('@noble/ed25519');
// console.log(auction_approval);
const settings = {
	shouldSelectOneAccount: false,
	openManager: false,
};

const algodToken = { 'X-API-Key': '7zCiHvmx5B9FPCY7zuj5S5h4VBdBcAwn5A0BDwhd' };
const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
const algodPort = '';

let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export const connectWallet = async () => {
	try {
		const accounts = await myAlgoConnect.connect(settings);
		const sk = await accounts.map((account) => account.sk);
		const address = accounts.map((account) => account.address);
		const name = accounts.map((account) => account.name);
		// let account_mnemonic = algosdk.secretKeyToMnemonic(accounts[0].sk);
		// console.log("Account Mnemonic = " + account_mnemonic);
		// console.log(address + " " + sk);
		return address;

		//   setaccountaddress(address);
		// let account_mnemonic = algosdk.secretKeyToMnemonic(nemonic.sk);
		// setnemonic(account_mnemonic);
	} catch (err) {
		console.error(err);
	}
};
const CheckBalance = async (accountaddress) => {
	let accountInfo = await algodClient.accountInformation(accountaddress).do();
	return accountInfo.amount;
};

const sendAmount = async (accountaddress, to_address) => {
	const params = await algodClient.getTransactionParams().do();
	const note = enc.encode('Amount is being sent');

	const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
		suggestedParams: {
			...params,
		},
		from: accountaddress.toString(),
		to: to_address,
		amount: 200000,
		note: note,
	});

	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

	const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

	console.log(response);

	console.log('Payment Successful');
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
	console.log('==> CREATE ASSET');
	const { assetName, total, metaData, connectedAddress } = inputFields;
	console.log({ assetName, total, metaData, connectedAddress });
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
		total: +total,
		unitName: unitName,
		manager: connectedAddress.toString(),
		freeze: connectedAddress.toString(),
		clawback: connectedAddress.toString(),
	});
	console.log(txn, 'txn');
	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
	console.log(signedTxn, 'signedTxn');

	const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
	let nftID = null;
	// wait for transaction to be confirmed
	const confirmedTxn = await algosdk.waitForConfirmation(
		algodClient,
		tx.txId,
		4
	);
	//Get the completed Transaction
	console.log(
		'Transaction ' +
			tx.txId +
			' confirmed in round ' +
			confirmedTxn['confirmed-round']
	);
	nftID = confirmedTxn['asset-index'];
	console.log(nftID);

	return { nftID };
}

async function createNFT(inputFields) {
	try {
		// CREATE ASSET
		const { nftID } = await createAsset(algodClient, inputFields);
		console.log(nftID, 'assetId========>');
		return nftID;
	} catch (err) {
		console.log('err', err);
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

async function createApp(nft_ID, accountaddress) {
	let approvalProg = '';
	let clearProg = '';
	await fetch(approval_program)
		.then((r) => r.text())
		.then((text) => {
			console.log('there');

			approvalProg = text;
		});

	await fetch(clear_program)
		.then((r) => r.text())
		.then((text) => {
			clearProg = text;
		});

	let approval_teal = await compileProgram(algodClient, approvalProg);
	let clear_teal = await compileProgram(algodClient, clearProg);
	console.log('here');
	const nftID = 115655736; //replace with nft_ID
	const foreignAssets = [];
	foreignAssets.push(nftID);
	const waiting_time = 15;
	const royaltyfee = 35;
	const royaltyaddress =
		'CRJYNOMU3ZXQVZ26TOVVJLLYTIK6AOKUY746PLA2G6OKVCXKOADSV4AN5Y';
	const params = await algodClient.getTransactionParams().do();
	params.fee = 1000;
	params.flatFee = true;
	const app_args = [
		algosdk.decodeAddress(accountaddress.toString()).publicKey,
		algosdk.encodeUint64(nftID),
		algosdk.encodeUint64(royaltyfee),
		algosdk.encodeUint64(waiting_time),
		algosdk.decodeAddress(royaltyaddress.toString()).publicKey,
	];

	const txn = await algosdk.makeApplicationCreateTxnFromObject({
		from: accountaddress.toString(),
		suggestedParams: params,
		onComplete: OnApplicationComplete.NoOpOC,
		approvalProgram: approval_teal,
		clearProgram: clear_teal,
		numLocalInts: 3,
		numLocalByteSlices: 0,
		numGlobalInts: 4,
		numGlobalByteSlices: 2,
		appArgs: app_args,
		foreignAssets: foreignAssets,
	});

	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
	const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
	console.log('response', response);

	let appID = null;
	// wait for transaction to be confirmed
	const confirmedTxn = await algosdk.waitForConfirmation(
		algodClient,
		response.txId,
		4
	);
	console.log('confirmedTxn', confirmedTxn);

	appID = await confirmedTxn['application-index'];
	console.log('appID ', appID);

	const appAddr = await algosdk.getApplicationAddress(appID);
	console.log('appAddr ', appAddr);

	await sendAmount(accountaddress, appAddr);

	const tx = await algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
		from: accountaddress.toString(),
		assetIndex: nftID,
		manager: accountaddress.toString(),
		clawback: appAddr,
		freeze: appAddr,
		suggestedParams: params,
		strictEmptyAddressChecking: false,
	});

	console.log('Tx Clawback ', tx);

	const optin = await algosdk.makeApplicationOptInTxnFromObject({
		appIndex: appID,
		from: accountaddress.toString(),
		suggestedParams: params,
	});

	console.log('App optin ', optin);

	return { appID, appAddr };
}

const createAuctionApp = async (
	startTime,
	endTime,
	nftID,
	copies,
	price,
	connectedAddress,
	royaltyAddress
) => {
	try {
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
		];

		const txn = await algosdk.makeApplicationCreateTxn(
			connectedAddress.toString(),
			params,
			OnApplicationComplete.NoOpOC,
			approval_teal,
			clear_teal,
			0,
			0,
			8,
			3,
			app_args
		);
		const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
		console.log('🚀 ~ file: algorand.js ~ line 318 ~ response', response);
		let appID = null;
		const confirmedTxn = await algosdk.waitForConfirmation(
			algodClient,
			response.txId,
			4
		);
		appID = confirmedTxn['application-index'];
		console.log('confirmedTxn', confirmedTxn);
		console.log('App is create with appId: ', appID);
		const result = await setupAuctionApp(
			appID,
			nftID,
			connectedAddress,
			copies
		);
		const data = { appId: appID, globalState: result };
		console.log(
			'🚀 ~ file: algorand.js ~ line 420 ~ setupAuctionApp ~ data',
			data
		);
		return data;
	} catch (err) {
		console.log('🚀 ~ file: algorand.js ~ line 339 ~ err', err);
		return err;
	}
};
const setupAuctionApp = async (appid, nftID, accountaddress, copies) => {
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

		algosdk.assignGroupID([fundAppTxn, setupTxn, fundNftTxn]);

		const signedFundAppTxn = await myAlgoConnect.signTransaction(
			fundAppTxn.toByte()
		);
		const signedSetupTxn = await myAlgoConnect.signTransaction(
			setupTxn.toByte()
		);
		const signedFundNftTxn = await myAlgoConnect.signTransaction(
			fundNftTxn.toByte()
		);
		const response = await algodClient
			.sendRawTransaction([
				signedFundAppTxn.blob,
				signedSetupTxn.blob,
				signedFundNftTxn.blob,
			])
			.do();

		// const confirmedTxn = await algosdk.waitForConfirmation(
		//   algodClient,
		//   signedFundAppTxn.txId,
		//   4
		// );
		console.log('Setup app is completed: ', response);

		const global_state = await getAppGlobalState(appid, accountaddress);

		return global_state;
		// setGlobalState(global_state);
		// console.log(global_state);
	} catch (err) {
		console.log(err, 'error while setting up app');
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
	console.log('stateArray', stateArray);
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
	global_state
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

		algosdk.assignGroupID([payTxn, appCallTxn]);

		const signedPayTxn = await myAlgoConnect.signTransaction(payTxn.toByte());
		const signedAppCallTxn = await myAlgoConnect.signTransaction(
			appCallTxn.toByte()
		);

		const response = await algodClient
			.sendRawTransaction([signedPayTxn.blob, signedAppCallTxn.blob])
			.do();
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
		const signedOptInTxn = await myAlgoConnect.signTransaction(
			assetoptin.toByte()
		);

		const signOptRawTransaction = await algodClient
			.sendRawTransaction(signedOptInTxn.blob)
			.do();
		await sleep(3000);
		const new_global_state = await getAppGlobalState(appid, ownerAddress);

		return new_global_state;
	} catch (err) {
		console.log(err, 'error while algorand bidding');
		return err;
	}
};

const closeAuction = async (appId, seller_address, nftID, appGlobalState) => {
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

		const deleteTxn = await algosdk.makeApplicationDeleteTxnFromObject({
			from: seller_address,
			appIndex: appId,
			accounts: accounts,
			foreignAssets: [nftID],
			suggestedParams: {
				...params,
			},
		});

		const signedTxn = await myAlgoConnect.signTransaction(deleteTxn.toByte());

		const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
		return tx;
	} catch (err) {
		console.log('🚀 ~ file: algorand.js ~ line 579 ~ closeAuction ~ err', err);
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
	price
) => {
	try {
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
		];

		const txn = await algosdk.makeApplicationCreateTxn(
			connectedAddress.toString(),
			params,
			OnApplicationComplete.NoOpOC,
			approval_teal,
			clear_teal,
			3,
			0,
			4,
			2,
			app_args,
			undefined,
			undefined,
			foreignAssets
		);
		console.log(
			'🚀 ~ file: algorand.js ~ line 620 ~ createFixedPriceApp ~ txn',
			txn
		);

		const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
		const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 627 ~ createFixedPriceApp ~ response',
			response
		);

		const confirmedTxn = await algosdk.waitForConfirmation(
			algodClient,
			response.txId,
			4
		);
		console.log(
			'🚀 ~ file: algorand.js ~ line 638 ~ createFixedPriceApp ~ confirmedTxn',
			confirmedTxn
		);

		const appID = confirmedTxn['application-index'];
		console.log(
			'🚀 ~ file: algorand.js ~ line 641 ~ createFixedPriceApp ~ appID',
			appID
		);
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

		const signedFundAppTxn = await myAlgoConnect.signTransaction(
			fundAppTxn.toByte()
		);
		const signedFundAppTxnresponse = await algodClient
			.sendRawTransaction(signedFundAppTxn.blob)
			.do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 686 ~ setupSale ~ signedFundAppTxnresponse',
			signedFundAppTxnresponse
		);
		// Setting Clawback Address
		const tx = await algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
			from: connectedAddress.toString(),
			assetIndex: nftID,
			clawback: appAddr,
			freeze: appAddr,
			suggestedParams: params,
			strictEmptyAddressChecking: false,
			manager: connectedAddress.toString(),
		});
		console.log('🚀 ~ file: algorand.js ~ line 687 ~ tx', tx);

		const signedtx = await myAlgoConnect.signTransaction(tx.toByte());
		console.log(
			'🚀 ~ file: algorand.js ~ line 709 ~ setupSale ~ signedtx',
			signedtx
		);
		const signedtxresponse = await algodClient
			.sendRawTransaction(signedtx.blob)
			.do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 705 ~ setupSale ~ signedtxresponse',
			signedtxresponse
		);
		// Opt in
		const optin = await algosdk.makeApplicationOptInTxnFromObject({
			appIndex: appID,
			from: connectedAddress.toString(),
			suggestedParams: params,
		});

		const optintx = await myAlgoConnect.signTransaction(optin.toByte());
		console.log(
			'🚀 ~ file: algorand.js ~ line 725 ~ setupSale ~ optintx',
			optintx
		);
		const optintxresponse = await algodClient
			.sendRawTransaction(optintx.blob)
			.do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 721 ~ setupSale ~ optintxresponse',
			optintxresponse
		);
		const result = await setupSale(price, appID, nftID, connectedAddress);
		if (result) {
			return appID;
		}
	} catch (err) {
		console.log(
			'🚀 ~ file: algorand.js ~ line 645 ~ createFixedPriceApp ~ err',
			err
		);
		return err;
	}
};
const setupSale = async (price, appID, nftID, connectedAddress) => {
	try {
		const NFT_PRICE = await algosdk.algosToMicroalgos(price);
		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const appAddr = algosdk.getApplicationAddress(appID);
		console.log(
			'🚀 ~ file: algorand.js ~ line 674 ~ setupSale ~ appAddr',
			appAddr
		);

		const enc = new TextEncoder();
		const note = enc.encode('setupSale');

		const app_args = [note, algosdk.encodeUint64(NFT_PRICE)];
		console.log(
			'🚀 ~ file: algorand.js ~ line 745 ~ setupSale ~ app_args',
			app_args
		);
		console.log('check appId===>', appID);
		console.log('check nftId===>', nftID);
		const setsale = algosdk.makeApplicationCallTxnFromObject({
			appIndex: appID,
			from: connectedAddress.toString(),
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: params,
			appArgs: app_args,
		});

		const setsaleTxn = await myAlgoConnect.signTransaction(setsale.toByte());
		console.log(
			'🚀 ~ file: algorand.js ~ line 756 ~ setupSale ~ setsaleTxn',
			setsaleTxn
		);

		const setsaleTxnresponse = await algodClient
			.sendRawTransaction(setsaleTxn.blob)
			.do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 761 ~ setupSale ~ setsaleTxnresponse',
			setsaleTxnresponse
		);

		return setsaleTxnresponse;
	} catch (err) {
		console.log('🚀 ~ file: algorand.js ~ line 751 ~ setupSale ~ err', err);
		return err;
	}
};

const buyFixedPriceNFT = async (
	price,
	nftID,
	appIndex,
	connectedAddress,
	royaltyAddress,
	sellerAddress //ownerAddress
) => {
	console.log(
		'🚀 ~ file: algorand.js ~ line 791 ~ sellerAddress',
		sellerAddress
	);
	console.log(
		'🚀 ~ file: algorand.js ~ line 791 ~ royaltyAddress',
		royaltyAddress
	);
	console.log(
		'🚀 ~ file: algorand.js ~ line 791 ~ connectedAddress',
		connectedAddress
	);
	try {
		const NFT_PRICE = await algosdk.algosToMicroalgos(price);

		const params = await algodClient.getTransactionParams().do();
		params.fee = 1000;
		params.flatFee = true;

		const appoptin = await algosdk.makeApplicationOptInTxnFromObject({
			appIndex: appIndex,
			from: connectedAddress, //buyer address
			suggestedParams: params,
		});

		const appoptintx = await myAlgoConnect.signTransaction(appoptin.toByte());
		const appoptintxresponse = await algodClient
			.sendRawTransaction(appoptintx.blob)
			.do();
		console.log(
			'🚀 ~ file: algorand.js ~ line 792 ~ buyFixedPriceNFT ~ appoptintxresponse',
			appoptintxresponse
		);

		const enc = new TextEncoder();
		const note = enc.encode('buy');

		const app_args = [note, algosdk.encodeUint64(nftID)];

		const buy = await algosdk.makeApplicationCallTxnFromObject({
			appIndex: appIndex,
			from: connectedAddress, //buyer address
			appArgs: app_args,
			foreignAssets: [nftID],
			onComplete: OnApplicationComplete.NoOpOC,
			suggestedParams: params,
			accounts: [sellerAddress, royaltyAddress],
		});
		console.log('🚀 ~ file: algorand.js ~ line 818 ~ buy', buy);
		//account ['owner address','creator/royalty address']
		const appAddr = algosdk.getApplicationAddress(appIndex);

		const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
			suggestedParams: {
				...params,
			},
			from: connectedAddress, // buyer address
			to: appAddr, // app address will take from appId
			amount: NFT_PRICE,
		});

		algosdk.assignGroupID([buy, paymentTxn]);

		const buytx = await myAlgoConnect.signTransaction(buy.toByte());
		const paymentAppTxn = await myAlgoConnect.signTransaction(
			paymentTxn.toByte()
		);

		let groupedSignedTxns = [];
		groupedSignedTxns.push(buytx.blob);
		groupedSignedTxns.push(paymentAppTxn.blob);

		const response = await algodClient
			.sendRawTransaction(groupedSignedTxns)
			.do();
		console.log('🚀 ~ file: algorand.js ~ line 843 ~ response', response);
		const transferAsset = await executeTransfer(
			nftID,
			connectedAddress,
			appIndex,
			sellerAddress,
			royaltyAddress
		);
		if (transferAsset) {
			return transferAsset;
		}
	} catch (err) {
		console.log('🚀 ~ file: algorand.js ~ line 848 ~ err', err);
		return err;
	}
};
const executeTransfer = async (
	nftID,
	connectedAddress,
	appID,
	sellerAddress,
	royaltyAddress
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

	const setsaleTxn = await myAlgoConnect.signTransaction(assetoptin.toByte());
	const assetoptinresponse = await algodClient
		.sendRawTransaction(setsaleTxn.blob)
		.do();
	console.log('assetoptinresponse', assetoptinresponse);

	const enc = new TextEncoder();
	const note = enc.encode('executeTransfer');

	const app_args = [note];

	const execute = await algosdk.makeApplicationCallTxnFromObject({
		appIndex: appID,
		from: connectedAddress,
		foreignAssets: [nftID],
		onComplete: OnApplicationComplete.NoOpOC,
		suggestedParams: params,
		appArgs: app_args,
		accounts: [sellerAddress, royaltyAddress],
	});

	console.log('execute', execute);

	algosdk.assignGroupID([execute]);
	const signedTxn = await myAlgoConnect.signTransaction(execute.toByte());

	let groupedSignedTxns = [];
	groupedSignedTxns.push(signedTxn.blob);

	const response = await algodClient.sendRawTransaction(groupedSignedTxns).do();
	console.log('response', response);
	return response;
};
export {
	signMessageFromUserForAlgorand,
	createApp,
	CheckBalance,
	createNFT,
	createAuctionApp,
	placeBidOnAlgorand,
	closeAuction,
	createFixedPriceApp,
	buyFixedPriceNFT,
	setupSale,
};
