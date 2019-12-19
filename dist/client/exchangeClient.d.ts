import Symbol from "../models/symbol";
import SymbolApi from "../api/symbol/symbolApi";
import AccountApi from "../api/account/accountApi";
/**
 * # Exchange Client
 *
 * Client which is used to read data from TronTrade
 *
 * ## Examples
 *
 * **Create client**
 *
 * ```javascript
 * const client = new ExchangeClient();
 * ```
 *
 * **Receive new orders from a specific symbol**
 *
 * ```javascript
 * const anteSymbolId = 1;
 * const symbolApi = await client.symbol(anteSymbolId);
 *
 * symbolApi.orders().watch().subscribe(order => {
 *   // Handle order
 *   console.log("New Order!", order);
 * });
 * ```
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
 *
 * **Get price for symbol periodically**
 *
 * ```javascript
 * symbolApi.ticker().watch().subscribe(ticker => {
 *   console.log(`Current ANTE Price: ${ticker.price}`);
 * });
 * ```
 */
export default class ExchangeClient {
    symbols(): Promise<Symbol[]>;
    /**
     * Symbol API
     *
     * @param id Exchange ID
     */
    symbol(id: number): Promise<SymbolApi>;
    account(walletAddress: string): Promise<AccountApi>;
}
