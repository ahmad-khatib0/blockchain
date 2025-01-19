import { PublicKey } from '@solana/web3.js'

// Gets your Playground wallet's address
// const address = pg.wallet.publicKey
// const accountInfo = await pg.connection.getAccountInfo(address)
// console.log(JSON.stringify(accountInfo, null, 2))
//
// {
//   "data": {
//     "type": "Buffer",
//     "data": []
//   },
//   "executable": false,
//   "lamports": 10000000000,
//   "owner": "11111111111111111111111111111111",
//   "rentEpoch": 18446744073709552000,
//   "space": 0
// }
//
// . data - This field contains what we generally refer to as the account "data". For a wallet,
//   it's empty (0 bytes), but other accounts use this field to store any arbitrary data as a
//   serialized buffer of bytes.
//
// . executable - A flag that indicates whether the account is an executable program.
//   For wallets and any accounts that store state, this is false.
//
// . owner - This field shows which program controls the account. For wallets, it's always
//   the System Program, with the address 11111111111111111111111111111111.
//
// . lamports - The account's balance in lamports (1 SOL = 1,000,000,000 lamports).
//
// . rentEpoch - A legacy field related to Solana's deprecated rent
//   collection mechanism (currently not in use).
//
// . space - Indicates byte capacity (length) of the data field, but is not a field in
//   the AccountInfo type

// the address of the Token Extensions Program account.
const address = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb')
const accountInfo = await pg.connection.getAccountInfo(address)
console.log(JSON.stringify(accountInfo, null, 2))

// {
//   "data": {
//     "type": "Buffer",
//     "data": [
//       2, 0, 0, 0, 190, 51, 145, 195, 15, 69, 134, 171, 198, 7, 157, 157, 157, 235, 231, 78, 23,
//       201, 236, 115, 99, 242, 110, 99, 253, 155, 110, 169, 190, 110, 86, 51
//     ]
//   },
//   "executable": true,
//   "lamports": 1141440,
//   "owner": "BPFLoaderUpgradeab1e11111111111111111111111",
//   "rentEpoch": 18446744073709552000,
//   "space": 36
// }

// The Token Extensions program is an executable program account, but note that it has the same
// AccountInfo structure. Key differences in the AccountInfo:
//
// executable - Set to true, indicating this account represents an executable program.
// . data - Contains serialized data (unlike the empty data in a wallet account). The data
//   for a program account stores the address of another account (Program Executable Data Account)
//   that contains the program's bytecode.
//
// . owner - The account is owned by the Upgradable BPF Loader
//   (BPFLoaderUpgradeab1e11111111111111111111111), a special program that manages executable accounts.
//

// Examine a Mint account, which represents a unique token on the Solana network.
// const address = new PublicKey("C33qt1dZGZSsqTrHdtLKXPZNoxs6U1ZBfyDkzmj6mXeR");
// const accountInfo = await pg.connection.getAccountInfo(address);
// console.log(JSON.stringify(accountInfo, null, 2));

// {
//   "data": {
//     "type": "Buffer",
//     "data": [
//       1, 0,
//       //... additional bytes
//       0, 0 ]
//   },
//   "executable": false,
//   "lamports": 4176000,
//   "owner": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
//   "rentEpoch": 18446744073709552000,
//   "space": 430
// }

// Key differences in the AccountInfo:
// . owner - The mint account is owned by the Token Extensions program (TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb).
//
// . executable - Set to false, as this account stores state rather than executable code.
//
// . data: Contains serialized data about the token (mint authority, supply, decimals, etc.).
