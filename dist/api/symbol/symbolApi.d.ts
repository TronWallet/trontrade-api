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
    symbol: Symbol;
    constructor(symbol: Symbol);
    /**
     * Ticker API
     */
    ticker(): SymbolTickerApi;
    /**
     * Orders API
     */
    orders(): SymbolOrdersApi;
    /**
     * Orderbook API
     */
    orderbook(): SymbolOrderBookApi;
    /**
     * Orderbook API
     */
    trades(): SymbolTradesApi;
}
