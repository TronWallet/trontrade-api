"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
const operators_1 = require("rxjs/operators");
/**
 * # Price Ticker API
 */
class SymbolTickerApi {
    constructor(symbol) {
        this.symbol = symbol;
    }
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
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchange: { stats, tokenDecimalsA, }, } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.querySymbol,
                variables: {
                    exchangeId: this.symbol.id,
                }
            });
            return {
                high: stats.high / Math.pow(10, tokenDecimalsA),
                low: stats.low / Math.pow(10, tokenDecimalsA),
                volume: stats.volume / Math.pow(10, tokenDecimalsA),
                price: stats.lastPrice / Math.pow(10, tokenDecimalsA),
            };
        });
    }
    /**
     * **Get price for symbol periodically**
     *
     * ```javascript
     * symbolApi.ticker().watch().subscribe(ticker => {
     *   console.log(`Current ANTE Price: ${ticker.price}`);
     * });
     * ```
     */
    watch() {
        return rxjs_1.merge(rxjs_1.from(this.current()), rxjs_1.interval(10000))
            .pipe(operators_1.concatMap(() => this.current()));
    }
}
exports.default = SymbolTickerApi;
