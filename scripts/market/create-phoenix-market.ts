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
    
    console.log("creator: ", creatorKeypair.publicKey.toString());

    const wallet = new NodeWallet(creatorKeypair);

    const RPC_ENDPOINT = process.env.RPC_ENDPOINT;

    const connection = rootSdk.getConnection(RPC_ENDPOINT);

    const provider = new anchor.AnchorProvider(connection, wallet, {});

    const params = {
        marketSizeParams: {
            bidsSize: new anchor.BN(512),
            asksSize: new anchor.BN(512),
            numSeats: new anchor.BN(1024)
        } as MarketSizeParams,
        numQuoteLotsPerQuoteUnit: new anchor.BN(512),
        numBaseLotsPerBaseUnit: new anchor.BN(512),
        tickSizeInQuoteLotsPerBaseUnit: new anchor.BN(512),
        takerFeeBps: 12,
        rawBaseUnitsPerBaseUnit: 12,
    } as rootSdk.CreatePhoenixMarketParams;

    const marketKeypair = anchor.web3.Keypair.generate();
    console.log("MarketKeypair: ", marketKeypair.secretKey);
    console.log("MarketKey: ", marketKeypair.publicKey.toString());

    try {
        let accounts = {
            phoenixMarket: marketKeypair.publicKey,
            baseTokenMint: rootSdk.WRAPPED_SOL_MAINNET,
            quoteTokenMint: rootSdk.USDC_MAINNET    
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
    
        console.log("Res: ", res.signatures);    
    }
    catch(err) {
        console.log(`Error creating market: ${err}`);
    }
}

handler();