use crate::{errors::TicTacToeError, state::game::*};
use anchor_lang::prelude::*;

// The Play accounts struct is straightforward. We need the game and a player:
// player needs to sign or someone else could play for the player.
#[derive(Accounts)]
pub struct Play<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    pub player: Signer<'info>,
}

pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
    let game = &mut ctx.accounts.game;

    // We've checked in the accounts struct that the player account has signed the transaction, but
    // we do not check that it is the player we expect. That's what the require_keys_eq check for.
    require_keys_eq!(
        game.current_player(),
        ctx.accounts.player.key(),
        TicTacToeError::NotPlayersTurn
    );

    game.play(&tile)
}
