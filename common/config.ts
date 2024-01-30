export const configs = {
  linea: {
    WNATIVE: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    nativeCurrencyLabel: 'ETH',
    cake: '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  lineaGoerli: {
    WNATIVE: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    nativeCurrencyLabel: 'GOR',
    cake: '0xc2C3eAbE0368a2Ea97f485b03D1098cdD7d0c081',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
  hardhat: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'ETH',
    cake: '0x0000000000000000000000000000000000000000',
    smartRouterHelper: '0xdAecee3C08e953Bd5f89A5Cc90ac560413d709E3',
  },
} as const
