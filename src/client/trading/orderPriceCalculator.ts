/**
 * @module client.trading
 */
import BigNumber from "bignumber.js";

interface Options {
  feeRate?: number;
  decimals?: number;
}

/**
 * @module exchange
 *
 * Calculate prices for the Order
 */
export default class OrderPriceCalculator {

  /**
   * Fee percentage
   */
  private feeRate;

  /**
   * Default amount of decimals
   */
  private defaultDecimals;

  constructor({ feeRate = 0.2, decimals = 0 }: Options = {}) {
    this.feeRate = feeRate;
    this.defaultDecimals = decimals;
  }

  /**
   * Calculate the fee for a given price
   *
   * The resulting fee will be rounded down
   *
   * @param price
   */
  public calculateFee(price: number | BigNumber): BigNumber {
    return new BigNumber(price)
      .div(100)
      .multipliedBy(this.feeRate)
      .dp(0, BigNumber.ROUND_DOWN);
  }

  /**
   * Calculate total price for an order
   *
   * @param orderPrice Price in SUN
   * @param orderAmount Amount
   * @returns Price in SUN
   */
  public calculatePrice(
    orderPrice: number | BigNumber,
    orderAmount: number | BigNumber): BigNumber {
    const totalTrx = new BigNumber(orderAmount)
      .multipliedBy(orderPrice);

    return totalTrx
      .decimalPlaces(0, BigNumber.ROUND_DOWN);
  }

  /**
   * Calculate total price for an order
   *
   * @param orderPrice Price in Sun
   * @param orderAmount Amount of tokens
   * @returns Price in SUN
   */
  public calculateTotalPrice(orderPrice: number | BigNumber, orderAmount: number | BigNumber): BigNumber {
    let totalTrx = this.calculatePrice(orderPrice, orderAmount);

    // Include the fee in the total price
    totalTrx = totalTrx.plus(this.calculateFee(totalTrx));

    return totalTrx
      .decimalPlaces(0, BigNumber.ROUND_DOWN);
  }

}
