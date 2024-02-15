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

  const v3DeployedContracts = await import(`@sectafi/v3-core/deployments/${networkName}.json`)
  const v3PeripheryDeployedContracts = await import(`@sectafi/v3-periphery/deployments/${networkName}.json`)

  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager

  const sectaDexPoolDeployer_address = '0x46FB35d8a26412c64Fb972D838fCBd4ec48EE7b1'
  const sectaDexFactory_address = '0x591F72F4a2d2C2678B709a38E7ff0a1c86099a8d'
  const sectaFactory_address = '0xa8cDF3a657A3b34D8b410bDBe5457da41C5fd995'

  /** SmartRouterHelper */
  console.log('Deploying SmartRouterHelper...')
  const SmartRouterHelper = await ethers.getContractFactory('SmartRouterHelper')
  const smartRouterHelper = await SmartRouterHelper.deploy()
  console.log('SmartRouterHelper deployed to:', smartRouterHelper.address)
  await tryVerify(smartRouterHelper)

  /** SmartRouter */
  console.log('Deploying SmartRouter...')
  const SmartRouter = await ethers.getContractFactory('SmartRouter', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const smartRouter = await SmartRouter.deploy(
    sectaFactory_address,
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    positionManager_address,
    config.WNATIVE
  )
  console.log('SmartRouter deployed to:', smartRouter.address)

  await tryVerify(smartRouter, [
    sectaFactory_address,
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    positionManager_address,
    config.WNATIVE,
  ])

  /** MixedRouteQuoterV1 */
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    sectaFactory_address,
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
