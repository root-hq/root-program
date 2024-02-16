import { MarketSizeParams } from "@ellipsis-labs/phoenix-sdk";
import { BN } from "@coral-xyz/anchor";

export interface CreatePhoenixMarketParams {
    marketSizeParams: MarketSizeParams;
    numQuoteLotsPerQuoteUnit: BN;
    numBaseLotsPerBaseUnit: BN;
    tickSizeInQuoteLotsPerBaseUnit: BN;
    takerFeeBps: number;
    rawBaseUnitsPerBaseUnit: number;
}