"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module client.trading
 */
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const orderPriceCalculator_1 = __importDefault(require("./orderPriceCalculator"));
const numbers_1 = require("../../utils/numbers");
/**
 * Order Form
 *
 * price = Token B
 * amount = Token A
 */
class AddOrderRequest {
    constructor({ amount, price, market, side }) {
        this.amount = new bignumber_js_1.default(amount);
        this.price = new bignumber_js_1.default(price);
        this.market = market;
        this.side = side;
        this.calculator = new orderPriceCalculator_1.default();
    }
    /**
     * Total Price of the order
     */
    getTotalPrice() {
        return this.calculator.calculatePrice(numbers_1.pow(this.price, this.market.tokenDecimalsB), this.amount);
    }
    getFee() {
        return this.calculator.calculateFee(this.getTotalPrice());
    }
    getAmount() {
        return this.amount;
    }
    /**
     * @Returns the amount without decimals
     */
    getTokenValue() {
        return numbers_1.pow(this.amount, this.market.tokenDecimalsA).toNumber();
    }
    /**
     * @returns price in sun
     */
    getPriceValue() {
        return numbers_1.pow(this.price, this.market.tokenDecimalsB).toNumber();
    }
    /**
     * Call value for the smart contract
     */
    callValue() {
        return this.calculator
            .calculateTotalPrice(numbers_1.pow(this.price, this.market.tokenDecimalsB), this.amount)
            .dp(0, bignumber_js_1.default.ROUND_DOWN)
            .toNumber();
    }
    /**
     * Checks if the amounts are within the limits of the smart contract call
     */
    validate() {
        if (this.amount.isLessThanOrEqualTo(0) || this.amount.isGreaterThan(Math.pow(10, 32))) {
            throw new Error("Amount out of range");
        }
        if (this.price.isLessThanOrEqualTo(0) || this.amount.isGreaterThan(Math.pow(10, 16))) {
            throw new Error("Price out of range");
        }
        if (!this.isMinimumOrderValue()) {
            throw new Error("Minimum order value required");
        }
    }
    /**
     * If the amount is at least the minimal required amount
     */
    isMinimumOrderValue() {
        return this
            .getTotalPrice()
            .isGreaterThanOrEqualTo(numbers_1.toSun(10));
    }
    getInfo() {
        return {
            amount: this.amount.toNumber(),
            price: this.price.toNumber(),
            priceValue: this.getPriceValue(),
            tokenValue: this.getTokenValue(),
            tokenId: this.market.tokenIdA,
            callValue: this.callValue(),
            market: this.market,
            fee: this.getFee().toNumber(),
        };
    }
}
exports.AddOrderRequest = AddOrderRequest;
