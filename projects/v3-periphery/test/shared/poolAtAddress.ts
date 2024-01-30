import { abi as POOL_ABI } from '@sectafi/v3-core/artifacts/contracts/SectaDexPool.sol/SectaDexPool.json'
import { Contract, Wallet } from 'ethers'
import { ISectaDexPool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): ISectaDexPool {
  return new Contract(address, POOL_ABI, wallet) as ISectaDexPool
}
