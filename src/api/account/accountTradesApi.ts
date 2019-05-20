/**
 * @module api.account
 */
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import {newTradeStream} from "../streams";
import {tronTradeApiClient} from "../apollo";
import {queryWalletHistoryTrades} from "../queries";
import Trade from "../../models/trade";

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

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
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
    // TODO: fix me.
    return newTradeStream()
    //   .pipe(filter(x => x.fromOrderExpand && x.fromOrderExpand.wallet === this.walletAddress));
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

    console.log('result:', result)
    if (!result.data) {
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
    } = result

    return rows.map(trade => ({
      tx: trade.txId,
      symbolId: trade.marketId,
      side: trade.side,
      price: trade.price,
      filled: trade.filled,
      time: trade.createdAt,
      // fromOrderWallet: trade.fromOrderWallet || '',
      // toOrderWallet: trade.toOrderWallet || '',
    }));
  }

}
