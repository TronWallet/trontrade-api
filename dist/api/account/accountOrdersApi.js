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
 * @module api.account
 */
const order_1 = require("../../models/order");
const filter_1 = require("rxjs/internal/operators/filter");
const streams_1 = require("../streams");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
/**
 * # Account Orders API
 */
class AccountOrdersApi {
    constructor(walletAddress, symbols) {
        this.walletAddress = walletAddress;
        this.symbols = symbols;
    }
    /**
     * # Example Usage
     *
     * *Watch orders for a specific wallet*
     *
     * ```typescript
     * const anteSymbolId = 1;
     * const accountApi = await client.account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
     *
     * accountApi.orders().watch().subscribe(order => {
     *  console.log("new order", order);
     * });
     * ```
     */
    watch() {
        return streams_1.newOrderStream()
            .pipe(filter_1.filter(x => x.wallet === this.walletAddress));
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
     * const accountApi = await client.account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
     *
     * const orders = await accountApi.orders().query({
     *   start: 0,
     *   limit: 50,
     * });
     * ```
     */
    query({ start = 0, limit = 50, status = [order_1.OrderStatus.Pending], sortBy = 'createdAt:ASC', } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [sortType, orderBy] = sortBy.split(":");
            const { data: { wallet: { orders: { rows } } } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.queryWalletHistoryOrders,
                variables: {
                    address: this.walletAddress,
                    start,
                    limit,
                    status: status.join(","),
                    sortType,
                    orderBy,
                }
            });
            return rows.map(row => ({
                transaction: row.txOrder,
                orderId: row.contractId,
                symbolId: row.marketId,
                status: row.status,
                wallet: this.walletAddress,
                createdAt: row.createdAt,
                side: row.side,
                price: row.marketPrice / Math.pow(10, this.symbols[row.marketId].quoteAsset.precision),
                amount: row.amount / Math.pow(10, this.symbols[row.marketId].baseAsset.precision),
                filled: row.filled / Math.pow(10, this.symbols[row.marketId].quoteAsset.precision),
            }));
        });
    }
}
exports.default = AccountOrdersApi;
