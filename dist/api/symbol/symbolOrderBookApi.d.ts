/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import { Observable } from "rxjs";
import OrderBook from "../../models/orderBook";
export default class SymbolOrderBookApi {
    symbol: Symbol;
    constructor(symbol: Symbol);
    /**
     * Retrieve the current orderbook
     */
    current(): Promise<OrderBook>;
    /**
     * Retrieve the orderbook whenever it changes
     */
    watch(): Observable<OrderBook>;
}
