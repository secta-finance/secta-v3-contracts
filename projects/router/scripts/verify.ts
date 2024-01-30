import { verifyContract } from '@sectafi/common/verify'
import { sleep } from '@sectafi/common/sleep'
import { configs } from '@sectafi/common/config'

async function main() {
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }
  const deployedContracts_v3_core = await import(`@sectafi/v3-core/deployments/${networkName}.json`)
  const deployedContracts_v3_periphery = await import(`@sectafi/v3-periphery/deployments/${networkName}.json`)
  const deployedContracts_smart_router = await import(`@sectafi/smart-router/deployments/${networkName}.json`)

  // Verify SmartRouterHelper
  console.log('Verify SmartRouterHelper')
  await verifyContract(deployedContracts_smart_router.SmartRouterHelper)
  await sleep(10000)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract(deployedContracts_smart_router.SmartRouter, [
    config.v2Factory,
    deployedContracts_v3_core.SectaDexPoolDeployer,
    deployedContracts_v3_core.SectaDexFactory,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
    config.stableFactory,
    config.stableInfo,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify quoterV2
  console.log('Verify quoterV2')
  await verifyContract(deployedContracts_smart_router.QuoterV2, [
    deployedContracts_v3_core.SectaDexPoolDeployer,
    deployedContracts_v3_core.SectaDexFactory,
    config.WNATIVE,
  ])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
