/**
 * @module api.symbol
 */
import { Order, OrderStatus } from "../../models/order";
import { Observable } from "rxjs";
import Symbol from "../../models/symbol";
interface QueryParameters {
    start?: number;
    limit?: number;
    status?: OrderStatus[];
    sortBy?: string;
}
export default class SymbolOrdersApi {
    private readonly symbol;
    constructor(symbol: Symbol);
    watch(): Observable<Order>;
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
    query({ start, limit, status, sortBy, }?: QueryParameters): Promise<Order[]>;
}
export {};
