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
    const mintNftResponse = await metaplex.nfts().create({
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

export { mintSingleNft };
