use anchor_lang::prelude::*;

use crate::state::game::*;

// Now think about which accounts are needed to set up the game. Clearly, we need the game account.
// Before we can fill it with values, we need to create it. For that, we use the init constraint.
// #[derive(Accounts)]
// pub struct SetupGame<'info> {
//     #[account(init)]
//     pub game : Account<'info , Game>
// }

// init immediately shouts at us and tells us to add a payer. Why do we need it? Because init
// creates rent-exempt accounts and someone has to pay for that. Naturally, if we want to take
// money from someone, we should make them sign as well as mark their account as mutable.
#[derive(Accounts)]
pub struct SetupGame<'info> {
    // #[account(init, payer = player_one)]
    // pub game: Account<'info, Game>,
    #[account(mut)]
    pub player_one: Signer<'info>,

    // init is not happy yet. It wants the system program to be inside the struct
    // because init creates the game account by making a call to that program:
    pub system_program: Program<'info, System>,

    // There's one more thing to do to complete SetupGame. Every account is created
    // with a fixed amount of space, so we have to add this space to the instruction as well.
    #[account(init, payer = player_one , space= 8 + Game::MAXIMUM_SIZE)]
    pub game: Account<'info, Game>,
}

/// Why didn't we just add player_two as an account in the accounts struct? There are two reasons
/// for this. First, adding it there requires a little more space in the transaction that saves
/// whether the account is writable and whether it's a signer. But we care about neither the
/// mutability of the account nor whether it's a signer. We just need its address. This brings us to
/// the second and more important reason: Simultaneous network transactions can affect each other if
/// they share the same accounts. For example, if we add player_two to the accounts struct, during
/// our transaction, no other transaction can edit player_two's account. Therefore, we block all
/// other transactions that want to edit player_two's account, even though we neither want to read
/// from nor write to the account. We just care about its address!
pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
    ctx.accounts
        .game
        .start([ctx.accounts.player_one.key(), player_two])
}
