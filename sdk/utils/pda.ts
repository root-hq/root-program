import { web3 } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "@ellipsis-labs/phoenix-sdk";

export const getTokenVaultAddress = (
  market: web3.PublicKey,
  mint: web3.PublicKey
) => {
  let [address] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), market.toBuffer(), mint.toBuffer()],
    PROGRAM_ID
  );

  return address;
};
