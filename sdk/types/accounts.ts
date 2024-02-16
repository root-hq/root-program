import { web3 } from "@coral-xyz/anchor";

export interface CreatePhoenixMarketAccounts {
    phoenixMarket: web3.PublicKey;
    baseTokenMint: web3.PublicKey;
    quoteTokenMint: web3.PublicKey;
    feeCollector: web3.PublicKey;
}