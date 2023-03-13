import { Connection } from "@metaplex/js";
import { endpoint } from "./getChainNetwork";
import { LAMPORTS_PER_SOL, PublicKey, Keypair, SystemProgram, TransactionInstruction, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, AccountLayout, MintLayout } from '@solana/spl-token';


export async function getSenderAta(wallet: any) {
    const mint = new PublicKey(process.env.REACT_APP_CUSTOM_NATIVE_MINT || "");
    const adminPublicKey : any =  new PublicKey(process.env.REACT_APP_ADMIN_WALLET_ADDRESS || "");

    const senderAta = (
        await PublicKey.findProgramAddress(
            [
                adminPublicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            ASSOCIATED_TOKEN_PROGRAM_ID,
        )
    )[0];

    return senderAta
}

export const getUserBalance = async (wallet: any) => {
    const connection: Connection = new Connection(endpoint.url);
    const accountAta = await getSenderAta(wallet);
    const balance = await connection.getTokenAccountBalance(accountAta);
    console.log("balance ===", balance);
    return (Number(balance.value.amount) / LAMPORTS_PER_SOL);
  };