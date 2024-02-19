import * as anchor from "@coral-xyz/anchor";
import * as idl from "../store/idl/root_program.json";
import { ROOT_PROGRAM_ID } from "../constants/addresses";
import { RootProgram } from "../store/types/root_program";
import { getConnection } from "./solana";

export const getRootProgram = (provider: anchor.AnchorProvider) => {
  return new anchor.Program(
    // @ts-ignore
    idl,
    ROOT_PROGRAM_ID,
    provider
  ) as anchor.Program<RootProgram>;
};

export const getRootProgramWithoutProvider = (network: string) => {
  const conn = new anchor.web3.Connection(network);

  const program = new anchor.Program(idl as anchor.Idl, ROOT_PROGRAM_ID, {
    connection: conn,
  });

  return program;
};
