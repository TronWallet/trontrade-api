/**
 * @module api.symbol
 */
import { Observable } from "rxjs";
import Symbol from "../../models/symbol";
import Trade from "../../models/trade";
export default class SymbolTradesApi {
    private symbol;
    constructor(symbol: Symbol);
    watch(): Observable<Trade>;
    recent(): Promise<Trade[]>;
}
