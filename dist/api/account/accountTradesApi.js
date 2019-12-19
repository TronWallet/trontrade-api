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
const streams_1 = require("../streams");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
const operators_1 = require("rxjs/operators");
/**
 * # Account Trades API
 */
class AccountTradesApi {
    constructor(walletAddress, symbols) {
        this.walletAddress = walletAddress;
        this.symbols = symbols;
    }
    /**
     * # Example Usage
     *
     * *Watch trades for a specific wallet*
     *
     * ```typescript
     * const anteSymbolId = 1;
     * const accountApi = await client.account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
     *
     * accountApi.trades().watch().subscribe(trade => {
     *  console.log("new trade", trade);
     * });
     * ```
     */
    watch() {
        return streams_1.newTradeStream()
            .pipe(operators_1.filter(x => x.fromWallet === this.walletAddress || x.toWallet === this.walletAddress));
    }
    /**
     * # Query Trades
     *
     * *Parameters*
     *
     * * `start`: from which position to start search
     * * `limit`: how many results to return (max: 100)
     * * `sortBy`: sort by field and direction separated by :, example `createdAt:DESC` or `createdAt:ASC`
     *
     * `sortBy` allowed fields:
     *
     * * createdAt
     * * side
     *
     * * marketPrice
     * * amount/amountQuantity
     * * filled/filledQuantity
     *
     * ## Example Usage
     *
     * *Find all trades*
     *
     * ```typescript
     * const accountApi = await client.account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
     *
     * const trades = await accountApi.trades().query({
     *   start: 0,
     *   limit: 50,
     * });
     * ```
     */
    query({ start = 0, limit = 50, sortBy = 'createdAt:ASC', symbolId = null, } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [sortType, orderBy = ''] = sortBy.split(":");
            const result = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.queryWalletHistoryTrades,
                variables: {
                    address: this.walletAddress,
                    start,
                    limit,
                    sortType,
                    orderBy,
                    exchangeId: symbolId
                }
            });
            if (!result.data) {
                console.error(result.errors);
                return [];
            }
            const { data: { wallet: { trades: { rows } } } } = result;
            return rows.map(trade => ({
                tx: trade.txId,
                symbolId: trade.marketId,
                side: trade.side,
                price: trade.price / Math.pow(10, this.symbols[trade.marketId].quoteAsset.precision),
                filled: trade.filled / Math.pow(10, this.symbols[trade.marketId].baseAsset.precision),
                time: trade.createdAt,
            }));
        });
    }
}
exports.default = AccountTradesApi;
