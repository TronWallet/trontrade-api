"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
const operators_1 = require("rxjs/operators");
const orderBook_1 = __importDefault(require("../../models/orderBook"));
const streams_1 = require("../streams");
class SymbolOrderBookApi {
    constructor(symbol) {
        this.symbol = symbol;
    }
    /**
     * Retrieve the current orderbook
     */
    current() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchange: { orderBook, tokenDecimalsB, tokenDecimalsA } } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.queryOrderBook,
                variables: {
                    exchangeId: this.symbol.id,
                }
            });
            return new orderBook_1.default(this.symbol, {
                buy: orderBook.buy.map(row => ({
                    price: row.price / Math.pow(10, tokenDecimalsB),
                    totalAmount: row.totalAmount / Math.pow(10, tokenDecimalsA)
                })),
                sell: orderBook.sell.map(row => ({
                    price: row.price / Math.pow(10, tokenDecimalsB),
                    totalAmount: row.totalAmount / Math.pow(10, tokenDecimalsA)
                })),
            });
        });
    }
    /**
     * Retrieve the orderbook whenever it changes
     */
    watch() {
        return rxjs_1.merge(streams_1.newOrderStream(), streams_1.newTradeStream(), rxjs_1.of({ symbolId: this.symbol.id }))
            .pipe(operators_1.filter(x => x.symbolId === this.symbol.id), operators_1.throttleTime(3000), operators_1.concatMap(() => this.current()));
    }
}
exports.default = SymbolOrderBookApi;
