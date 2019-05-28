/**
 * @module api.symbol
 */
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import Symbol from "../../models/symbol";
import {newTradeStream} from "../streams";
import Trade from "../../models/trade";
import {tronTradeApiClient} from "../apollo";
import {queryLatestTrades} from "../queries";
import {map} from "rxjs/operators";

export default class SymbolTradesApi {

  private symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  watch(): Observable<Trade> {
    return newTradeStream()
      .pipe(
        filter(trade => trade.symbolId === this.symbol.id),
        map(trade => ({
          ...trade,
          price: trade.price / Math.pow(10, this.symbol.quoteAsset.precision),
          filled: trade.filled / Math.pow(10, this.symbol.baseAsset.precision),
        }))
      );
  }

  async recent(): Promise<Trade[]> {
    const { data: { exchange: {
      history,
    } } } = await tronTradeApiClient.query({
      query: queryLatestTrades,
      variables: {
        exchangeId: this.symbol.id,
      }
    });

    return history.map(trade => ({
      tx: trade.txId,
      symbolId: trade.marketId,
      side: trade.side,
      price: trade.price / Math.pow(10, this.symbol.quoteAsset.precision),
      filled: trade.filled / Math.pow(10, this.symbol.baseAsset.precision),
      time: trade.createdAt,
    }));
  }

}
