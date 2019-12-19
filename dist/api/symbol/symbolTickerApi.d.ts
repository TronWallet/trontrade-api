/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import { TickerApi } from "../tickerApi";
import { Ticker } from "../../models/ticker";
import { Observable } from "rxjs";
/**
 * # Price Ticker API
 */
export default class SymbolTickerApi implements TickerApi {
    symbol: Symbol;
    constructor(symbol: Symbol);
    /**
     * Receive the current price of the symbol
     *
     * **Get price for symbol**
     *
     * ```javascript
     * const anteSymbolId = 1;
     * const symbolApi = await client.symbol(anteSymbolId);
     *
     * const ticker = await symbolApi.ticker().current();
     *
     * console.log(`Current ANTE Price: ${ticker.price}`);
     * ```
     */
    current(): Promise<Ticker>;
    /**
     * **Get price for symbol periodically**
     *
     * ```javascript
     * symbolApi.ticker().watch().subscribe(ticker => {
     *   console.log(`Current ANTE Price: ${ticker.price}`);
     * });
     * ```
     */
    watch(): Observable<Ticker>;
}
