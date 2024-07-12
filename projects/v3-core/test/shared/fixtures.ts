import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeSectaDexPool } from '../../typechain-types/contracts/test/MockTimeSectaDexPool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { SectaDexFactory } from '../../typechain-types/contracts/SectaDexFactory'
import { SectaDexPoolDeployer } from '../../typechain-types/contracts/SectaDexPoolDeployer'
import { TestSectaDexCallee } from '../../typechain-types/contracts/test/TestSectaDexCallee'
import { TestSectaDexRouter } from '../../typechain-types/contracts/test/TestSectaDexRouter'
import { MockTimeSectaDexPoolDeployer } from '../../typechain-types/contracts/test/MockTimeSectaDexPoolDeployer'
import SectaDexLmPoolArtifact from '@sectafi/v3-lm-pool/artifacts/contracts/SectaDexLmPool.sol/SectaDexLmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: SectaDexFactory
}

interface DeployerFixture {
  deployer: SectaDexPoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('SectaDexFactory')
  const factory = (await factoryFactory.deploy(deployer.address)) as SectaDexFactory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('SectaDexPoolDeployer')
  const deployer = (await deployerFactory.deploy()) as SectaDexPoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestSectaDexCallee
  swapTargetRouter: TestSectaDexRouter
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeSectaDexPool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeSectaDexPoolDeployerFactory = await ethers.getContractFactory('MockTimeSectaDexPoolDeployer')
  const MockTimeSectaDexPoolFactory = await ethers.getContractFactory('MockTimeSectaDexPool')

  const calleeContractFactory = await ethers.getContractFactory('TestSectaDexCallee')
  const routerContractFactory = await ethers.getContractFactory('TestSectaDexRouter')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestSectaDexCallee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestSectaDexRouter

  const SectaDexLmPoolFactory = await ethers.getContractFactoryFromArtifact(SectaDexLmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeSectaDexPoolDeployerFactory.deploy()) as MockTimeSectaDexPoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimeSectaDexPool = MockTimeSectaDexPoolFactory.attach(poolAddress) as MockTimeSectaDexPool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await SectaDexLmPoolFactory.deploy(
              poolAddress,
              ethers.constants.AddressZero,
              Math.floor(Date.now() / 1000)
            )
          ).address
        )
      ).wait()

      return mockTimeSectaDexPool
    },
  }
}
