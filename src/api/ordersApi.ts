/**
 * @module api
 */
import {Observable} from "rxjs";
import {Order} from "../models/order";

export default interface OrdersApi {
  watch(): Observable<Order>;
}
