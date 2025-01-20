use anchor_lang::prelude::*;
use state::game::Tile;

use instructions::*;

pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("HZrMRg8eUCkzDeBS2cTKLLnGgaXxBqCnUZ3wxC1doNcR");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
        instructions::setup_game::setup_game(ctx, player_two)
    }

    pub fn play(ctx: Context<Play>, tile: Tile) -> Result<()> {
        instructions::play::play(ctx, tile)
    }
}
