/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import SymbolTickerApi from "./symbolTickerApi";
import SymbolOrdersApi from "./symbolOrdersApi";
import SymbolOrderBookApi from "./symbolOrderBookApi";

/**
 * # Symbol API
 *
 * Provides ticker, orders and orderbook information
 */
export default class SymbolApi {

  public symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  /**
   * Ticker API
   */
  ticker(): SymbolTickerApi {
    return new SymbolTickerApi(this.symbol);
  }

  /**
   * Orders API
   */
  orders() {
    return new SymbolOrdersApi(this.symbol);
  }

  /**
   * Orderbook API
   */
  orderbook() {
    return new SymbolOrderBookApi(this.symbol);
  }
}
