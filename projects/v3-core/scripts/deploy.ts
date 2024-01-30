import { tryVerify } from '@sectafi/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  PancakeV3PoolDeployer: require('../artifacts/contracts/PancakeV3PoolDeployer.sol/PancakeV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  PancakeV3Factory: require('../artifacts/contracts/PancakeV3Factory.sol/PancakeV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let sectaDexPoolDeployer_address = ''
  let sectaDexPoolDeployer
  const PancakeV3PoolDeployer = new ContractFactory(
    artifacts.PancakeV3PoolDeployer.abi,
    artifacts.PancakeV3PoolDeployer.bytecode,
    owner
  )
  if (!sectaDexPoolDeployer_address) {
    sectaDexPoolDeployer = await PancakeV3PoolDeployer.deploy()

    sectaDexPoolDeployer_address = sectaDexPoolDeployer.address
    console.log('sectaDexPoolDeployer', sectaDexPoolDeployer_address)
  } else {
    sectaDexPoolDeployer = new ethers.Contract(
      sectaDexPoolDeployer_address,
      artifacts.PancakeV3PoolDeployer.abi,
      owner
    )
  }

  let sectaDexFactory_address = ''
  let sectaDexFactory
  if (!sectaDexFactory_address) {
    const PancakeV3Factory = new ContractFactory(
      artifacts.PancakeV3Factory.abi,
      artifacts.PancakeV3Factory.bytecode,
      owner
    )
    sectaDexFactory = await PancakeV3Factory.deploy(sectaDexPoolDeployer_address)

    sectaDexFactory_address = sectaDexFactory.address
    console.log('sectaDexFactory', sectaDexFactory_address)
  } else {
    sectaDexFactory = new ethers.Contract(sectaDexFactory_address, artifacts.PancakeV3Factory.abi, owner)
  }

  // Set FactoryAddress for sectaDexPoolDeployer.
  await sectaDexPoolDeployer.setFactoryAddress(sectaDexFactory_address);


  const contracts = {
    PancakeV3Factory: sectaDexFactory_address,
    PancakeV3PoolDeployer: sectaDexPoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
