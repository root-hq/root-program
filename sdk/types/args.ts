import { MarketSizeParams } from "@ellipsis-labs/phoenix-sdk";
import { BN } from "@coral-xyz/anchor";

export interface CreatePhoenixMarketParams {
  numOrdersPerSide: BN;
  numSeats: BN;
  numQuoteLotsPerQuoteUnit: BN;
  numBaseLotsPerBaseUnit: BN;
  tickSizeInQuoteLotsPerBaseUnit: BN;
  takerFeeBps: number;
  rawBaseUnitsPerBaseUnit: number;
}
