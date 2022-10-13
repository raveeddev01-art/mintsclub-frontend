import { getMetaplex } from "./config";
import { sol, walletAdapterIdentity } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

const mintSingleNft = async (
  wallet: any,
  tokenUri: string,
  name: string,
  sellerFeeBasisPoints: number = 200
) => {
  try {
    const metaplex = getMetaplex();

    metaplex.use(walletAdapterIdentity(wallet));
    const mintNftResponse = await metaplex
      .nfts()
      .create({
        uri: tokenUri,
        sellerFeeBasisPoints,
        name,
      })
      .run();
    console.log(
      "🚀 ~ file: helper.ts ~ line 16 ~ mintNftResponse",
      mintNftResponse.mintAddress.toBase58(),
      mintNftResponse.tokenAddress.toBase58(),
      mintNftResponse.response.signature
    );
    return mintNftResponse;
  } catch (err) {
    console.log("🚀 ~ file: helper.ts ~ line 4 ~ mintSingleNft ~ err", err);
  }
};

const listFixedPriceNft = async (
  wallet: any,
  mintAddress: string,
  price: number
) => {
  try {
    const AUCTION_HOUSE_ADDRESS =
      "HGLp7o4LTbKCsrLPRLogfwmLVFN7LzpuCgpgJ3W6sNVP";
    // HGLp7o4LTbKCsrLPRLogfwmLVFN7LzpuCgpgJ3W6sNVP => AuctionHouse Address
    const metaplex = getMetaplex();
    metaplex.use(walletAdapterIdentity(wallet));
    const auctionHouse = await metaplex
      .auctions()
      .findAuctionHouseByAddress(new PublicKey(AUCTION_HOUSE_ADDRESS))
      .run();
    console.log("🚀 ~ file: helper.ts ~ line 50 ~ auctionHouse", auctionHouse);

    console.log(
      "AuctionHouse FeeAddress => ",
      auctionHouse.authorityAddress.toString()
    );

    const { listing, sellerTradeState, receipt } = await metaplex
      .auctions()
      .for(auctionHouse)
      .list({
        mintAccount: new PublicKey(mintAddress),
        price: sol(price),
        printReceipt: true,
      })
      .run();

    console.log(
      "successfully listed your nft",
      listing,
      sellerTradeState,
      receipt
    );

    console.log("trade state address==>", listing.tradeStateAddress.toBase58());

    return listing.tradeStateAddress.toBase58();
  } catch (err) {
    console.log("🚀 ~ file: helper.ts ~ line 39 ~ err", err);
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

      const signatureBase64 = Buffer.from(signature).toString("base64");
      return { publicAddress: connectedAddress, signature: signatureBase64 };
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: connect-wallet.tsx ~ line 146 ~ signMessageFromUser ~ err",
      err
    );
  }
};

export { mintSingleNft, listFixedPriceNft, signMessageFromUserForSolana };
