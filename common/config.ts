// TODO: must rename cake when deploying MasterChef
export const configs = {
  linea: {
    WNATIVE: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    nativeCurrencyLabel: 'ETH',
    cake: '0x92ae51D09765f653B3433Df42d5dba1dde0ab039',
  },
  lineaSepolia: {
    WNATIVE: '0x10253594A832f967994b44f33411940533302ACb',
    nativeCurrencyLabel: 'ETH',
    cake: '0x0000000000000000000000000000000000000000',
  },
  hardhat: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'ETH',
    cake: '0x0000000000000000000000000000000000000000',
  },
} as const
