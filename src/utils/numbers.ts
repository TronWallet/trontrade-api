import BigNumber from "bignumber.js";


export function toSun(value: number | BigNumber) {
  return pow(new BigNumber(value), 6);
}

export function pow(value: number | BigNumber, pow: number) {
  return new BigNumber(value).multipliedBy(Math.pow(10, pow));
}
