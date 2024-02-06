// smartRouterHelper - is it necessary? cannot find usage

// TODO: update name, `cake` -> `sect`?
export const configs = {
  linea: {
    WNATIVE: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    nativeCurrencyLabel: 'ETH',
    cake: '0x92ae51D09765f653B3433Df42d5dba1dde0ab039',
    smartRouterHelper: '0x4C35fA1249a72190fc2e08fd778d0E15E8bcb586',
  },
  lineaGoerli: {
    WNATIVE: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    nativeCurrencyLabel: 'GOR',
    cake: '0x92ae51D09765f653B3433Df42d5dba1dde0ab039',
    smartRouterHelper: '0x4C35fA1249a72190fc2e08fd778d0E15E8bcb586',
  },
  hardhat: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'ETH',
    cake: '0x0000000000000000000000000000000000000000',
    smartRouterHelper: '0x4C35fA1249a72190fc2e08fd778d0E15E8bcb586',
  },
} as const
