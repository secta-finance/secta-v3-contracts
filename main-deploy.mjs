#!/usr/bin/env zx
// import 'zx/globals'

const networks = {
  linea: 'linea',
  lineaGoerli: 'lineaGoerli',
  hardhat: 'hardhat',
}

let network = process.env.NETWORK
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

await $`yarn workspace @sectafi/v3-core run hardhat run scripts/deploy.ts --network ${network}`

await $`yarn workspace @sectafi/v3-periphery run hardhat run scripts/deploy2.ts --network ${network}`

await $`yarn workspace @sectafi/smart-router run hardhat run scripts/depverAdd.ts --network ${network}`

console.log(chalk.blue('Done!'))

const r = await fs.readJson(`./projects/router/deployments/${network}.json`)
const c = await fs.readJson(`./projects/v3-core/deployments/${network}.json`)
const p = await fs.readJson(`./projects/v3-periphery/deployments/${network}.json`)

const addresses = {
  ...r,
  ...c,
  ...p,
}

console.log(chalk.blue('Writing to file...'))
console.log(chalk.yellow(JSON.stringify(addresses, null, 2)))

fs.writeJson(`./deployments/${network}.json`, addresses, { spaces: 2 })
