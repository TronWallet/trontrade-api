/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import SymbolTickerApi from "./symbolTickerApi";
import SymbolOrdersApi from "./symbolOrdersApi";
import SymbolOrderBookApi from "./symbolOrderBookApi";
import SymbolTradesApi from "./symbolTradesApi";

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
  orders(): SymbolOrdersApi {
    return new SymbolOrdersApi(this.symbol);
  }

  /**
   * Orderbook API
   */
  orderbook(): SymbolOrderBookApi {
    return new SymbolOrderBookApi(this.symbol);
  }
  /**
   * Orderbook API
   */
  trades(): SymbolTradesApi {
    return new SymbolTradesApi(this.symbol);
  }
}
