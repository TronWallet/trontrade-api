/**
 * @module api.account
 */
import { Observable } from "rxjs";
import Trade from "../../models/trade";
import Symbol from "../../models/symbol";
import { Dictionary } from "lodash";
interface QueryParameters {
    start?: number;
    limit?: number;
    sortBy?: string;
    symbolId?: number;
}
/**
 * # Account Trades API
 */
export default class AccountTradesApi {
    private walletAddress;
    private symbols;
    constructor(walletAddress: string, symbols: Dictionary<Symbol>);
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
    watch(): Observable<Trade>;
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
    query({ start, limit, sortBy, symbolId, }?: QueryParameters): Promise<Trade[]>;
}
export {};
