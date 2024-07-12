import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@sectafi/v3-core/artifacts/contracts/SectaDexFactory.sol/SectaDexFactory.json'
import {
  abi as POOL_DEPLOYER_ABI,
  bytecode as POOL_DEPLOYER_BYTECODE,
} from '@sectafi/v3-core/artifacts/contracts/SectaDexPoolDeployer.sol/SectaDexPoolDeployer.json'
import { abi as FACTORY_V2_ABI, bytecode as FACTORY_V2_BYTECODE } from '../contracts/SectaFactory.json'
import { Fixture } from 'ethereum-waffle'
import { ethers, waffle } from 'hardhat'
import { IWETH9, MockTimeSmartRouter } from '../../typechain'

import {
  abi as HELPER_ABI,
  bytecode as HELPER_BYTECODE,
} from '../../artifacts/contracts/libraries/SmartRouterHelper.sol/SmartRouterHelper.json'

import WETH9 from '../contracts/WETH9.json'
import { Contract } from '@ethersproject/contracts'
import { constants } from 'ethers'

import {
  abi as NFT_POSITION_MANAGER_ABI,
  bytecode as NFT_POSITION_MANAGER_BYTECODE,
} from '@sectafi/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'

const wethFixture: Fixture<{ weth9: IWETH9 }> = async ([wallet]) => {
  const weth9 = (await waffle.deployContract(wallet, {
    bytecode: WETH9.bytecode,
    abi: WETH9.abi,
  })) as IWETH9

  return { weth9 }
}

export const v2FactoryFixture: Fixture<{ factory: Contract }> = async ([wallet]) => {
  const factory = await waffle.deployContract(wallet, {
    bytecode: FACTORY_V2_BYTECODE,
    abi: FACTORY_V2_ABI,
  })

  return { factory }
}

const v3CoreFactoryFixture: Fixture<{ deployer: Contract; factory: Contract }> = async ([wallet]) => {
  const deployer = await waffle.deployContract(wallet, {
    bytecode: POOL_DEPLOYER_BYTECODE,
    abi: POOL_DEPLOYER_ABI,
  })
  const factory = await waffle.deployContract(
    wallet,
    {
      bytecode: FACTORY_BYTECODE,
      abi: FACTORY_ABI,
    },
    [deployer.address]
  )

  await deployer.setFactoryAddress(factory.address)

  return {
    deployer,
    factory,
  }
}

export const v3RouterFixture: Fixture<{
  weth9: IWETH9
  factoryV2: Contract
  deployer: Contract
  factory: Contract
  nft: Contract
  router: MockTimeSmartRouter
  helper: Contract
}> = async ([wallet], provider) => {
  const { weth9 } = await wethFixture([wallet], provider)
  const { factory: factoryV2 } = await v2FactoryFixture([wallet], provider)

  const { factory, deployer } = await v3CoreFactoryFixture([wallet], provider)

  const nft = await waffle.deployContract(
    wallet,
    {
      bytecode: NFT_POSITION_MANAGER_BYTECODE,
      abi: NFT_POSITION_MANAGER_ABI,
    },
    [deployer.address, factory.address, weth9.address, constants.AddressZero]
  )

  const helper = await waffle.deployContract(wallet, {
    bytecode: HELPER_BYTECODE,
    abi: HELPER_ABI,
  })

  const router = (await (
    await ethers.getContractFactory('MockTimeSmartRouter', { libraries: { SmartRouterHelper: helper.address } })
  ).deploy(factoryV2.address, deployer.address, factory.address, nft.address, weth9.address)) as MockTimeSmartRouter

  return { weth9, factoryV2, deployer, factory, nft, router, helper }
}
