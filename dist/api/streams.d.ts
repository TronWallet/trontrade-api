/**
 * @module api.streams
 */
import { Observable } from "rxjs";
import { Order } from "../models/order";
import Trade from "../models/trade";
export declare function newOrderStream(): Observable<Order>;
export declare function newTradeStream(): Observable<Trade>;
