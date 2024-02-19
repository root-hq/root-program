use anchor_lang::prelude::*;

pub mod instructions;

declare_id!("9TgBv6Pqaf7nUjzh3aQMN366EPiiNfft4x9xdC2F6CLe");

#[program]
pub mod root_program {
    use super::*;
    pub use instructions::*;

    pub fn create_phoenix_market(
        ctx: Context<CreatePhoenixMarket>,
        num_orders_per_side: u64,
        num_seats: u64,
        num_quote_lots_per_quote_unit: u64,
        num_base_lots_per_base_unit: u64,
        tick_size_in_quote_lots_per_base_unit: u64,
        taker_fee_bps: u16,
        raw_base_units_per_base_unit: u32,
    ) -> Result<()> {
        instructions::create_phoenix_market(
            ctx,
            num_orders_per_side,
            num_seats,
            num_quote_lots_per_quote_unit,
            num_base_lots_per_base_unit,
            tick_size_in_quote_lots_per_base_unit,
            taker_fee_bps,
            raw_base_units_per_base_unit,
        )
    }
}

#[derive(Accounts)]
pub struct Initialize {}
