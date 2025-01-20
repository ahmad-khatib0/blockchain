use crate::errors::TicTacToeError;
use anchor_lang::prelude::*;
use num_derive::*;
use num_traits::*;

#[account]
/// This is the game account.
pub struct Game {
    players: [Pubkey; 2],          // (32 * 2)
    turn: u8,                      // 1
    board: [[Option<Sign>; 3]; 3], // 9 * (1 + 1) = 18
    state: GameState,              // 32 + 1
}

// Anchor uses the borsh specification to (de)serialize its state accounts.
// Let us briefly explain how we arrived at the Game::MAXIMUM_SIZE:
// . Pubkey has a length of 32 bytes so 2*32 = 64
// . u8 as a vector has a length of 1
// . the board has a length of (9 * (1 + 1)). We know the board has 9 tiles (-> 9) of type
//   Option which borsh serializes with 1 byte (set to 1 for Some and 0 for None) plus the size
//   of whatever's in the Option. In this case, it's a simple enum with types that don't hold more
//   types so the maximum size of the enum is also just 1 (for its discriminant). In total that
//   means we get `9 (tiles) * (1 (Option) + 1(Sign discriminant))`.
// . state is also an enum so we need 1 byte for the discriminant. We have to init the account with
//   the maximum size and the maximum size of an enum is the size of its biggest variant. In this
//   case that's the winner variant which holds a Pubkey. A Pubkey is 32 bytes long so the size of
//   state is 1 (discriminant) + 32 (winner pubkey)
//   (MAXIMUM_SIZE is a const variable so specifying it in terms of a sum of the sizes of
//    Game's members' fields does not incur any runtime cost).
//
//  In addition to the game's size, we have to add another 8 to the space. This is space for the
//  internal discriminator which anchor sets automatically. In short, the discriminator is how
//  anchor can differentiate between different accounts of the same program. For more information,
//  check out the Anchor space reference: https://www.anchor-lang.com/docs/space
//
//  (What about using mem::size_of<Game>()? This almost works but not quite. The issue is that
//  borsh will always serialize an option as 1 byte for the variant identifier and then additional
//  x bytes for the content if it's Some. Rust uses null-pointer optimization to make Option's
//  variant identifier 0 bytes when it can, so an option is sometimes just as big as its contents.
//  This is the case with Sign. This means the MAXIMUM_SIZE could also be expressed as:
//  mem::size_of<Game>() + 9.)

impl Game {
    pub const MAXIMUM_SIZE: usize = (32 * 2) + 1 + (9 * (1 + 1)) + (32 + 1);

    pub fn start(&mut self, players: [Pubkey; 2]) -> Result<()> {
        require_eq!(self.turn, 0, TicTacToeError::GameAlreadyOver);
        self.players = players;
        self.turn = 1;
        Ok(())
    }

    pub fn is_active(&self) -> bool {
        return self.state == GameState::Active;
    }

    pub fn current_player_index(&self) -> usize {
        ((self.turn - 1) % 2) as usize
    }

    pub fn current_player(&self) -> Pubkey {
        self.players[self.current_player_index()]
    }

    pub fn play(&mut self, tile: &Tile) -> Result<()> {
        require!(self.is_active(), TicTacToeError::GameAlreadyOver);

        match tile {
            tile @ Tile {
                row: 0..=2,
                column: 0..=2,
            } => match self.board[tile.row as usize][tile.column as usize] {
                Some(_) => return Err(TicTacToeError::TileAlreadySet.into()),
                None => {
                    self.board[tile.row as usize][tile.column as usize] =
                        Some(Sign::from_usize(self.current_player_index()).unwrap());
                }
            },
            _ => return Err(TicTacToeError::TileOutOfBounds.into()),
        }

        self.update_state();

        if GameState::Active == self.state {
            self.turn += 1;
        }

        Ok(())
    }

    fn is_winning_trio(&self, trio: [(usize, usize); 3]) -> bool {
        let [first, second, third] = trio;
        self.board[first.0][first.1].is_some()
            && self.board[first.0][first.1] == self.board[second.0][second.1]
            && self.board[first.0][first.1] == self.board[third.0][third.1]
    }

    // what happens when play is called:
    // 1. Return error if game is over or return error if given row or column are outside the
    //    3x3 board or return error if tile on board is already set
    // 2. Determine current player and set tile to X or O
    // 3. Update game state
    // 4. If game is still active, increase the turn
    fn update_state(&mut self) {
        for i in 0..=2 {
            // three of the same in one row
            if self.is_winning_trio([(i, 0), (i, 1), (i, 2)]) {
                self.state = GameState::Won {
                    winner: self.current_player(),
                };
                return;
            }
            // three of the same in one column
            if self.is_winning_trio([(0, i), (1, i), (2, i)]) {
                self.state = GameState::Won {
                    winner: self.current_player(),
                };
                return;
            }
        }

        // three of the same in one diagonal
        if self.is_winning_trio([(0, 0), (1, 1), (2, 2)])
            || self.is_winning_trio([(0, 2), (1, 1), (2, 0)])
        {
            self.state = GameState::Won {
                winner: self.current_player(),
            };
            return;
        }

        // reaching this code means the game has not been won,
        // so if there are unfilled tiles left, it's still active
        for row in 0..=2 {
            for column in 0..=2 {
                if self.board[row][column].is_none() {
                    return;
                }
            }
        }

        // game has not been won game has no more free tiles -> game ends in a tie
        self.state = GameState::Tie;
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum GameState {
    Active,
    Tie,
    Won { winner: Pubkey },
}

// AnchorSerialize, AnchorDeserialize: All types that are used in types that are marked
// with #[account] must implement these two traits (or be marked with #[account] themselves)
#[derive(
    AnchorSerialize, AnchorDeserialize, FromPrimitive, ToPrimitive, Copy, Clone, PartialEq, Eq,
)]
pub enum Sign {
    X,
    O,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct Tile {
    row: u8,
    column: u8,
}
