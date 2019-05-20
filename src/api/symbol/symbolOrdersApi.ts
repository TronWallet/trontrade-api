/**
 * @module api.symbol
 */
import {Order, OrderStatus} from "../../models/order";
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import Symbol from "../../models/symbol";
import {newOrderStream} from "../streams";
import { tronTradeApiClient } from "../apollo";
import { querySymbolOrders } from "../queries";

interface QueryParameters {
  start?: number;
  limit?: number;
  status?: OrderStatus[];
  sortBy?: string;
}

export default class SymbolOrdersApi {

  private readonly symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  watch(): Observable<Order> {
    return newOrderStream()
      .pipe(filter(x => x.symbolId === this.symbol.id));
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
      query: querySymbolOrders,
      variables: {
        exchangeId: this.symbol,
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
      wallet: row.ownerWallet,
      createdAt: row.createdAt,
      side: row.side,
      price: row.marketPrice,
      amount: row.amount,
      filled: row.filled,
    }));
  }
}
