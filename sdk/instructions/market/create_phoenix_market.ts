import * as anchor from "@coral-xyz/anchor";
import { WriteActionArgs, WriteActionResult, getRootProgram, requestComputeUnits } from "../../utils";
import { CreatePhoenixMarketAccounts, CreatePhoenixMarketParams } from "../../types";
import * as phoenix from "@ellipsis-labs/phoenix-sdk";

export interface CreatePhoenixMarketArgs extends WriteActionArgs {
    createPhoenixMarketParams: CreatePhoenixMarketParams;
    createPhoenixMarketAccounts: CreatePhoenixMarketAccounts;
}

export interface CreatePhoenixMarketResult extends WriteActionResult {
    phoenixMarket: anchor.web3.PublicKey;
}

export const createPhoenixMarket = async({
    provider,
    createPhoenixMarketParams,
    createPhoenixMarketAccounts
}: CreatePhoenixMarketArgs): Promise<CreatePhoenixMarketResult> => {
    let rootProgram = getRootProgram(provider);

    let seatManager = phoenix.getSeatManagerAddress(createPhoenixMarketAccounts.phoenixMarket);
    let seatDepositCollector = phoenix.getSeatDepositCollectorAddress(createPhoenixMarketAccounts.phoenixMarket);
    let logAuthority = phoenix.getLogAuthority();

    const phoenixClient = await phoenix.Client.createWithMarketAddresses(
        provider.connection,
        [createPhoenixMarketAccounts.phoenixMarket]
      );
    
    await phoenixClient.addMarket(createPhoenixMarketAccounts.phoenixMarket.toBase58());
    const phoenixMarketState = phoenixClient.marketStates.get(createPhoenixMarketAccounts.phoenixMarket.toBase58());

    const basePhoenixVault = phoenixMarketState.data.header.baseParams.vaultKey;
    const quotePhoenixVault = phoenixMarketState.data.header.quoteParams.vaultKey;


    let transaction = new anchor.web3.Transaction();
    let reqComputeUnitsIx = requestComputeUnits(1_400_000, 10);
    for(let ix of reqComputeUnitsIx) {
        transaction.add(ix);
    }
    
    try {
        const ix = await rootProgram
            .methods
            .createPhoenixMarket({
                marketSizeParams: createPhoenixMarketParams.marketSizeParams,
                numQuoteLotsPerQuoteUnit: createPhoenixMarketParams.numQuoteLotsPerQuoteUnit,
                numBaseLotsPerBaseUnit: createPhoenixMarketParams.numBaseLotsPerBaseUnit,
                tickSizeInQuoteLotsPerBaseUnit: createPhoenixMarketParams.tickSizeInQuoteLotsPerBaseUnit,
                takerFeeBps: createPhoenixMarketParams.takerFeeBps,
                rawBaseUnitsPerBaseUnit: createPhoenixMarketParams.rawBaseUnitsPerBaseUnit
            })
            .accounts({
                creator: provider.wallet.publicKey,
                phoenixMarket: createPhoenixMarketAccounts.phoenixMarket,
                baseTokenMint: createPhoenixMarketAccounts.baseTokenMint,
                quoteTokenMint: createPhoenixMarketAccounts.quoteTokenMint,
                feeCollector: createPhoenixMarketAccounts.feeCollector,
                seatManager,
                seatDepositCollector,
                logAuthority,
                baseVault: basePhoenixVault,
                quoteVault: quotePhoenixVault,
                phoenixProgram: phoenix.PROGRAM_ID
            })
            .instruction();

        transaction.add(ix);

        return {
            phoenixMarket: createPhoenixMarketAccounts.phoenixMarket,
            transactionInfos: [
                {
                    transaction
                }
            ]
        }
    }
    catch(err) {
        console.log(`Err: ${err}`);
    }
}