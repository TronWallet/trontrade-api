"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module client.trading
 */
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/**
 * @module exchange
 *
 * Calculate prices for the Order
 */
class OrderPriceCalculator {
    constructor({ feeRate = 0.2, decimals = 0 } = {}) {
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
    calculateFee(price) {
        return new bignumber_js_1.default(price)
            .div(100)
            .multipliedBy(this.feeRate)
            .dp(0, bignumber_js_1.default.ROUND_DOWN);
    }
    /**
     * Calculate total price for an order
     *
     * @param orderPrice Price in SUN
     * @param orderAmount Amount
     * @returns Price in SUN
     */
    calculatePrice(orderPrice, orderAmount) {
        const totalTrx = new bignumber_js_1.default(orderAmount)
            .multipliedBy(orderPrice);
        return totalTrx
            .decimalPlaces(0, bignumber_js_1.default.ROUND_DOWN);
    }
    /**
     * Calculate total price for an order
     *
     * @param orderPrice Price in Sun
     * @param orderAmount Amount of tokens
     * @returns Price in SUN
     */
    calculateTotalPrice(orderPrice, orderAmount) {
        let totalTrx = this.calculatePrice(orderPrice, orderAmount);
        // Include the fee in the total price
        totalTrx = totalTrx.plus(this.calculateFee(totalTrx));
        return totalTrx
            .decimalPlaces(0, bignumber_js_1.default.ROUND_DOWN);
    }
}
exports.default = OrderPriceCalculator;
