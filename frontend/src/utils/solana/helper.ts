import { getMetaplex } from './config';
import { PublicKey, sol, walletAdapterIdentity } from '@metaplex-foundation/js';

const AUCTION_HOUSE_ADDRESS = 'HGLp7o4LTbKCsrLPRLogfwmLVFN7LzpuCgpgJ3W6sNVP';

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

export {
	mintSingleNft,
	signMessageFromUserForSolana,
	listItemForFixedPriceSolana,
	cancelItemFromListing,
	buyNowFixedPriceAuction,
};
