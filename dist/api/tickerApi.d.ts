/**
 * @module api
 */
import { Ticker } from "../models/ticker";
import { Observable } from "rxjs";
export interface TickerApi {
    current(): Promise<Ticker>;
    watch(): Observable<Ticker>;
}
