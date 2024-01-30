import { ethers, network } from 'hardhat'
import { configs } from '@sectafi/common/config'
import { tryVerify } from '@sectafi/common/verify'
import { writeFileSync } from 'fs'

async function main() {
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@sectafi/v3-core/deployments/${networkName}.json`)
  const v3PeripheryDeployedContracts = await import(`@sectafi/v3-periphery/deployments/${networkName}.json`)

  const sectaDexPoolDeployer_address = v3DeployedContracts.PancakeV3PoolDeployer
  const sectaDexFactory_address = v3DeployedContracts.PancakeV3Factory
  const positionManager_address = v3PeripheryDeployedContracts.NonfungiblePositionManager

  /** SmartRouterHelper */
  console.log('Deploying SmartRouterHelper...')
  const SmartRouterHelper = await ethers.getContractFactory('SmartRouterHelper')
  const smartRouterHelper = await SmartRouterHelper.deploy()
  console.log('SmartRouterHelper deployed to:', smartRouterHelper.address)
  // await tryVerify(smartRouterHelper)

  /** SmartRouter */
  console.log('Deploying SmartRouter...')
  const SmartRouter = await ethers.getContractFactory('SmartRouter', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const smartRouter = await SmartRouter.deploy(
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    positionManager_address,
    config.WNATIVE
  )
  console.log('SmartRouter deployed to:', smartRouter.address)

  // await tryVerify(smartRouter, [
  //   config.v2Factory,
  //   sectaDexPoolDeployer_address,
  //   sectaDexFactory_address,
  //   positionManager_address,
  //   config.stableFactory,
  //   config.stableInfo,
  //   config.WNATIVE,
  // ])

  /** QuoterV2 */
  const QuoterV2 = await ethers.getContractFactory('QuoterV2', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const quoterV2 = await QuoterV2.deploy(sectaDexPoolDeployer_address, sectaDexFactory_address, config.WNATIVE)
  console.log('QuoterV2 deployed to:', quoterV2.address)

  // await tryVerify(quoterV2, [sectaDexPoolDeployer_address, sectaDexFactory_address, config.WNATIVE])

  const contracts = {
    SmartRouter: smartRouter.address,
    SmartRouterHelper: smartRouterHelper.address,
    QuoterV2: quoterV2.address,
  }

  writeFileSync(`./deployments/${network.name}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
