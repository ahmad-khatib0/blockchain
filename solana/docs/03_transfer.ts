import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js'

// Set your Playground wallet as the sender
const sender = pg.wallet.keypair
// Creates a new keypair as the receiver
const receiver = new Keypair()

// Constructs a transfer instruction to transfer 0.01 SOL
const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver.publicKey,
  lamports: 0.01 * LAMPORTS_PER_SOL,
})

// Builds a transaction including the transfer instruction
const transaction = new Transaction().add(transferInstruction)

// Sends and confirms the transaction
const transactionSignature = await sendAndConfirmTransaction(pg.connection, transaction, [sender])

// a link to the SolanaFM explorer in the Playground terminal to view the transaction details
console.log('Transaction Signature:', `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`)
