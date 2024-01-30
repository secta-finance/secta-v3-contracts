import { ethers, network } from 'hardhat'
import { configs } from '@sectafi/common/config'
import { tryVerify } from '@sectafi/common/verify'
import fs from 'fs'
import { abi } from '@sectafi/v3-core/artifacts/contracts/PancakeV3Factory.sol/PancakeV3Factory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@sectafi/v3-core/deployments/${networkName}.json`)
  const mcV3DeployedContracts = await import(`@sectafi/masterchef-v3/deployments/${networkName}.json`)

  const sectaDexFactory_address = v3DeployedContracts.PancakeV3Factory

  const PancakeV3LmPoolDeployer = await ethers.getContractFactory('PancakeV3LmPoolDeployer')
  const sectaDexLmPoolDeployer = await PancakeV3LmPoolDeployer.deploy(mcV3DeployedContracts.MasterChefV3)

  console.log('sectaDexLmPoolDeployer deployed to:', sectaDexLmPoolDeployer.address)

  const sectaDexFactory = new ethers.Contract(sectaDexFactory_address, abi, owner)

  await sectaDexFactory.setLmPoolDeployer(sectaDexLmPoolDeployer.address)

  const contracts = {
    PancakeV3LmPoolDeployer: sectaDexLmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
