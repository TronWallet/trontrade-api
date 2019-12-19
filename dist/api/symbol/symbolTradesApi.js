"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("rxjs/internal/operators/filter");
const streams_1 = require("../streams");
const apollo_1 = require("../apollo");
const queries_1 = require("../queries");
const operators_1 = require("rxjs/operators");
class SymbolTradesApi {
    constructor(symbol) {
        this.symbol = symbol;
    }
    watch() {
        return streams_1.newTradeStream()
            .pipe(filter_1.filter(trade => trade.symbolId === this.symbol.id), operators_1.map(trade => (Object.assign({}, trade, { price: trade.price / Math.pow(10, this.symbol.quoteAsset.precision), filled: trade.filled / Math.pow(10, this.symbol.baseAsset.precision) }))));
    }
    recent() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchange: { history, } } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.queryLatestTrades,
                variables: {
                    exchangeId: this.symbol.id,
                }
            });
            return history.map(trade => ({
                tx: trade.txId,
                symbolId: trade.marketId,
                side: trade.side,
                price: trade.price / Math.pow(10, this.symbol.quoteAsset.precision),
                filled: trade.filled / Math.pow(10, this.symbol.baseAsset.precision),
                time: trade.createdAt,
            }));
        });
    }
}
exports.default = SymbolTradesApi;
