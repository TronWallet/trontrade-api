/**
 * @module api.account
 */
import { Order, OrderStatus } from "../../models/order";
import { Observable } from "rxjs";
import Symbol from "../../models/symbol";
import { Dictionary } from "lodash";
interface QueryParameters {
    start?: number;
    limit?: number;
    status?: OrderStatus[];
    sortBy?: string;
}
/**
 * # Account Orders API
 */
export default class AccountOrdersApi {
    private walletAddress;
    private symbols;
    constructor(walletAddress: string, symbols: Dictionary<Symbol>);
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
     * const accountApi = await client.account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
     *
     * const orders = await accountApi.orders().query({
     *   start: 0,
     *   limit: 50,
     * });
     * ```
     */
    query({ start, limit, status, sortBy, }?: QueryParameters): Promise<Order[]>;
}
export {};
