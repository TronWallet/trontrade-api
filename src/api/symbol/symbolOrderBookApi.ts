/**
 * @module api.symbol
 */
import Symbol from "../../models/symbol";
import {merge, Observable} from "rxjs";
import {tronTradeApiClient} from "../apollo";
import {queryOrderBook} from "../queries";
import {concatMap, filter, throttleTime} from "rxjs/operators";
import OrderBook from "../../models/orderBook";
import {newOrderStream, newTradeStream} from "../streams";

export default class SymbolOrderBookApi {

  public symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  /**
   * Retrieve the current orderbook
   */
  async current(): Promise<OrderBook> {

    const {
      data: {
        exchange: {
          orderBook,
          tokenDecimalsB,
          tokenDecimalsA
        }
      }
    } = await tronTradeApiClient.query({
      query: queryOrderBook,
      variables: {
        exchangeId: this.symbol.id,
      }
    });

    return new OrderBook(this.symbol, {
      buy: orderBook.buy.map(row => ({
        price: row.price / Math.pow(10, tokenDecimalsB),
        totalAmount: row.totalAmount / Math.pow(10, tokenDecimalsA)
      })),
      sell: orderBook.sell.map(row => ({
        price: row.price / Math.pow(10, tokenDecimalsB),
        totalAmount: row.totalAmount / Math.pow(10, tokenDecimalsA)
      })),
    });
  }

  /**
   * Retrieve the orderbook whenever it changes
   */
  watch(): Observable<OrderBook> {
    return merge(newOrderStream(), newTradeStream())
      .pipe(
        filter(x => x.symbolId === this.symbol.id),
        throttleTime(3000),
        concatMap(() => this.current())
      );
  }

}

