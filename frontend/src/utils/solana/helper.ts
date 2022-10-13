import { getMetaplex } from "./config";
import { walletAdapterIdentity } from "@metaplex-foundation/js";

const mintSingleNft = async (
  wallet: any,
  tokenUri: string,
  name: string,
  sellerFeeBasisPoints: number = 200
) => {
  try {
    const metaplex = getMetaplex();

    metaplex.use(walletAdapterIdentity(wallet));
    const mintNftResponse: any = await metaplex.nfts().create({
      uri: tokenUri,
      sellerFeeBasisPoints,
      name,
    });
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

export { mintSingleNft, signMessageFromUserForSolana };
