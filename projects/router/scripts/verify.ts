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

  const sectaFactory_address = '0x8Ad39bf99765E24012A28bEb0d444DE612903C43'

  // Verify SmartRouterHelper
  console.log('Verify SmartRouterHelper')
  await verifyContract(deployedContracts_smart_router.SmartRouterHelper)
  await sleep(10000)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract(deployedContracts_smart_router.SmartRouter, [
    sectaFactory_address,
    deployedContracts_v3_core.SectaDexPoolDeployer,
    deployedContracts_v3_core.SectaDexFactory,
    deployedContracts_v3_periphery.NonfungiblePositionManager,
    config.WNATIVE,
  ])
  await sleep(10000)

  // Verify mixedRouteQuoterV1
  console.log('Verify mixedRouteQuoterV1')
  await verifyContract(
    deployedContracts_smart_router.MixedRouteQuoterV1,
    [
      deployedContracts_v3_core.SectaDexPoolDeployer,
      deployedContracts_v3_core.SectaDexFactory,
      sectaFactory_address,
      config.WNATIVE,
    ],
    { SmartRouterHelper: deployedContracts_smart_router.SmartRouterHelper }
  )
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
