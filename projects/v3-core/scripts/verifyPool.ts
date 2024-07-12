import { verifyContract } from '@sectafi/common/verify'
import { sleep } from '@sectafi/common/sleep'
import { network } from 'hardhat'

async function main() {
  const { name } = network

  const poolAddress = '0x2A7F1baEEf187494759770228A3Ac0ff0d5A5f32'

  // Verify SectaDexPool
  console.log('Verify SectaDexPool')
  await verifyContract(poolAddress)
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
