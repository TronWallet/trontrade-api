/**
 * @module api.account
 */
import {EMPTY, Observable} from "rxjs";
import TradesApi from "../tradesApi";
import Trade from "../../models/trade";
import {tronTradeApiClient} from "../apollo";
import {queryWalletOrders} from "../queries";
import {OrderStatus} from "../../models/order";

export default class AccountTradesApi implements TradesApi {

  private walletAddress: string;

  constructor(symbol: string) {
    this.walletAddress = symbol;
  }

  watch(): Observable<Trade> {
    return EMPTY;
  }

  async recent(limit?: number): Promise<Trade[]> {
    const { data: { exchange: { history } } } = await tronTradeApiClient.query({
      query: queryWalletOrders,
      variables: {
        address: this.walletAddress,
        status: OrderStatus.Completed.toString(),
        sortType: "createdAt",
        orderBy: "DESC",
      }
    });

    return history.map(trade => ({
      tx: trade.trxOrder,
      symbolId: trade.marketId,
      side: trade.side,
      price: trade.marketPrice,
      filled: trade.filled,
      time: trade.createdAt,
    }));
  }

}
