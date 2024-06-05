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


### Linea Sepolia

V3

| Contract   |      Address      |
|----------|:-------------:|
| SectaDexFactory |  0xfD8fbAa34E3efe0Bb4fe11d0468fcFBa8043e9d8 |
| SectaDexPoolDeployer |    0xBf762932d4f27E84B244f75Bb225ecDd89D7C698   |
| SwapRouter | 0xFe5fBcE476279a03e869e0AD9d1A898B09892c39 |
| QuoterV2 |    0x611bdfc91b67782e228bA4C5ce43A01b13DCE484   |
| TickLens |    0xddBa9aac048b27aFF3CFCa69fb727887F2B189c9   |
| NonfungibleTokenPositionDescriptor |    0x7ea03B207998d600ba5094905c37591Df3E7C53f   |
| NonfungiblePositionManager |    0x088C1e45A6C2E3e878Cc0B2392329C641eBe793E   |
| SectaInterfaceMulticall |    0x6347851AAba00B38AF1Ea1620ea6a51f5EEBBEF1   |
| SmartRouter |    0x22ab1fd1f5D867C28a9444f08352Cf6a2d4D7397   |
| SmartRouterHelper |    0x1956405450B02805c23d198854e8E3F8276DB1E9   |
| MixedRouteQuoterV1 |    0x38C16915a39952aC42326CC9863b2AaBfA1b10ec   |

V2

| Contract   |      Address      |
|----------|:-------------:|
| SectaFactory |  0x255FfFb718E7Eda171354cb2F3272E88217151E1 |
| SectaRouter |    0xDF3d02605458c08975Fd5456ed83e6D789146b6a   |


IFO

| Contract   |      Address      |
|----------|:-------------:|
| SECTA |    0xe54c8b4F6bC9F30A805a16B47635b11061a1a454   |
| Staking |    0xA9b43fa40E97897D3Ada6B3560833c94cd1b7E5e   |
| IFODeployerV2 |    0xc7DD5b639561b3c66633DAA3A42a640fD5cA104b   |


*WETH: 0x10253594A832f967994b44f33411940533302ACb


Hash (same as Linea)

| Version   |      Value      |
|----------|:-------------:|
| v2 |  0x5bed5de113e5cdda2845d157bae16c1ce9d8b68c025fe18acf567945ea631cee |
| v3 |    0x0ba76f1ed1c86d77276a345eb00b5d03ff37ba4ad394b97c92daeca1a223062b   |


## Deployments

1. Add Key in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. Testnet (Linea Sepolia) `KEY_TESTNET` or Mainnet (Linea) `KEY_MAINNET`
3. add `ETHERSCAN_API_KEY` in `.env` file. It's an API key for etherscan.
4. `yarn` in root directory
5. `NETWORK=$NETWORK yarn zx main-deploy.mjs` where `$NETWORK` is either `linea`, `lineaSepolia` or `hardhat` (for local testing)
6. `NETWORK=$NETWORK yarn zx main-verify.mjs` where `$NETWORK` is either `linea`, `lineaSepolia` or `hardhat` (for local testing)
