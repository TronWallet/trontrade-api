/**
 * @module api.account
 */
import {Observable} from "rxjs";
import {newTradeStream} from "../streams";
import {tronTradeApiClient} from "../apollo";
import {queryWalletHistoryTrades} from "../queries";
import Trade from "../../models/trade";
import {filter} from "rxjs/operators";
import Symbol from "../../models/symbol";
import {Dictionary} from "lodash";

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

  private walletAddress: string;
  private symbols: Dictionary<Symbol>;


  constructor(walletAddress: string, symbols: Dictionary<Symbol>) {
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
  watch(): Observable<Trade> {
    return newTradeStream()
      .pipe(filter(x => x.fromWallet === this.walletAddress || x.toWallet === this.walletAddress));
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
  async query({
    start = 0,
    limit = 50,
    sortBy = 'createdAt:ASC',
    symbolId = null,
  }: QueryParameters = {}): Promise<Trade[]> {

    const [sortType, orderBy = ''] = sortBy.split(":");

    const result = await tronTradeApiClient.query({
      query: queryWalletHistoryTrades,
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
      return []
    }

    const {
      data: {
        wallet: {
          trades: {
            rows
          }
        }
      }
    } = result;

    return rows.map(trade => ({
      tx: trade.txId,
      symbolId: trade.marketId,
      side: trade.side,
      price: trade.price / Math.pow(10, this.symbols[trade.marketId].quoteAsset.precision),
      filled: trade.filled / Math.pow(10, this.symbols[trade.marketId].baseAsset.precision),
      time: trade.createdAt,
    }));
  }

}
