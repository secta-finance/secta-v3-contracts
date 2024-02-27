# Secta Finance

## Contract Addresses

### Linea

V3

| Contract   |      Address      |
|----------|:-------------:|
| SectaDexFactory |  0x9BD425a416A276C72a13c13bBd8145272680Cf07 |
| SectaDexPoolDeployer |    0xB1E650EBCc6253C1d3e18370513479A007460081   |
| SwapRouter | 0xa27e11D191a4605aFF5D4B4D406574051af65204 |
| QuoterV2 |    0x284027C567D4Ae5912f0E3147803c4260453BFFE   |
| TickLens |    0x41c65a22b367E1cD6662C6E74C003D59E91069eB   |
| NonfungibleTokenPositionDescriptor |    0xD6FE0A87611dD4DBcD57ec15217D97c0408629B6   |
| NonfungiblePositionManager |    0x400F9ce4E9baD12501De831970C13e4aE99AC442   |
| SectaInterfaceMulticall |    0x492CaB059b7241E9D361688792eEcD777C82C918   |
| SmartRouter |    0x2f9ceb595DE6D58923017dA5333610437898B812   |
| SmartRouterHelper |    0xd6593B73Cb4169dD622B6EC4Da4B1f04b20fA52A   |
| MixedRouteQuoterV1 |    0x25A2c1eA9F85b6890af07b1a713EFd9271E4633A   |

V2

| Contract   |      Address      |
|----------|:-------------:|
| SectaFactory |  0x8Ad39bf99765E24012A28bEb0d444DE612903C43 |
| SectaRouter |    0x4cB96E7f17eA50016dB841171a30899f0497c5dB   |


Hash

| Version   |      Value      |
|----------|:-------------:|
| v2 |  0x5bed5de113e5cdda2845d157bae16c1ce9d8b68c025fe18acf567945ea631cee |
| v3 |    0x0ba76f1ed1c86d77276a345eb00b5d03ff37ba4ad394b97c92daeca1a223062b   |


### Linea Goerli

V3

| Contract   |      Address      |
|----------|:-------------:|
| SectaDexFactory |  0x591F72F4a2d2C2678B709a38E7ff0a1c86099a8d |
| SectaDexPoolDeployer |    0x46FB35d8a26412c64Fb972D838fCBd4ec48EE7b1   |
| SwapRouter | 0x5294273cC7653fF6EbE922CE187957EF98A5E78d |
| QuoterV2 |    0x92373fd309E8584F7153F82c9ECa705FcDD8ccAa   |
| TickLens |    0x8C8C05812750fAF276F38fE60894f11452e1937c   |
| NonfungibleTokenPositionDescriptor |    0xe3B8fB693c69DF9154FD508EbF1D8e5D11BAAFE6   |
| NonfungiblePositionManager |    0xEA658F4e0B575c5DC9420dE44baB842374FDa258   |
| SectaInterfaceMulticall |    0x88e38D5Cb5435Ea8761E08c52D32aDB52e468B27   |
| SmartRouter |    0xf80B9a2501Bc510C14BEb72eC67cAc4dFBd383e3   |
| SmartRouterHelper |    0x7B11A689bd24694fD0acce53f136664070b4E4aA   |
| MixedRouteQuoterV1 |    0x286C92c3eC8F4ea75f5F0771792D7863499feE7C   |

V2

| Contract   |      Address      |
|----------|:-------------:|
| SectaFactory |  0xa8cDF3a657A3b34D8b410bDBe5457da41C5fd995 |
| SectaRouter |    0x4Fa94465Bc6d82F188DB69Dfa3e5e97A884CCbD8   |


Hash (same as Linea)

| Version   |      Value      |
|----------|:-------------:|
| v2 |  0x5bed5de113e5cdda2845d157bae16c1ce9d8b68c025fe18acf567945ea631cee |
| v3 |    0x0ba76f1ed1c86d77276a345eb00b5d03ff37ba4ad394b97c92daeca1a223062b   |


## Deployments

1. Add Key in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. Testnet (Linea Goerli) `KEY_TESTNET` or Mainnet (Linea) `KEY_MAINNET`
3. add `ETHERSCAN_API_KEY` in `.env` file. It's an API key for etherscan.
4. `yarn` in root directory
5. `NETWORK=$NETWORK yarn zx main-deploy.mjs` where `$NETWORK` is either `linea`, `lineaGoerli` or `hardhat` (for local testing)
6. `NETWORK=$NETWORK yarn zx main-verify.mjs` where `$NETWORK` is either `linea`, `lineaGoerli` or `hardhat` (for local testing)
