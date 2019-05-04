/**
 * @module utils
 */
import BigNumber from "bignumber.js";

/**
 * Convert the number from TRX to SUN
 */
export function toSun(value: number | BigNumber) {
  return pow(new BigNumber(value), 6);
}

/**
 * Math.pow
 *
 * @param value
 * @param pow
 */
export function pow(value: number | BigNumber, pow: number) {
  return new BigNumber(value).multipliedBy(Math.pow(10, pow));
}
