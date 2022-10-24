import { getMetaplex } from './config';
import { PublicKey, sol, walletAdapterIdentity } from '@metaplex-foundation/js';
import * as anchor from '@project-serum/anchor';
import { BN } from '@project-serum/anchor';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { createSellInstruction } from '@metaplex-foundation/mpl-auctioneer';
import { clusterApiUrl, Connection, Transaction } from '@solana/web3.js';

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

const mintSingleNft = async (
	wallet: any,
	tokenUri: string,
	name: string,
	sellerFeeBasisPoints = 200
) => {
	try {
		const metaplex = getMetaplex();
		console.log('🚀 ~ file: helper.ts ~ line 12 ~ metaplex', metaplex);

		metaplex.use(walletAdapterIdentity(wallet));
		const mintNftResponse: any = await metaplex.nfts().create({
			uri: tokenUri,
			sellerFeeBasisPoints,
			name,
		});
		console.log(
			'🚀 ~ file: helper.ts ~ line 16 ~ mintNftResponse',
			mintNftResponse.mintAddress.toBase58(),
			mintNftResponse.tokenAddress.toBase58(),
			mintNftResponse.response.signature
		);
		return mintNftResponse;
	} catch (err) {
		console.log('🚀 ~ file: helper.ts ~ line 4 ~ mintSingleNft ~ err', err);
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
		console.log(
			'🚀 ~ file: connect-wallet.tsx ~ line 146 ~ signMessageFromUser ~ err',
			err
		);
	}
};

const listItemForFixedPriceSolana = async (
	wallet: any,
	price: number,
	mintAddress: string
) => {
	console.log('checkingggggg');
	return;
	const metaplex = getMetaplex();
	metaplex.use(walletAdapterIdentity(wallet));

	const auctionHouse = await metaplex.auctionHouse().findByAddress({
		address: new PublicKey(AUCTION_HOUSE_ADDRESS),
	});

	console.log(
		'🚀 ~ file: Listing.tsx ~ line 44 ~ listNft ~ auctionHouse',
		auctionHouse
	);

	console.log(auctionHouse.feeAccountAddress.toString(), 'fee account');

	const { listing, sellerTradeState, receipt } = await metaplex
		.auctionHouse()
		.list({
			auctionHouse,
			price: sol(price),
			mintAccount: new PublicKey(mintAddress),
		});

	console.log(
		' listing, sellerTradeState, receipt',
		listing,
		sellerTradeState,
		receipt
	);
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
		console.log('🚀 ~ file: helper.ts ~ line 105 ~ listing ~ listing', listing);

		const cancelListing = await metaplex.auctionHouse().cancelListing({
			listing,
			auctionHouse,
		});
		console.log(
			'🚀 ~ file: helper.ts ~ line 111 ~ cancelListing ~ cancelListing',
			cancelListing
		);
		return cancelListing;
	} catch (err) {
		console.log(
			'🚀 ~ file: helper.ts ~ line 95 ~ cancelItemFromListing ~ err',
			err
		);
	}
};

const buyNowFixedPriceAuction = async (
	wallet: any,
	mintAddress: string,
	tradeStateAddress: string,
	price: number
) => {
	try {
		console.log('Price', price);
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

		console.log('bid==>', bid);

		const purchase = await metaplex.auctionHouse().executeSale({
			auctionHouse,
			bid: bid.bid,
			listing,
		});

		console.log('purchase', purchase);

		return purchase;
	} catch (err) {
		console.log(
			'🚀 ~ file: helper.ts ~ line 134 ~ buyNowFixedPriceAuction ~ err',
			err
		);
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
		console.log('live auction implementation');
		return;
		const MINT = new PublicKey(mintAddress);
		const connection = new Connection(clusterApiUrl('devnet'));
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

		const auctionHouseAuthority = new PublicKey(
			'Eo6psn7nEnmtspqdi4ak4oFw2m9v7LJinsook6sLfk6'
		);
		console.log('checkingggg', listingConfig[0].toBase58());

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
			startTime: 1665598784,
			endTime: 1666335326,
			reservePrice: 1,
			minBidIncrement: 1,
			timeExtPeriod: 1,
			timeExtDelta: 1,
			allowHighBidCancel: true,
		};

		const sellInstruction = await createSellInstruction(accounts, args);
		const transaction = new Transaction();

		transaction.add(sellInstruction);
		transaction.feePayer = wallet.publicKey as any;
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;

		const signedTransaction = await wallet.signTransaction(transaction);

		console.log(
			'🚀 ~ file: Sell.tsx ~ line 165 ~ sellFunction ~ signedTransaction',
			signedTransaction
		);
		const txtId = await connection.sendRawTransaction(
			signedTransaction.serialize(),
			{ skipPreflight: true }
		);
		console.log('🚀 ~ file: Sell.tsx ~ line 173 ~ sellFunction ~ txtId', txtId);
	} catch (e) {
		console.log('🚀 ~ file: Sell.tsx ~ line 177 ~ sellFunction ~ e', e);
	}
};

export {
	mintSingleNft,
	signMessageFromUserForSolana,
	listItemForFixedPriceSolana,
	cancelItemFromListing,
	buyNowFixedPriceAuction,
	listItemForLiveAuction,
};
