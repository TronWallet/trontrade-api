/**
 * @module client
 */
import {tronTradeApiClient} from "../api/apollo";
import {querySymbol, querySymbols} from "../api/queries";
import Symbol from "../models/symbol";
import Asset from "../models/asset";
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

  async symbols(): Promise<Symbol[]> {

    const { data: { exchanges } } = await tronTradeApiClient.query({
      query: querySymbols
    });

    return exchanges.map(exchange => new Symbol(
      exchange.id,
      `${exchange.sellAssetName}${exchange.buyAssetName}`,
      new Asset({
        name: exchange.sellAssetName,
        precision: parseInt(exchange.tokenDecimalsA),
      }),
      new Asset({
        name: exchange.buyAssetName,
        precision: parseInt(exchange.tokenDecimalsB),
      }),
    ));
  }

  async symbol(id: number) {

    const { data: { exchange } } = await tronTradeApiClient.query({
      query: querySymbol,
      variables: {
        exchangeId: id,
      }
    });

    const s = new Symbol(
      exchange.id,
      `${exchange.sellAssetName}${exchange.buyAssetName}`,
      new Asset({
        name: exchange.sellAssetName,
        precision: exchange.tokenDecimalsA,
      }),
      new Asset({
        name: exchange.buyAssetName,
        precision: exchange.tokenDecimalsB,
      }),
    );

    return new SymbolApi(s);
  }

  async account(walletAddress: string) {
    return new AccountApi(walletAddress);
  }
}
