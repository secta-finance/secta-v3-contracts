import { BigNumber } from 'ethers'

export const MaxUint128 = BigNumber.from(2).pow(128).sub(1)

export enum FeeAmount {
  LOW = 500,
  MEDIUM = 2500,
  HIGH = 10000,
  STABLE = 100,
}

export const V2_FEE_PLACEHOLDER = 8388608 // 1 << 23

export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 50,
  [FeeAmount.HIGH]: 200,
  [FeeAmount.STABLE]: 1,
}

export const CONTRACT_BALANCE = 0
export const MSG_SENDER = '0x0000000000000000000000000000000000000001'
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002'
