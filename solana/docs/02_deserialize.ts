import { PublicKey } from '@solana/web3.js'

import { getMint, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'

const address = new PublicKey('C33qt1dZGZSsqTrHdtLKXPZNoxs6U1ZBfyDkzmj6mXeR')
// getMint helper function to automatically deserialize the data field of the Mint account
const mintData = await getMint(pg.connection, address, 'confirmed', TOKEN_2022_PROGRAM_ID)

console.log(mintData)

// {
//   address: { _bn: { negative: 0, words: [Object], length: 10, red: null } },
//   mintAuthority: { _bn: { negative: 0, words: [Object], length: 10, red: null } },
//   supply: {},
//   decimals: 2,
//   isInitialized: true,
//   freezeAuthority: null,
//   tlvData: <Buffer 12 00 40 00 2c 5b 90 b2 42 0c 89 a8 fc 3b 2f d6 15 a8 9d 1e 54 4f 59 49 e8 9e 35 8f ab 88 64 9f 5b db 9c 74 a3 f6 ee 9f 21 a9 76 43 8a ee c4 46 43 3d ... >
// }

//
// - The getMint function deserializes the account data into the Mint data type defined in
//   the Token Extensions program source code.
//
// . address - The Mint account's address
// . mintAuthority - The authority allowed to mint new tokens
// . supply - The total supply of tokens
// . decimals - The number of decimal places for the token
// . isInitialized - Whether the Mint data has been initialized
// . freezeAuthority - The authority allowed to freeze token accounts
// . tlvData - Additional data for Token Extensions (requires further deserialization)
