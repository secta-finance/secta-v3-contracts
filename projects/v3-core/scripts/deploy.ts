import { tryVerify } from '@sectafi/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  SectaDexPoolDeployer: require('../artifacts/contracts/SectaDexPoolDeployer.sol/SectaDexPoolDeployer.json'),
  // eslint-disable-next-line global-require
  SectaDexFactory: require('../artifacts/contracts/SectaDexFactory.sol/SectaDexFactory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let sectaDexPoolDeployer_address = ''
  let sectaDexPoolDeployer
  const SectaDexPoolDeployer = new ContractFactory(
    artifacts.SectaDexPoolDeployer.abi,
    artifacts.SectaDexPoolDeployer.bytecode,
    owner
  )
  if (!sectaDexPoolDeployer_address) {
    sectaDexPoolDeployer = await SectaDexPoolDeployer.deploy()

    sectaDexPoolDeployer_address = sectaDexPoolDeployer.address
    console.log('sectaDexPoolDeployer', sectaDexPoolDeployer_address)
  } else {
    sectaDexPoolDeployer = new ethers.Contract(
      sectaDexPoolDeployer_address,
      artifacts.SectaDexPoolDeployer.abi,
      owner
    )
  }

  let sectaDexFactory_address = ''
  let sectaDexFactory
  if (!sectaDexFactory_address) {
    const SectaDexFactory = new ContractFactory(
      artifacts.SectaDexFactory.abi,
      artifacts.SectaDexFactory.bytecode,
      owner
    )
    sectaDexFactory = await SectaDexFactory.deploy(sectaDexPoolDeployer_address)

    sectaDexFactory_address = sectaDexFactory.address
    console.log('sectaDexFactory', sectaDexFactory_address)
  } else {
    sectaDexFactory = new ethers.Contract(sectaDexFactory_address, artifacts.SectaDexFactory.abi, owner)
  }

  // Set FactoryAddress for sectaDexPoolDeployer.
  await sectaDexPoolDeployer.setFactoryAddress(sectaDexFactory_address);


  const contracts = {
    SectaDexFactory: sectaDexFactory_address,
    SectaDexPoolDeployer: sectaDexPoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
