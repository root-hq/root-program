use anchor_lang::{prelude::*, solana_program::program::invoke};
use anchor_spl::token::{Mint, Token};
use phoenix::program::{create_change_market_status_instruction, create_initialize_market_instruction, create_name_successor_instruction, MarketSizeParams};
use phoenix_seat_manager::{get_seat_manager_address, instruction_builders::create_claim_market_authority_instruction};

#[derive(Default, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct CreatePhoenixMarketParams {
    market_size_params: MarketSizeParams,
    num_quote_lots_per_quote_unit: u64,
    num_base_lots_per_base_unit: u64,
    tick_size_in_quote_lots_per_base_unit: u64,
    taker_fee_bps: u16,
    raw_base_units_per_base_unit: u32
}

pub fn create_phoenix_market(
    ctx: Context<CreatePhoenixMarket>,
    params: CreatePhoenixMarketParams
) -> Result<()> {

    let initialize_market_ix = create_initialize_market_instruction(
        ctx.accounts.phoenix_market.key, 
        &ctx.accounts.base_token_mint.key(), 
        &ctx.accounts.quote_token_mint.key(), 
        &ctx.accounts.creator.key, 
        params.market_size_params,
        params.num_quote_lots_per_quote_unit,
        params.num_base_lots_per_base_unit,
        params.tick_size_in_quote_lots_per_base_unit,
        params.taker_fee_bps,
        &ctx.accounts.fee_collector.key(),
        Some(params.raw_base_units_per_base_unit)
    );

    let _ = invoke(
        &initialize_market_ix,
        &[
            ctx.accounts.phoenix_program.to_account_info(),
            ctx.accounts.log_authority.to_account_info(),
            ctx.accounts.phoenix_market.to_account_info(),
            ctx.accounts.creator.to_account_info(),
            ctx.accounts.base_token_mint.to_account_info(),
            ctx.accounts.quote_token_mint.to_account_info(),
            ctx.accounts.base_vault.to_account_info(),
            ctx.accounts.quote_vault.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.token_program.to_account_info()
        ]
    );

    let seat_manager_key = get_seat_manager_address(&ctx.accounts.phoenix_market.key()).0;

    let name_successor_ix = create_name_successor_instruction(
        &ctx.accounts.creator.key(), 
        &ctx.accounts.phoenix_market.key(), 
        &seat_manager_key.key()
    );

    let _ = invoke(
        &name_successor_ix,
        &[
            ctx.accounts.phoenix_program.to_account_info(),
            ctx.accounts.log_authority.to_account_info(),
            ctx.accounts.phoenix_market.to_account_info(),
            ctx.accounts.creator.to_account_info()
        ]
    );

    let change_market_status_ix = create_change_market_status_instruction(
        &ctx.accounts.creator.key(), 
        &ctx.accounts.phoenix_market.key(), 
        phoenix::program::status::MarketStatus::Active
    );

    let _ = invoke(
        &change_market_status_ix,
        &[
            ctx.accounts.phoenix_program.to_account_info(),
            ctx.accounts.log_authority.to_account_info(),
            ctx.accounts.phoenix_market.to_account_info(),
            ctx.accounts.creator.to_account_info()
        ]
    );

    let claim_market_authority_ix = create_claim_market_authority_instruction(
        &ctx.accounts.phoenix_market.key(), 
        &ctx.accounts.creator.key()
    );

    let _ = invoke(
        &claim_market_authority_ix, 
        &[
            ctx.accounts.phoenix_program.to_account_info(),
            ctx.accounts.log_authority.to_account_info(),
            ctx.accounts.phoenix_market.to_account_info(),
            ctx.accounts.seat_manager.to_account_info(),
            ctx.accounts.creator.to_account_info(),
            ctx.accounts.seat_deposit_collector.to_account_info(),
            ctx.accounts.system_program.to_account_info()
        ]
    );

    Ok(())
}

#[derive(Accounts)]
pub struct CreatePhoenixMarket<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(mut)]
    /// CHECK: Necessary checks in phoenix program
    pub phoenix_market: UncheckedAccount<'info>,

    pub base_token_mint: Account<'info, Mint>,

    pub quote_token_mint: Account<'info, Mint>,

    /// CHECK: No constraints needed
    pub fee_collector: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Necessary checks in phoenix program
    pub seat_manager: UncheckedAccount<'info>,

    /// CHECK: Necessary checks in phoenix program
    pub seat_deposit_collector: UncheckedAccount<'info>,

    /// CHECK: Necessary checks in phoenix program
    pub log_authority: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Necessary checks in phoenix program
    pub base_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Necessary checks in phoenix program
    pub quote_vault: UncheckedAccount<'info>,

    /// CHECK: Necessary checks in phoenix program
    pub phoenix_program: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>
}