"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const symbolTickerApi_1 = __importDefault(require("./symbolTickerApi"));
const symbolOrdersApi_1 = __importDefault(require("./symbolOrdersApi"));
const symbolOrderBookApi_1 = __importDefault(require("./symbolOrderBookApi"));
const symbolTradesApi_1 = __importDefault(require("./symbolTradesApi"));
/**
 * # Symbol API
 *
 * Provides ticker, orders and orderbook information
 */
class SymbolApi {
    constructor(symbol) {
        this.symbol = symbol;
    }
    /**
     * Ticker API
     */
    ticker() {
        return new symbolTickerApi_1.default(this.symbol);
    }
    /**
     * Orders API
     */
    orders() {
        return new symbolOrdersApi_1.default(this.symbol);
    }
    /**
     * Orderbook API
     */
    orderbook() {
        return new symbolOrderBookApi_1.default(this.symbol);
    }
    /**
     * Orderbook API
     */
    trades() {
        return new symbolTradesApi_1.default(this.symbol);
    }
}
exports.default = SymbolApi;
