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
/**
 * @module api.symbol
 */
const order_1 = require("../../models/order");
const filter_1 = require("rxjs/internal/operators/filter");
const streams_1 = require("../streams");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
class SymbolOrdersApi {
    constructor(symbol) {
        this.symbol = symbol;
    }
    watch() {
        return streams_1.newOrderStream()
            .pipe(filter_1.filter(x => x.symbolId === this.symbol.id));
    }
    /**
     * # Query Orders
     *
     * *Parameters*
     *
     * * `start`: from which position to start search
     * * `limit`: how many results to return (max: 100)
     * * `status`: order status to look for (default: pending)
     * * `sortBy`: sort by field and direction separated by :, example `createdAt:DESC` or `createdAt:ASC`
     *
     * `sortBy` allowed fields:
     *
     * * status
     * * completedAt
     * * createdAt
     * * side
     * * marketPrice
     * * amountQuantity
     * * filledQuantity
     * * total
     *
     * ## Example Usage
     *
     * *Find all pending orders*
     *
     * ```typescript
     * const anteSymbolId = 1;
     * const symbolApi = await client.symbol(anteSymbolId);
     *
     * const orders = await symbolApi.orders().query({
     *   start: 0,
     *   limit: 50,
     * });
     * ```
     */
    query({ start = 0, limit = 50, status = [order_1.OrderStatus.Pending], sortBy = 'createdAt:ASC', } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [sortType, orderBy] = sortBy.split(":");
            const result = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.querySymbolOrders,
                variables: {
                    exchangeId: this.symbol.id,
                    start,
                    limit,
                    status: status.join(","),
                    sortType,
                    orderBy,
                }
            });
            if (result.errors) {
                console.log('errors:', result.errors);
                return [];
            }
            const { data: { exchange: { orders: { rows } } } } = result;
            return rows.map(row => ({
                transaction: row.txOrder,
                orderId: row.contractId,
                symbolId: row.marketId,
                status: row.status,
                wallet: row.ownerWallet,
                createdAt: row.createdAt,
                side: row.side,
                price: row.marketPrice / Math.pow(10, this.symbol.quoteAsset.precision),
                amount: row.amount / Math.pow(10, this.symbol.baseAsset.precision),
                filled: row.filled / Math.pow(10, this.symbol.quoteAsset.precision),
            }));
        });
    }
}
exports.default = SymbolOrdersApi;
