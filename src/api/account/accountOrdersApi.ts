/**
 * @module api.account
 */
import OrdersApi from "../ordersApi";
import {Order} from "../../models/order";
import {Observable} from "rxjs";
import {filter} from "rxjs/internal/operators/filter";
import {newOrderStream} from "../streams";

export default class AccountOrdersApi implements OrdersApi {

  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  watch(): Observable<Order> {
    return newOrderStream()
      .pipe(filter(x => x.wallet === this.walletAddress));
  }

}
