import { ethers } from 'hardhat'
import SectaDexPoolArtifact from '../artifacts/contracts/SectaDexPool.sol/SectaDexPool.json'

const hash = ethers.utils.keccak256(SectaDexPoolArtifact.bytecode)
console.log(hash)
