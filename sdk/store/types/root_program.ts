export type RootProgram = {
  "version": "0.1.0",
  "name": "root_program",
  "instructions": [
    {
      "name": "createPhoenixMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "phoenixMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seatManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seatDepositCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "phoenixProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreatePhoenixMarketParams"
          }
        }
      ]
    }
  ],
  "types": [
    {
      "name": "CreatePhoenixMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketSizeParams",
            "type": {
              "defined": "MarketSizeParams"
            }
          },
          {
            "name": "numQuoteLotsPerQuoteUnit",
            "type": "u64"
          },
          {
            "name": "numBaseLotsPerBaseUnit",
            "type": "u64"
          },
          {
            "name": "tickSizeInQuoteLotsPerBaseUnit",
            "type": "u64"
          },
          {
            "name": "takerFeeBps",
            "type": "u16"
          },
          {
            "name": "rawBaseUnitsPerBaseUnit",
            "type": "u32"
          }
        ]
      }
    }
  ]
};

export const IDL: RootProgram = {
  "version": "0.1.0",
  "name": "root_program",
  "instructions": [
    {
      "name": "createPhoenixMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "phoenixMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "seatManager",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "seatDepositCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "logAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "phoenixProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreatePhoenixMarketParams"
          }
        }
      ]
    }
  ],
  "types": [
    {
      "name": "CreatePhoenixMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketSizeParams",
            "type": {
              "defined": "MarketSizeParams"
            }
          },
          {
            "name": "numQuoteLotsPerQuoteUnit",
            "type": "u64"
          },
          {
            "name": "numBaseLotsPerBaseUnit",
            "type": "u64"
          },
          {
            "name": "tickSizeInQuoteLotsPerBaseUnit",
            "type": "u64"
          },
          {
            "name": "takerFeeBps",
            "type": "u16"
          },
          {
            "name": "rawBaseUnitsPerBaseUnit",
            "type": "u32"
          }
        ]
      }
    }
  ]
};
