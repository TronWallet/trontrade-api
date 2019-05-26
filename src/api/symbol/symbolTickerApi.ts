/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import {TickerApi} from "../tickerApi";
import {Ticker} from "../../models/ticker";
import {from, interval, merge, Observable} from "rxjs";
import {tronTradeApiClient} from "../apollo";
import {querySymbol} from "../queries";
import {concatMap} from "rxjs/operators";

/**
 * # Price Ticker API
 */
export default class SymbolTickerApi implements TickerApi {

  public symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  /**
   * Receive the current price of the symbol
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
   */
  async current(): Promise<Ticker> {

    const { data: {
      exchange: {
        stats,
        tokenDecimalsA,
      },
    } } = await tronTradeApiClient.query({
      query: querySymbol,
      variables: {
        exchangeId: this.symbol.id,
      }
    });

    return {
      high: stats.high / Math.pow(10, tokenDecimalsA),
      low: stats.low / Math.pow(10, tokenDecimalsA),
      volume: stats.volume / Math.pow(10, tokenDecimalsA),
      price: stats.lastPrice / Math.pow(10, tokenDecimalsA),
    };
  }

  /**
   * **Get price for symbol periodically**
   *
   * ```javascript
   * symbolApi.ticker().watch().subscribe(ticker => {
   *   console.log(`Current ANTE Price: ${ticker.price}`);
   * });
   * ```
   */
  watch(): Observable<Ticker> {
    return merge(from(this.current()), interval(10000))
      .pipe(concatMap(() => this.current()))
  }

}

