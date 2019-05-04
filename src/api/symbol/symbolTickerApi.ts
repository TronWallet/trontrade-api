import Symbol from "../../models/symbol";
import {TickerApi} from "../tickerApi";
import {Ticker} from "../../models/ticker";
import {interval, Observable} from "rxjs";
import {tronTradeApiClient} from "../apollo";
import {querySymbol} from "../queries";
import {concatMap} from "rxjs/operators";

export default class SymbolTickerApi implements TickerApi {

  public symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  async current(): Promise<Ticker> {
    const { data: { exchange } } = await tronTradeApiClient.query({
      query: querySymbol,
      variables: {
        exchangeId: this.symbol.id,
      }
    });

    return {
      high: exchange.stats.high,
      low: exchange.stats.low,
      volume: exchange.stats.volume,
      price: exchange.stats.lastPrice,
    };
  }

  watch(): Observable<Ticker> {
    return interval(10000)
      .pipe(concatMap(() => this.current()))
  }

}

