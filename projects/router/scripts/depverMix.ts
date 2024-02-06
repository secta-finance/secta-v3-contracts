import { ethers, network } from 'hardhat'
import { configs } from '@sectafi/common/config'
import { tryVerify } from '@sectafi/common/verify'

async function main() {
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const sectaDexPoolDeployer_address = '0x46FB35d8a26412c64Fb972D838fCBd4ec48EE7b1'
  const sectaDexFactory_address = '0x591F72F4a2d2C2678B709a38E7ff0a1c86099a8d'

  /** MixedRouteQuoterV1 */
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: '0x4C35fA1249a72190fc2e08fd778d0E15E8bcb586',
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    config.WNATIVE
  )
  console.log('MixedRouteQuoterV1 deployed to:', mixedRouteQuoterV1.address)

  await tryVerify(mixedRouteQuoterV1, [sectaDexPoolDeployer_address, sectaDexFactory_address, config.WNATIVE])
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
