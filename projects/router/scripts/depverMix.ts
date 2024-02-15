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

  const sectaDexPoolDeployer_address = v3DeployedContracts.SectaDexPoolDeployer
  const sectaDexFactory_address = v3DeployedContracts.SectaDexFactory
  const sectaFactory_address = '0xa8cDF3a657A3b34D8b410bDBe5457da41C5fd995'
  const smartRouterHelperAddress = '0x7B11A689bd24694fD0acce53f136664070b4E4aA'

  /** MixedRouteQuoterV1 */
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: smartRouterHelperAddress,
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    sectaFactory_address,
    config.WNATIVE
  )
  console.log('MixedRouteQuoterV1 deployed to:', mixedRouteQuoterV1.address)

  await tryVerify(mixedRouteQuoterV1, [
    sectaDexPoolDeployer_address,
    sectaDexFactory_address,
    sectaFactory_address,
    config.WNATIVE,
  ])
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
