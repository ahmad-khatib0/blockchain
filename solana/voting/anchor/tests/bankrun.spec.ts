import { startAnchor } from 'solana-bankrun'
import { BankrunProvider } from 'anchor-bankrun'
import { PublicKey } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'
import { BN, Program } from '@coral-xyz/anchor'

const IDL = require('../target/idl/voting.json')
import { Voting } from '../target/types/voting'

const VOTING_PROGRAM_ID = new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')

describe('Create a system account', () => {
  test('bankrun', async () => {
    const context = await startAnchor('', [{ name: 'voting', programId: VOTING_PROGRAM_ID }], [])
    const provider = new BankrunProvider(context)

    const votingProgram = new Program<Voting>(IDL, provider)

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from('poll'), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingProgram.programId,
    )

    await votingProgram.methods
      .initializePoll(
        new anchor.BN(1), // big number
        new anchor.BN(0),
        new anchor.BN(1759508293),
        'test-poll',
        'description',
      )
      .rpc()

    // fetch the pollAccount using the pollAccount
    const pollAccount = await votingProgram.account.pollAccount.fetch(pollAddress)
    console.log(pollAccount)
  })
})
