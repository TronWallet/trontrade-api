/**
 * @module api.account
 */
import {Order, OrderStatus} from "../../models/order";
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import {newOrderStream} from "../streams";
import {tronTradeApiClient} from "../apollo";
import {queryWalletHistoryOrders} from "../queries";

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

  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
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
  watch(): Observable<Order> {
    return newOrderStream()
      .pipe(filter(x => x.wallet === this.walletAddress));
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
  async query({
    start = 0,
    limit = 50,
    status = [OrderStatus.Pending],
    sortBy = 'createdAt:ASC',
  }: QueryParameters = {}): Promise<Order[]> {

    const [sortType, orderBy] = sortBy.split(":");

    const {
      data: {
        wallet: {
          orders: {
            rows
          }
        }
      }
    } = await tronTradeApiClient.query({
      query: queryWalletHistoryOrders,
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
      price: row.marketPrice,
      amount: row.amount,
      filled: row.filled,
    }));
  }

}
