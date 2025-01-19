import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js'

import {
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token'

// Sets up your Playground wallet and a connection to the Solana devnet
const wallet = pg.wallet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

// Generate keypair to use as address of mint account
const mint = new Keypair()

// Calculate minimum lamports for space required by mint account
const rentLamports = await getMinimumBalanceForRentExemptMint(connection)

// Instruction to create new account with space for new mint account:
// Creates an instruction to create a new account for the mint, specifying the Token
// Extensions program (TOKEN_2022_PROGRAM_ID) as the owner of the new account
const createAccountInstruction = SystemProgram.createAccount({
  fromPubkey: wallet.publicKey,
  newAccountPubkey: mint.publicKey,
  space: MINT_SIZE,
  lamports: rentLamports,
  programId: TOKEN_2022_PROGRAM_ID,
})

// Instruction to initialize mint account data
const initializeMintInstruction = createInitializeMint2Instruction(
  mint.publicKey,
  2, // decimals
  wallet.publicKey, // mint authority
  wallet.publicKey, // freeze authority
  TOKEN_2022_PROGRAM_ID,
)

// Build transaction with instructions to create new account and initialize mint account
// Adds both instructions to a single transaction
const transaction = new Transaction().add(createAccountInstruction, initializeMintInstruction)

// Sends and confirms the transaction. Both the wallet and mint keypair are passed in as signers
// on the transaction. The wallet is required to pay for the creation of the new account.
// The mint keypair is required because we are using its publickey as the address of the new account.
const transactionSignature = await sendAndConfirmTransaction(connection, transaction, [
  wallet.keypair, // payer
  mint, // mint address keypair
])

// One for the transaction details
console.log('\nTransaction Signature:', `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`)
// One for the newly created mint account
console.log('\nMint Account:', `https://solana.fm/address/${mint.publicKey}?cluster=devnet-solana`)
