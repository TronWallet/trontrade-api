/**
 * @module models
 */
import Symbol from "./symbol";
import {sortBy} from "lodash";

interface OrderPrice {
  price: number;
  totalAmount: number;
}

export default class OrderBook {

  private symbol: Symbol;
  private readonly _buy: OrderPrice[];
  private readonly _sell: OrderPrice[];

  constructor(
    symbol: Symbol,
    orderBook: { buy: OrderPrice[], sell: OrderPrice[] }
  ) {
    this.symbol = symbol;
    this._buy = orderBook.buy;
    this._sell = orderBook.sell;
  }

  /**
   * Return prices on buy side
   */
  buy() {
    return this._buy;
  }

  /**
   * Return prices on sell side
   */
  sell() {
    return this._sell;
  }

  /**
   * Return lowest sell price
   */
  sellPrice() {
    return sortBy(this.sell(), s => s.price)[0];
  }

  /**
   * Return highest buy price
   */
  buyPrice() {
    return sortBy(this.buy(), s => s.price * -1)[0];
  }
}
