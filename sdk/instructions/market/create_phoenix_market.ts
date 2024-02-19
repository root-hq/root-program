import * as anchor from "@coral-xyz/anchor";
import {
  WriteActionArgs,
  WriteActionResult,
  getRootProgram,
  requestComputeUnits,
  getMarketAccountSize,
} from "../../utils";
import {
  CreatePhoenixMarketAccounts,
  CreatePhoenixMarketParams,
} from "../../types";
import * as phoenix from "@ellipsis-labs/phoenix-sdk";
import { getTokenVaultAddress } from "../../utils/pda";
import { SystemProgram } from "@solana/web3.js";
import { PHOENIX_SEAT_MANAGER_PROGRAM_ID } from "../../constants";

export interface CreatePhoenixMarketArgs extends WriteActionArgs {
  createPhoenixMarketParams: CreatePhoenixMarketParams;
  createPhoenixMarketAccounts: CreatePhoenixMarketAccounts;
}

export interface CreatePhoenixMarketResult extends WriteActionResult {
  phoenixMarket: anchor.web3.PublicKey;
}

export const createPhoenixMarket = async ({
  provider,
  createPhoenixMarketParams,
  createPhoenixMarketAccounts,
}: CreatePhoenixMarketArgs): Promise<CreatePhoenixMarketResult> => {
  let rootProgram = getRootProgram(provider);

  const marketKeypair = anchor.web3.Keypair.generate();
  console.log("MarketKeypair: ", marketKeypair.secretKey);
  console.log("MarketKey: ", marketKeypair.publicKey.toString());

  let seatManager = phoenix.getSeatManagerAddress(marketKeypair.publicKey);
  let seatDepositCollector = phoenix.getSeatDepositCollectorAddress(
    marketKeypair.publicKey
  );
  let logAuthority = phoenix.getLogAuthority();

  const basePhoenixVault = getTokenVaultAddress(
    marketKeypair.publicKey,
    createPhoenixMarketAccounts.baseTokenMint
  );
  const quotePhoenixVault = getTokenVaultAddress(
    marketKeypair.publicKey,
    createPhoenixMarketAccounts.quoteTokenMint
  );

  let transaction = new anchor.web3.Transaction();
  let reqComputeUnitsIx = requestComputeUnits(1_400_000, 10);
  for (let ix of reqComputeUnitsIx) {
    transaction.add(ix);
  }

  let space = getMarketAccountSize(
    createPhoenixMarketParams.numOrdersPerSide.toNumber(),
    createPhoenixMarketParams.numSeats.toNumber()
  );

  const rentExemptionAmount =
    await provider.connection.getMinimumBalanceForRentExemption(space);

  const createAccountParams = {
    fromPubkey: provider.wallet.publicKey,
    newAccountPubkey: marketKeypair.publicKey,
    lamports: rentExemptionAmount,
    space,
    programId: phoenix.PROGRAM_ID,
  };

  let createAccountIx = SystemProgram.createAccount(createAccountParams);
  transaction.add(createAccountIx);

  try {
    const ix = await rootProgram.methods
      .createPhoenixMarket(
        createPhoenixMarketParams.numOrdersPerSide,
        createPhoenixMarketParams.numSeats,
        createPhoenixMarketParams.numQuoteLotsPerQuoteUnit,
        createPhoenixMarketParams.numBaseLotsPerBaseUnit,
        createPhoenixMarketParams.tickSizeInQuoteLotsPerBaseUnit,
        createPhoenixMarketParams.takerFeeBps,
        createPhoenixMarketParams.rawBaseUnitsPerBaseUnit
      )
      .accounts({
        creator: provider.wallet.publicKey,
        phoenixMarket: marketKeypair.publicKey,
        baseTokenMint: createPhoenixMarketAccounts.baseTokenMint,
        quoteTokenMint: createPhoenixMarketAccounts.quoteTokenMint,
        feeCollector: createPhoenixMarketAccounts.feeCollector,
        seatManager,
        seatDepositCollector,
        logAuthority,
        baseVault: basePhoenixVault,
        quoteVault: quotePhoenixVault,
        phoenixSeatManagerProgram: PHOENIX_SEAT_MANAGER_PROGRAM_ID,
        phoenixProgram: phoenix.PROGRAM_ID,
      })
      .signers([marketKeypair])
      .instruction();

    transaction.add(ix);

    return {
      phoenixMarket: marketKeypair.publicKey,
      transactionInfos: [
        {
          transaction,
          signers: [marketKeypair],
        },
      ],
    };
  } catch (err) {
    console.log(`Err: ${err}`);
  }
};
