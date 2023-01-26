import { getMetaplex } from './config';
import { PublicKey, sol, walletAdapterIdentity } from '@metaplex-foundation/js';
import * as anchor from '@project-serum/anchor';
import { BN } from '@project-serum/anchor';
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
	CancelInstructionAccounts,
	CancelInstructionArgs,
	createBuyInstruction,
	createCancelInstruction,
	createSellInstruction,
	createWithdrawInstruction,
	WithdrawInstructionAccounts,
	WithdrawInstructionArgs,
} from '@metaplex-foundation/mpl-auctioneer';
import {
	clusterApiUrl,
	Connection,
	LAMPORTS_PER_SOL,
	SystemProgram,
	SYSVAR_RENT_PUBKEY,
	Transaction,
} from '@solana/web3.js';
import e from 'express';
import idl from './idl.json';
import { compressImage, handleRequest } from '../functions';
import { ENV } from '../../config/config';

const AUCTION_HOUSE_ADDRESS = 'HGLp7o4LTbKCsrLPRLogfwmLVFN7LzpuCgpgJ3W6sNVP';

const AUCTION_HOUSE_PROGRAM_ID = new PublicKey(
	'hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk'
);
const AUCTIONEER_AUCTION_HOUSE_ADDRESS = new PublicKey(
	'6d2ipuim1xY76ob4rHmP9Tt4jYCesPUfQCbPPGKa36s'
);

const AUCTIONEER = new PublicKey('neer8g6yJq2mQM6KbnViEDAD4gr3gRZyMMf4F2p3MEh');

const WRAPPED_SOL_MINT = new PublicKey(
	'So11111111111111111111111111111111111111112'
);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);

const auctionHouseAuthority = new PublicKey(
	'Eo6psn7nEnmtspqdi4ak4oFw2m9v7LJinsook6sLfk6'
);

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
	'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
);

const mintSingleNft = async (
	wallet: any,
	tokenUri: string,
	name: string,
	sellerFeeBasisPoints = 200
) => {
	try {
		const metaplex = getMetaplex();

		metaplex.use(walletAdapterIdentity(wallet));
		const mintNftResponse: any = await metaplex.nfts().create({
			uri: tokenUri,
			sellerFeeBasisPoints,
			name,
		});

		return mintNftResponse;
	} catch (err:any) {
		throw new Error(err);
	}
};

const signMessageFromUserForSolana = async (
	wallet: any,
	nounce: number,
	connectedAddress: string
) => {
	try {
		if (wallet.connected) {
			const data = new TextEncoder().encode(
				`I am signing my one-time nonce: ${nounce}`
			);
			const signature: any =
				wallet.signMessage && (await wallet.signMessage(data));

			const signatureBase64 = Buffer.from(signature).toString('base64');
			return { publicAddress: connectedAddress, signature: signatureBase64 };
		}
	} catch (err) {
		return err;
	}
};

const listItemForFixedPriceSolana = async (
	wallet: any,
	price: number,
	mintAddress: string
) => {
	const metaplex = getMetaplex();
	metaplex.use(walletAdapterIdentity(wallet));

	const auctionHouse = await metaplex.auctionHouse().findByAddress({
		address: new PublicKey(AUCTION_HOUSE_ADDRESS),
	});

	const { listing, sellerTradeState, receipt } = await metaplex
		.auctionHouse()
		.list({
			auctionHouse,
			price: sol(price),
			mintAccount: new PublicKey(mintAddress),
		});

	return sellerTradeState.toBase58();
};

const cancelItemFromListing = async (
	wallet: any,
	tradeStateAddress: string
) => {
	try {
		const metaplex = getMetaplex();
		metaplex.use(walletAdapterIdentity(wallet));
		const auctionHouse = await metaplex.auctionHouse().findByAddress({
			address: new PublicKey(AUCTION_HOUSE_ADDRESS),
		});

		const listing = await metaplex.auctionHouse().findListingByTradeState({
			tradeStateAddress: new PublicKey(tradeStateAddress),
			auctionHouse,
		});

		const cancelListing = await metaplex.auctionHouse().cancelListing({
			listing,
			auctionHouse,
		});

		return cancelListing;
	} catch (err) {
		return err;
	}
};

const buyNowFixedPriceAuction = async (
	wallet: any,
	mintAddress: string,
	tradeStateAddress: string,
	price: number,
	setConfirmed: any
) => {
	try {
		setConfirmed('pending');
		const metaplex = getMetaplex();
		metaplex.use(walletAdapterIdentity(wallet));

		const auctionHouse = await metaplex
			.auctionHouse()
			.findByAddress({ address: new PublicKey(AUCTION_HOUSE_ADDRESS) });

		const listing = await metaplex.auctionHouse().findListingByTradeState({
			tradeStateAddress: new PublicKey(tradeStateAddress),
			auctionHouse,
		});

		const bid = await metaplex.auctionHouse().bid({
			auctionHouse: auctionHouse,
			buyer: wallet,
			mintAccount: new PublicKey(mintAddress),
			price: sol(price),
		});

		const purchase = await metaplex.auctionHouse().executeSale({
			auctionHouse,
			bid: bid.bid,
			listing,
		});
		setConfirmed(true);
		return purchase;
	} catch (err) {
		setConfirmed(false);
		return err;
	}
};

const getAuctionHouseTradeState = async (
	auctionHouse: PublicKey,
	wallet: { toBuffer: () => Uint8Array | Buffer },
	tokenAccount: PublicKey,
	treasuryMint: PublicKey,
	tokenMint: PublicKey,
	tokenSize: string | number | anchor.BN | number[] | Uint8Array | Buffer,
	buyPrice: string | number | anchor.BN | number[] | Uint8Array | Buffer
) => {
	return await PublicKey.findProgramAddress(
		[
			Buffer.from('auction_house'),
			wallet.toBuffer(),
			auctionHouse.toBuffer(),
			tokenAccount.toBuffer(),
			treasuryMint.toBuffer(),
			tokenMint.toBuffer(),
			new BN(buyPrice).toArrayLike(Buffer, 'le', 8),
			new BN(tokenSize).toArrayLike(Buffer, 'le', 8),
		],
		AUCTION_HOUSE_PROGRAM_ID
	);
};
const listItemForLiveAuction = async (
	wallet: any,
	mintAddress: string,
	startTime: number,
	endTime: number
) => {
	try {
		const MINT = new PublicKey(mintAddress);
		const connection = new Connection(clusterApiUrl(ENV.networkCluster));
		const metaplex = getMetaplex();

		const [auctioneerAuthority, bump] = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);

		const pda = await PublicKey.findProgramAddress(
			[
				Buffer.from('auctioneer'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				auctioneerAuthority.toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const associatedAddress = await getAssociatedTokenAddress(
			MINT,
			wallet.publicKey
		);

		const listingConfig = await PublicKey.findProgramAddress(
			[
				Buffer.from('listing_config'),
				wallet.publicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTIONEER
		);

		const [sellerTradeState, tradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			wallet.publicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'18446744073709551615'
		);

		const [freeTradeState, freeTradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			wallet.publicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'0'
		);

		const feePayer = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('fee_payer'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const metadata = await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from('metadata'),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				MINT.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
		);

		const [signer, signerBump] = await PublicKey.findProgramAddress(
			[Buffer.from('auction_house'), Buffer.from('signer')],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const accounts = {
			auctionHouseProgram: AUCTION_HOUSE_PROGRAM_ID,
			listingConfig: listingConfig[0],
			wallet: wallet.publicKey,
			tokenAccount: associatedAddress,
			metadata: metadata[0],
			authority: auctionHouseAuthority,
			auctionHouse: AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			auctionHouseFeeAccount: feePayer[0],
			sellerTradeState: sellerTradeState,
			freeSellerTradeState: freeTradeState,
			auctioneerAuthority: auctioneerAuthority,
			ahAuctioneerPda: pda[0],
			programAsSigner: signer,
		};

		const args = {
			tradeStateBump: tradeBump,
			freeTradeStateBump: freeTradeBump,
			programAsSignerBump: signerBump,
			auctioneerAuthorityBump: bump,
			tokenSize: new BN(Math.ceil(1 * 1)),
			startTime: startTime,
			endTime: endTime,
			reservePrice: 1,
			minBidIncrement: 1,
			timeExtPeriod: 1,
			timeExtDelta: 1,
			allowHighBidCancel: false,
		};

		const sellInstruction = await createSellInstruction(accounts, args);
		const transaction = new Transaction();

		transaction.add(sellInstruction);
		transaction.feePayer = wallet.publicKey as any;
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;

		const signedTransaction = await wallet.signTransaction(transaction);

		const txnHash = await connection.sendRawTransaction(
			signedTransaction.serialize()
			// { skipPreflight: true }
		);
		if (txnHash) {
			const data = { success: true, txnHash };
			return data;
		}
	} catch (e) {
		return e;
	}
};

const bidForLiveAuction = async (
	wallet: any,
	sellerKey: string,
	mintAddress: string,
	price: number
) => {
	try {
		const amountToBid = price * LAMPORTS_PER_SOL;
		const metaplex = getMetaplex();
		const connection = new Connection(clusterApiUrl(ENV.networkCluster));
		metaplex.use(walletAdapterIdentity(wallet));

		const auctioneerAuthority = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);

		const pda = await PublicKey.findProgramAddress(
			[
				Buffer.from('auctioneer'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				auctioneerAuthority[0].toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);
		const sellerPublicKey = new PublicKey(sellerKey);
		const MINT = new PublicKey(mintAddress);

		const associatedAddress = await getAssociatedTokenAddress(
			MINT,
			sellerPublicKey
		);

		const listingConfig = await PublicKey.findProgramAddress(
			[
				Buffer.from('listing_config'),
				sellerPublicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTIONEER
		);

		const metadata = await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from('metadata'),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				MINT.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
		);

		const escrowPaymentAccount = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				wallet.publicKey.toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);
		const buyerTradeState = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				wallet.publicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(amountToBid).toArrayLike(Buffer, 'le', 8),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const auctionHouseFeeAccount = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('fee_payer'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const buyArgs = {
			tradeStateBump: buyerTradeState[1],
			escrowPaymentBump: escrowPaymentAccount[1],
			auctioneerAuthorityBump: auctioneerAuthority[1],
			buyerPrice: amountToBid,
			tokenSize: 1,
		};

		const buyAccounts = {
			auctionHouseProgram: AUCTION_HOUSE_PROGRAM_ID,
			listingConfig: listingConfig[0],
			seller: sellerPublicKey,
			wallet: wallet.publicKey,
			paymentAccount: wallet.publicKey,
			transferAuthority: sellerPublicKey,
			treasuryMint: WRAPPED_SOL_MINT,
			tokenAccount: associatedAddress,
			metadata: metadata[0],
			escrowPaymentAccount: escrowPaymentAccount[0],
			authority: auctionHouseAuthority,
			auctionHouse: AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			auctionHouseFeeAccount: auctionHouseFeeAccount[0],
			buyerTradeState: buyerTradeState[0],
			auctioneerAuthority: auctioneerAuthority[0],
			ahAuctioneerPda: pda[0],
		};

		const buy = await createBuyInstruction(buyAccounts, buyArgs);
		const transaction = new Transaction();

		transaction.add(buy);
		transaction.feePayer = wallet.publicKey as any;
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;

		const signedTransaction = await wallet.signTransaction(transaction);
		const txnHash = await connection.sendRawTransaction(
			signedTransaction.serialize()
			// { skipPreflight: true }
		);
		if (txnHash) {
			const data = { success: true, txnHash };
			return data;
		}

		return;
	} catch (e) {
		return e;
	}
};

const getSolanaBalance = async (wallet: any) => {
	const connection = new Connection(clusterApiUrl(ENV.networkCluster));
	const balance = await connection.getBalance(wallet.publicKey);
	const lamportBalance = balance / LAMPORTS_PER_SOL;
	return lamportBalance;
};

const executeSaleForLiveAuction = async (
	sellerKey: string,
	mintAddress: string,
	wallet: any,
	bidPrice: number
) => {
	try {
		const MINT = new PublicKey(mintAddress);
		const buyerPrice = bidPrice * LAMPORTS_PER_SOL;
		const rpcURL = `https://api.${ENV.networkCluster}.solana.com`;
		const connection = new anchor.web3.Connection(rpcURL);
		const options = anchor.AnchorProvider.defaultOptions();
		//@ts-ignore
		const provider = new anchor.AnchorProvider(connection, wallet, options);

		if (!provider) {
			return;
		}

		const a = JSON.stringify(idl);
		const b = JSON.parse(a);

		const program = new anchor.Program(b, idl.metadata.address, provider);

		const auctioneerAuthority1 = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);

		const pda = await PublicKey.findProgramAddress(
			[
				Buffer.from('auctioneer'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				auctioneerAuthority1[0].toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const sellerPublicKey = new PublicKey(sellerKey);

		const associatedAddress = await getAssociatedTokenAddress(
			MINT,
			sellerPublicKey
		);

		const listingConfig1 = await PublicKey.findProgramAddress(
			[
				Buffer.from('listing_config'),
				sellerPublicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTIONEER
		);

		const metadata1 = await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from('metadata'),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				MINT.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
		);

		const escrowPaymentAccount1 = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				wallet.publicKey.toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const buyerAssociatedAccount = await getAssociatedTokenAddress(
			MINT,
			wallet.publicKey
		);

		const feePayer = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('fee_payer'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const buyerTradeState1 = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				wallet.publicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(buyerPrice).toArrayLike(Buffer, 'le', 8),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const [sellerTradeState, tradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			sellerPublicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'18446744073709551615'
		);

		const [freeTradeState, freeTradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			sellerPublicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'0'
		);

		const [signer, signerBump] = await PublicKey.findProgramAddress(
			[Buffer.from('auction_house'), Buffer.from('signer')],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const ahTreasury = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('treasury'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const metaplex = getMetaplex();
		const remainingAccounts = [];
		const nft = await metaplex.nfts().findByMint({ mintAddress: MINT });
		for (let i = 0; i < nft.creators.length; i++) {
			const creator = {
				pubkey: nft.creators[i].address,
				isWritable: true,
				isSigner: false,
			};
			remainingAccounts.push(creator);
		}

		const escrowPaymentBump = escrowPaymentAccount1[1];

		const freeTradeStateBump = freeTradeBump;

		const programAsSignerBump = signerBump;

		const auctioneerAuthorityBump = auctioneerAuthority1[1];

		const bidderPrice = new anchor.BN(buyerPrice);

		const tokenSize = new anchor.BN(1);

		const auctionHouseProgram = AUCTION_HOUSE_PROGRAM_ID;

		const listingConfig = listingConfig1[0];

		const buyer = wallet.publicKey;

		const seller = sellerPublicKey;

		const tokenAccount = associatedAddress;

		const tokenMint = MINT;

		const metadata = metadata1[0];

		const treasuryMint = WRAPPED_SOL_MINT;

		const escrowPaymentAccount = escrowPaymentAccount1[0];

		const sellerPaymentReceiptAccount = sellerPublicKey;

		const buyerReceiptTokenAccount = buyerAssociatedAccount;

		const authority = auctionHouseAuthority;

		const auctionHouse = AUCTIONEER_AUCTION_HOUSE_ADDRESS;

		const auctionHouseFeeAccount = feePayer[0];
		const auctionHouseTreasury = ahTreasury[0];
		const buyerTradeState = buyerTradeState1[0];

		const auctioneerAuthority = auctioneerAuthority1[0];
		const ahAuctioneerPda = pda[0];
		const programAsSigner = signer;
		const tokenProgram = TOKEN_PROGRAM_ID;
		const systemProgram = SystemProgram.programId;
		const ataProgram = ASSOCIATED_TOKEN_PROGRAM_ID;
		const rent = SYSVAR_RENT_PUBKEY;

		const txSig = await program.methods
			.executeSale(
				escrowPaymentBump,
				freeTradeStateBump,
				programAsSignerBump,
				auctioneerAuthorityBump,
				bidderPrice,
				tokenSize
			)
			.accounts({
				auctionHouseProgram,
				listingConfig,
				buyer,
				seller,
				tokenAccount,
				tokenMint,
				metadata,
				treasuryMint,
				escrowPaymentAccount,
				sellerPaymentReceiptAccount,
				buyerReceiptTokenAccount,
				authority,
				auctionHouse,
				auctionHouseFeeAccount,
				auctionHouseTreasury,
				buyerTradeState,
				sellerTradeState,
				freeTradeState,
				auctioneerAuthority,
				ahAuctioneerPda,
				tokenProgram,
				systemProgram,
				ataProgram,
				programAsSigner,
				rent,
			})
			.remainingAccounts(remainingAccounts)
			.rpc();
		if (txSig) {
			const data = { success: true, txSig };
			return data;
		}
		return;
	} catch (e) {
		return e;
	}
};

const claimBidsForLiveAuction = async (wallet: any, bidPrice: number) => {
	try {
		const escrowPaymentAccount1 = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				wallet.publicKey.toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const auctioneerAuthority1 = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);
		const auctioneerAuthorityBump = auctioneerAuthority1[1];

		const escrowPaymentBump = escrowPaymentAccount1[1];
		const bidAmount = bidPrice * LAMPORTS_PER_SOL;

		const args: WithdrawInstructionArgs = {
			escrowPaymentBump,
			auctioneerAuthorityBump,
			amount: new BN(bidAmount),
		};

		const auctionHouseProgram = AUCTION_HOUSE_PROGRAM_ID;

		const escrowPaymentAccount = escrowPaymentAccount1[0];
		const treasuryMint = WRAPPED_SOL_MINT;

		const authority = auctionHouseAuthority;
		const auctionHouse = AUCTIONEER_AUCTION_HOUSE_ADDRESS;

		const feePayer = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('fee_payer'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);
		const auctionHouseFeeAccount = feePayer[0];

		const [auctioneerAuthority, bump] = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);

		const pda = await PublicKey.findProgramAddress(
			[
				Buffer.from('auctioneer'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				auctioneerAuthority1[0].toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);

		const ahAuctioneerPda = pda[0];

		const associatedAddress = await getAssociatedTokenAddress(
			WRAPPED_SOL_MINT,
			auctionHouseAuthority
		);

		const accounts: WithdrawInstructionAccounts = {
			auctionHouseProgram,
			wallet: wallet.publicKey,
			receiptAccount: wallet.publicKey,
			escrowPaymentAccount,
			treasuryMint,
			authority,
			auctionHouse,
			auctionHouseFeeAccount,
			auctioneerAuthority,
			ahAuctioneerPda,
		};

		const withdrawInstruction = createWithdrawInstruction(accounts, args);
		const connection = new Connection(clusterApiUrl(ENV.networkCluster));

		const transaction = new Transaction();
		transaction.add(withdrawInstruction);

		transaction.feePayer = wallet.publicKey as any;
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;

		const signedTransaction = await wallet.signTransaction(transaction);
		const txnHash = await connection.sendRawTransaction(
			signedTransaction.serialize()
			// { skipPreflight: true }
		);

		return txnHash;
	} catch (e) {
		return e;
	}
};

const cancelListingForLiveAuction = async (
	wallet: any,
	mintAddress: string
) => {
	try {
		const metaplex = getMetaplex();
		metaplex.use(walletAdapterIdentity(wallet));
		const MINT = new PublicKey(mintAddress);

		const options = anchor.AnchorProvider.defaultOptions();
		const connection = new Connection(clusterApiUrl(ENV.networkCluster));

		//@ts-ignore
		const provider = new anchor.AnchorProvider(connection, wallet, options);

		if (!provider) {
			return;
		}
		const [auctioneerAuthority, bump] = await PublicKey.findProgramAddress(
			[Buffer.from('auctioneer'), AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer()],
			AUCTIONEER
		);

		const args: CancelInstructionArgs = {
			auctioneerAuthorityBump: bump,
			buyerPrice: new BN('18446744073709551615'),
			tokenSize: new BN(Math.ceil(1 * 1)),
		};
		const sellerPublicKey = wallet.publicKey;

		const associatedAddress = await getAssociatedTokenAddress(
			MINT,
			sellerPublicKey
		);
		const listingConfig1 = await PublicKey.findProgramAddress(
			[
				Buffer.from('listing_config'),
				sellerPublicKey.toBuffer(),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				associatedAddress.toBuffer(),
				WRAPPED_SOL_MINT.toBuffer(),
				MINT.toBuffer(),
				new BN(1).toArrayLike(Buffer, 'le', 8),
			],
			AUCTIONEER
		);

		const feePayer = await PublicKey.findProgramAddress(
			[
				Buffer.from('auction_house'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				Buffer.from('fee_payer'),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);
		const pda = await PublicKey.findProgramAddress(
			[
				Buffer.from('auctioneer'),
				AUCTIONEER_AUCTION_HOUSE_ADDRESS.toBuffer(),
				auctioneerAuthority.toBuffer(),
			],
			AUCTION_HOUSE_PROGRAM_ID
		);
		const [sellerTradeState, tradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			wallet.publicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'18446744073709551615'
		);
		const [freeTradeState, freeTradeBump] = await getAuctionHouseTradeState(
			AUCTIONEER_AUCTION_HOUSE_ADDRESS,
			wallet.publicKey,
			associatedAddress,
			WRAPPED_SOL_MINT,
			MINT,
			1,
			'0'
		);

		const auctionHouseProgram = AUCTION_HOUSE_PROGRAM_ID;

		const listingConfig = listingConfig1[0];

		const seller = sellerPublicKey;

		const tokenAccount = associatedAddress;

		const tokenMint = MINT;

		const authority = auctionHouseAuthority;

		const auctionHouse = AUCTIONEER_AUCTION_HOUSE_ADDRESS;

		const auctionHouseFeeAccount = feePayer[0];

		const ahAuctioneerPda = pda[0];

		const tradeState = sellerTradeState;

		const accounts: CancelInstructionAccounts = {
			auctionHouseProgram,
			listingConfig,
			seller,
			wallet: wallet.publicKey,
			tokenAccount,
			tokenMint,
			authority,
			auctionHouse,
			auctionHouseFeeAccount,
			tradeState,
			auctioneerAuthority,
			ahAuctioneerPda,
		};
		const cancelInstruction = createCancelInstruction(accounts, args);
		const transaction = new Transaction();

		transaction.add(cancelInstruction);
		transaction.feePayer = wallet.publicKey as any;
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;

		const signedTransaction = await wallet.signTransaction(transaction);

		const txnHash = await connection.sendRawTransaction(
			signedTransaction.serialize(),
			{ skipPreflight: false }
		);
		if (txnHash) {
			const data = { success: true, txnHash };
			return data;
		}
	} catch (e) {
		return e;
	}
};

const updateNft = async (
	tokenUri: string,
	name: string,
	mint: string,
	wallet: any
) => {
	try {
		const mintAddress = new PublicKey(mint);
		const metaplex = getMetaplex();
		metaplex.use(walletAdapterIdentity(wallet));

		const nft = await metaplex.nfts().findByMint({ mintAddress });

		const editNft = await metaplex.nfts().update({
			nftOrSft: nft,
			name: name,
			uri: tokenUri,
		});
		return editNft;
	} catch (err) {
		return err;
	}
};

const uploadDataOnIpfs = async (nftInfo: any) => {
	const formData: any = new FormData();
	for (const val in nftInfo) {
		formData.append(val, nftInfo[val]);
	}

	const res = await handleRequest('post', 'nfts/upload/ipfs', formData);

	return res;
};

const singleLazyMint = async (
	wallet: any,
	tokenUri: string,
	name: string,
	creators: any,
	sellerFeeBasisPoints = 200
) => {
	try {
		const metaplex = getMetaplex();
		metaplex.use(walletAdapterIdentity(wallet));

		const mintNftResponse: any = await metaplex.nfts().create({
			uri: tokenUri,
			sellerFeeBasisPoints,
			name,
			creators,
		});

		return mintNftResponse;
	} catch (err) {
		return err;
	}
};
export {
	mintSingleNft,
	signMessageFromUserForSolana,
	listItemForFixedPriceSolana,
	cancelItemFromListing,
	buyNowFixedPriceAuction,
	listItemForLiveAuction,
	getSolanaBalance,
	bidForLiveAuction,
	executeSaleForLiveAuction,
	claimBidsForLiveAuction,
	cancelListingForLiveAuction,
	updateNft,
	uploadDataOnIpfs,
	singleLazyMint,
};
