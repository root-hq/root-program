import { web3 } from "@coral-xyz/anchor";

export interface CreatePhoenixMarketAccounts {
    baseTokenMint: web3.PublicKey;
    quoteTokenMint: web3.PublicKey;
    feeCollector: web3.PublicKey;
}