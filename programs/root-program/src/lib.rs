use anchor_lang::prelude::*;

pub mod instructions;


declare_id!("9TgBv6Pqaf7nUjzh3aQMN366EPiiNfft4x9xdC2F6CLe");

#[program]
pub mod root_program {
    use super::*;
    pub use instructions::*;

    pub fn create_phoenix_market(
        ctx: Context<CreatePhoenixMarket>,
        params: CreatePhoenixMarketParams
    ) -> Result<()> {
        instructions::create_phoenix_market(
            ctx,
            params
        )
    }
}

#[derive(Accounts)]
pub struct Initialize {}
