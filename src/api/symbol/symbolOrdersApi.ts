/**
 * @module api.symbol
 */
import {Order} from "../../models/order";
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import Symbol from "../../models/symbol";
import {newOrderStream} from "../streams";

export default class SymbolOrdersApi {

  private readonly symbol: Symbol;

  constructor(symbol: Symbol) {
    this.symbol = symbol;
  }

  watch(): Observable<Order> {
    return newOrderStream()
      .pipe(filter(x => x.symbolId === this.symbol.id));
  }

}
