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
    constructor({ feeRate, decimals }?: Options);
    /**
     * Calculate the fee for a given price
     *
     * The resulting fee will be rounded down
     *
     * @param price
     */
    calculateFee(price: number | BigNumber): BigNumber;
    /**
     * Calculate total price for an order
     *
     * @param orderPrice Price in SUN
     * @param orderAmount Amount
     * @returns Price in SUN
     */
    calculatePrice(orderPrice: number | BigNumber, orderAmount: number | BigNumber): BigNumber;
    /**
     * Calculate total price for an order
     *
     * @param orderPrice Price in Sun
     * @param orderAmount Amount of tokens
     * @returns Price in SUN
     */
    calculateTotalPrice(orderPrice: number | BigNumber, orderAmount: number | BigNumber): BigNumber;
}
export {};
