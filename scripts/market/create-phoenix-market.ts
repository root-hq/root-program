import * as anchor from "@coral-xyz/anchor";
import * as rootSdk from "../../sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { MarketSizeParams } from "@ellipsis-labs/phoenix-sdk";

require("dotenv").config();

export const handler = async() => {
    //@ts-ignore
    let privateKeyArray = JSON.parse(process.env.PRIVATE_KEY);

    let creatorKeypair = anchor.web3.Keypair.fromSecretKey(
        Uint8Array.from(privateKeyArray)
      );

    const wallet = new NodeWallet(creatorKeypair);

    const RPC_ENDPOINT = process.env.RPC_ENDPOINT;

    const connection = new anchor.web3.Connection(RPC_ENDPOINT);

    const provider = new anchor.AnchorProvider(connection, wallet, {});

    try {
        const params = {
            numOrdersPerSide: new anchor.BN(1024),
            numSeats: new anchor.BN(2177),
            numQuoteLotsPerQuoteUnit: new anchor.BN(1_000_000),
            numBaseLotsPerBaseUnit: new anchor.BN(100),
            tickSizeInQuoteLotsPerBaseUnit: new anchor.BN(10_000),
            takerFeeBps: 1,
            rawBaseUnitsPerBaseUnit: 1,
        } as rootSdk.CreatePhoenixMarketParams;

        let accounts = {
            baseTokenMint: new anchor.web3.PublicKey("StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT"),
            quoteTokenMint: rootSdk.USDC_MAINNET,
            feeCollector: provider.wallet.publicKey
        } as rootSdk.CreatePhoenixMarketAccounts;
    
        let blob = await rootSdk.createPhoenixMarket({
            provider,
            createPhoenixMarketParams: params,
            createPhoenixMarketAccounts: accounts
        });
    
        const res = await rootSdk.executeTransactions({
            provider,
            transactionInfos: blob.transactionInfos
        });
        await res.confirm();
    
        console.log("Res: ", res.signatures);    
    }
    catch(err) {
        console.log(`Error creating market: ${err}`);
    }
}

handler();