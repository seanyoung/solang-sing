import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SingHello } from "../target/types/sing_hello";

describe("sing_hello", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const dataAccount = anchor.web3.Keypair.generate();
  const wallet = provider.wallet;

  const program = anchor.workspace.SingHello as Program<SingHello>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.new()
      .accounts({ dataAccount: dataAccount.publicKey })
      .signers([dataAccount]).rpc();
    console.log("Your transaction signature", tx);

    const val1 = await program.methods.get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val1);

    await program.methods.flip()
      .accounts({ dataAccount: dataAccount.publicKey })
      .rpc();

    const val2 = await program.methods.get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val2);

    await program.methods.sing("oh solo mio")
      .accounts({ dataAccount: dataAccount.publicKey })
      .rpc();

    const val3 = await program.methods.line()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log(`line: ${val3}`);
  });
});