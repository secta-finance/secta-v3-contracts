# SectaFi Dex Periphery

This repository contains the periphery smart contracts for the SectaFi Dex Protocol.
For the lower level core contracts, see the [v3-core](../v3-core/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@sectafi/v3-periphery`
and import bytecode imported from artifacts located at
`@sectafi/v3-periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@sectafi/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all SectaFi code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The SectaFi Dex periphery interfaces are available for import into solidity smart contracts
via the npm artifact `@sectafi/v3-periphery`, e.g.:

```solidity
import '@sectafi/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}

```
