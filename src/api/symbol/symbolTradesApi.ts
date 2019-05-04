import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import Symbol from "../../models/symbol";
import {newTradeStream} from "../streams";
import TradesApi from "../tradesApi";
import Trade from "../../models/trade";
import {tronTradeApiClient} from "../apollo";
import {queryLatestTrades, querySymbol} from "../queries";

export default class SymbolTradesApi implements TradesApi {

  private symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  watch(): Observable<Trade> {
    return newTradeStream()
      .pipe(filter(x => x.symbolId === this.symbol.id));
  }

  async recent(limit?: number): Promise<Trade[]> {
    const { data: { exchange: { history } } } = await tronTradeApiClient.query({
      query: queryLatestTrades,
      variables: {
        exchangeId: this.symbol.id,
      }
    });

    return history.map(trade => ({
      tx: trade.txId,
      symbolId: trade.marketId,
      side: trade.side,
      price: trade.price,
      filled: trade.filled,
      time: trade.createdAt,
    }));
  }

}
