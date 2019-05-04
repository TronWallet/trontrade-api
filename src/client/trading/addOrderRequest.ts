/**
 * @module client.trading
 */
import BigNumber from "bignumber.js";
import OrderPriceCalculator from "./orderPriceCalculator";
import {OrderSide} from "../../models/order";
import {Market} from "../../models/market";
import {pow, toSun} from "../../utils/numbers";

export interface Options {
  amount: number | BigNumber;
  price: number | BigNumber;
  side: OrderSide;
  market: Market;
}

/**
 * Order Form
 *
 * price = Token B
 * amount = Token A
 */
export class AddOrderRequest {

  public readonly amount: BigNumber;
  public readonly price: BigNumber;
  public readonly calculator: OrderPriceCalculator;
  public readonly market: Market;
  public readonly side: OrderSide;

  constructor({ amount, price, market, side }: Options) {
    this.amount = new BigNumber(amount);
    this.price = new BigNumber(price);
    this.market = market;
    this.side = side;
    this.calculator = new OrderPriceCalculator();
  }

  /**
   * Total Price of the order
   */
  getTotalPrice() {
    return this.calculator.calculatePrice(pow(this.price, this.market.tokenDecimalsB), this.amount);
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
    return pow(this.amount, this.market.tokenDecimalsA).toNumber();
  }

  /**
   * @returns price in sun
   */
  getPriceValue() {
    return pow(this.price, this.market.tokenDecimalsB).toNumber();
  }

  /**
   * Call value for the smart contract
   */
  callValue() {
    return this.calculator
      .calculateTotalPrice(pow(this.price, this.market.tokenDecimalsB), this.amount)
      .dp(0, BigNumber.ROUND_DOWN)
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
      .isGreaterThanOrEqualTo(toSun(10));
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
