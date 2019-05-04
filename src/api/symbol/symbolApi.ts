/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import SymbolTickerApi from "./symbolTickerApi";
import SymbolOrdersApi from "./symbolOrdersApi";

export default class SymbolApi {

  public symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  ticker(): SymbolTickerApi {
    return new SymbolTickerApi(this.symbol);
  }

  async orderbook() {

  }

  orders() {
    return new SymbolOrdersApi(this.symbol);
  }
}
