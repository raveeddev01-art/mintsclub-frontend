import { clusterApiUrl } from "@solana/web3.js";
import { ENV as ChainId } from "@solana/spl-token-registry";
const solanaNetwork: any = process.env.REACT_APP_SOLANA_NETWORK;

export const endpoint = {
  name: solanaNetwork,
  label: solanaNetwork,
  url: clusterApiUrl(solanaNetwork),
  chainId: ChainId.Devnet,
};