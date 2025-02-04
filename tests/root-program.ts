import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { RootProgram } from "../target/types/root_program";

describe("root-program", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.RootProgram as Program<RootProgram>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
