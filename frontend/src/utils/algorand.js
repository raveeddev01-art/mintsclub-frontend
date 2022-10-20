import MyAlgoConnect from '@randlabs/myalgo-connect';
const crypto = require('crypto-browserify');
const algosdk = require('algosdk');
const enc = new TextEncoder();
const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
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
	// console.log(algodClient);
	let accountInfo = await algodClient.accountInformation(accountaddress).do();
	console.log(accountInfo);
	console.log('Account balance: %d microAlgos', accountInfo.amount);
};
const sendAmount = async (accountaddress) => {
	const params = await algodClient.getTransactionParams().do();
	const note = enc.encode('Amount is being sent');

	const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
		suggestedParams: {
			...params,
		},
		from: accountaddress.toString(),
		to: '7R7ZZMRVDMO26FJC566Q46M6S7PR6227RGIOWR2QZXTTX4LLUBTLYR3KYQ',
		amount: 2000000,
		note: note,
	});

	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

	const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

	console.log(response);
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

const DISPENSERACCOUNT =
	'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA';
async function createAsset(algodClient, inputFields) {
	const { assetName, total, metaData, connectedAddress } = inputFields;
	console.log(connectedAddress, total, typeof total, 'connectedAddress===>');
	const params = await algodClient.getTransactionParams().do();
	const defaultFrozen = true;
	const unitName = assetName;
	const decimals = 0;

	console.log(__dirname, '__dirname');
	console.log({ unitName, decimals, assetName, total, metaData });
	const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
		assetName: assetName,
		assetURL: metaData.metaDataUrl,
		decimals: decimals,
		defaultFrozen: defaultFrozen,
		from: connectedAddress,
		suggestedParams: params,
		total: +total,
		unitName: unitName,
	});
	console.log(txn, 'txn');
	const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
	console.log(signedTxn, 'signedTxn');

	const tx = await algodClient.sendRawTransaction(signedTxn.blob).do();
	let assetID = null;
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
	assetID = confirmedTxn['asset-index'];

	return { assetID };
}

async function destroyAsset(algodClient, alice, assetID) {
	console.log('');
	console.log('==> DESTROY ASSET');
	// All of the created assets should now be back in the creators
	// Account so we can delete the asset.
	// If this is not the case the asset deletion will fail
	const params = await algodClient.getTransactionParams().do();
	// Comment out the next two lines to use suggested fee
	// params.fee = 1000;
	// params.flatFee = true;
	// The address for the from field must be the manager account
	const addr = alice.addr;
	// if all assets are held by the asset creator,
	// the asset creator can sign and issue "txn" to remove the asset from the ledger.
	const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
		from: addr,
		note: undefined,
		assetIndex: assetID,
		suggestedParams: params,
	});
	// The transaction must be signed by the manager which
	// is currently set to alice
	const rawSignedTxn = txn.signTxn(alice.sk);
	const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
	// Wait for confirmation
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
	// The account3 and account1 should no longer contain the asset as it has been destroyed
	console.log('Asset ID: ' + assetID);
	console.log('Alice = ' + alice.addr);
	// await printCreatedAsset(algodClient, alice.addr, assetID);
	// await printAssetHolding(algodClient, alice.addr, assetID);

	// Notice that although the asset was destroyed, the asset id and associated
	// metadata still exists in account holdings for any account that optin.
	// When you destroy an asset, the global parameters associated with that asset
	// (manager addresses, name, etc.) are deleted from the creator's account.
	// However, holdings are not deleted automatically -- users still need to
	// use the closeToAccount on the call makePaymentTxnWithSuggestedParams of the deleted asset.
	// This is necessary for technical reasons because we currently can't have a single transaction touch potentially
	// thousands of accounts (all the holdings that would need to be deleted).

	// ==> DESTROY ASSET
	// Transaction QCE52AAX75VBSGDL36VHMNVT6LXSR5M6V5JUNSKE6BXQGLQEMLDA confirmed in round 16833536
	// Asset ID: 28291127
	// Alice = RA6RAUNDQGHRWTCR5YRL2YJMIXTHWD5S3ZYHVBGSNA76AVBAYELSNRVKEI
	// Bob = YC3UYV4JLHD344OC3G7JK37DRVSE7X7U2NOZVWSQNVKNEGV4M3KFA7WZ44
}
async function closeoutAliceAlgos(algodClient, alice) {
	console.log('');
	console.log("==> CLOSE OUT ALICE'S ALGOS TO DISPENSER");
	let accountInfo = await algodClient.accountInformation(alice.addr).do();
	console.log('Alice Account balance: %d microAlgos', accountInfo.amount);
	const startingAmount = accountInfo.amount;
	// Construct the transaction
	const params = await algodClient.getTransactionParams().do();
	// comment out the next two lines to use suggested fee
	// params.fee = 1000;
	// params.flatFee = true;
	// For more info see:
	// https://developer.algorand.org/docs/reference/transactions/#payment-transaction
	// receiver account to send to
	const receiver = alice.addr;
	const enc = new TextEncoder();
	const amount = 0;
	const sender = alice.addr;
	// closeToRemainder will remove the assetholding from the account
	const closeRemainderTo = DISPENSERACCOUNT;
	const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
		from: sender,
		to: receiver,
		amount,
		closeRemainderTo,
		note: undefined,
		suggestedParams: params,
	});
	// Sign the transaction
	const rawSignedTxn = txn.signTxn(alice.sk);
	// Submit the transaction
	const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
	// Wait for confirmation
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
	// const mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
	// console.log("Transaction information: %o", mytxinfo);
	accountInfo = await algodClient.accountInformation(alice.addr).do();
	let txAmount = confirmedTxn.txn.txn.amt;
	if (confirmedTxn.txn.txn.amt == undefined) {
		console.log('Transaction Amount: %d microAlgos', 0);
		txAmount = 0;
	} else {
		console.log('Transaction Amount: %d microAlgos', confirmedTxn.txn.txn.amt);
	}
	console.log('Transaction Fee: %d microAlgos', confirmedTxn.txn.txn.fee);
	const closeoutamt = startingAmount - txAmount - confirmedTxn.txn.txn.fee;
	console.log('Close To Amount: %d microAlgos', closeoutamt);
	console.log('Bobs Account balance: %d microAlgos', accountInfo.amount);

	// Sample Output
	// ==> CLOSE OUT ALICE'S ALGOS TO DISPENSER
	// Alice Account balance: 8996000 microAlgos
	// Transaction IC6IQVUOFLTTXNWZWD4F6L5CZXOFBTD3EY2QJUY5MHUOQSAX3CEA confirmed in round 16833543
	// Transaction Amount: 0 microAlgos
	// Transaction Fee: 1000 microAlgos
	// Bobs Account balance: 0 microAlgos
}

const createAccount = function () {
	try {
		// let account1_mnemonic = "goat march toilet hope fan federal around nut drip island tooth mango table deal diesel reform lecture warrior tent volcano able wheel marriage absorb minimum";
		// const myaccount = algosdk.mnemonicToSecretKey(account1_mnemonic);
		const myaccount = algosdk.generateAccount();
		console.log('Account Address = ' + myaccount.addr);
		let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
		console.log('Account Mnemonic = ' + account_mnemonic);
		console.log('Account created. Save off Mnemonic and address');
		console.log('Add funds to account using the TestNet Dispenser: ');
		console.log(
			'https://dispenser.testnet.aws.algodev.network/?account=' + myaccount.addr
		);

		return myaccount;
	} catch (err) {
		console.log('err', err);
	}
};

// Function used to print created asset for account and assetid
// const printCreatedAsset = async function (algodClient, account, assetid) {
//     // note: if you have an indexer instance available it is easier to just use this
//     //     let accountInfo = await indexerClient.searchAccounts()
//     //    .assetID(assetIndex).do();
//     // and in the loop below use this to extract the asset for a particular account
//     // accountInfo['accounts'][idx][account]);
//     let accountInfo = await algodClient.accountInformation(account).do();
//     for (idx = 0; idx < accountInfo['created-assets'].length; idx++) {
//         let scrutinizedAsset = accountInfo['created-assets'][idx];
//         if (scrutinizedAsset['index'] == assetid) {
//             console.log("AssetID = " + scrutinizedAsset['index']);
//             let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
//             console.log("parms = " + myparms);
//             break;
//         }
//     }
// };
// Function used to print asset holding for account and assetid
// const printAssetHolding = async function (algodClient, account, assetid) {
//     // note: if you have an indexer instance available it is easier to just use this
//     //     let accountInfo = await indexerClient.searchAccounts()
//     //    .assetID(assetIndex).do();
//     // and in the loop below use this to extract the asset for a particular account
//     // accountInfo['accounts'][idx][account]);
//     let accountInfo = await algodClient.accountInformation(account).do();
//     for (idx = 0; idx < accountInfo['assets'].length; idx++) {
//         let scrutinizedAsset = accountInfo['assets'][idx];
//         if (scrutinizedAsset['asset-id'] == assetid) {
//             let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
//             console.log("assetholdinginfo = " + myassetholding);
//             break;
//         }
//     }
// };

async function createNFT(inputFields) {
	try {
		// let alice = createAccount();
		// console.log("Press any key when the account is funded");
		// await keypress();
		// Connect your client
		// const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
		// const algodServer = 'http://localhost';
		// const algodPort = 4001;
		// const algodToken = '2f3203f21e738a1de6110eba6984f9d03e5a95d7a577b34616854064cf2c0e7b';
		// const algodServer = 'https://academy-algod.dev.aws.algodev.network';
		// const algodPort = 443;

		// let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
		// let connectedAddress = await connectWallet();

		// CREATE ASSET
		const { assetID } = await createAsset(
			algodClient,
			// connectedAddress[0],
			inputFields
		);
		console.log(assetID, 'assetId========>');
		return assetID;

		// DESTROY ASSET
		// await destroyAsset(algodClient, alice, assetID);
		// CLOSEOUT ALGOS - Alice closes out Alogs to dispenser
		// await closeoutAliceAlgos(algodClient, alice);
	} catch (err) {
		console.log('err', err);
	}
}

// createNFT();

export { CheckBalance, createNFT };
