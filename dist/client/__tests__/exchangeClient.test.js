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
/**
 * @module tests
 */
const exchangeClient_1 = __importDefault(require("../exchangeClient"));
var client = new exchangeClient_1.default();
beforeEach(() => {
    client = new exchangeClient_1.default();
});
describe('ExchangeClient', () => {
    this.setTimeout(10000);
    test('read symbols', () => __awaiter(this, void 0, void 0, function* () {
        const symbols = yield client.symbols();
        expect(symbols.length).toBeGreaterThan(0);
    }));
    test('read ANTE symbol', () => __awaiter(this, void 0, void 0, function* () {
        const anteSymbol = yield client.symbol(1);
        expect(anteSymbol.symbol.name).toBe("TRXANTE");
    }));
    test('read ANTE price', () => __awaiter(this, void 0, void 0, function* () {
        const anteSymbol = yield client.symbol(1);
        const ticker = yield anteSymbol.ticker().current();
        expect(ticker.price).toBeGreaterThan(0);
    }));
    test('read ANTE orderbook', () => __awaiter(this, void 0, void 0, function* () {
        const anteSymbol = yield client.symbol(1);
        const orderBook = yield anteSymbol.orderbook().current();
        expect(orderBook.sell()[0].price).toBeGreaterThan(orderBook.buy()[0].price);
    }));
});
