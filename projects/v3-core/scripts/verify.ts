import { verifyContract } from '@sectafi/common/verify'
import { sleep } from '@sectafi/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@sectafi/v3-core/deployments/${networkName}.json`)

  // Verify PancakeV3PoolDeployer
  console.log('Verify PancakeV3PoolDeployer')
  await verifyContract(deployedContracts.PancakeV3PoolDeployer)
  await sleep(10000)

  // Verify sectaDexFactory
  console.log('Verify sectaDexFactory')
  await verifyContract(deployedContracts.PancakeV3Factory, [deployedContracts.PancakeV3PoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
