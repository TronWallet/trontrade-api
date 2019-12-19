"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module tests
 */
jest.mock('../../apollo');
const apollo = __importStar(require("../../apollo"));
const queries_1 = require("../../queries");
const asset_1 = __importDefault(require("../../../models/asset"));
const symbolApi_1 = __importDefault(require("../symbolApi"));
const symbol_1 = __importDefault(require("../../../models/symbol"));
const symbolOrdersApi_1 = __importDefault(require("../symbolOrdersApi"));
const symbolTickerApi_1 = __importDefault(require("../symbolTickerApi"));
const anteSymbolId = 1;
let symbolApi = null;
let anteSymbol = null;
// ..
jest.setTimeout(10000);
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    const { data: { exchange } } = yield apollo.tronTradeApiClient.query({
        query: queries_1.querySymbol,
        variables: {
            exchangeId: anteSymbolId
        }
    });
    const s = anteSymbol = new symbol_1.default(exchange.id, `${exchange.sellAssetName}${exchange.buyAssetName}`, new asset_1.default({
        name: exchange.sellAssetName,
        precision: exchange.tokenDecimalsA
    }), new asset_1.default({
        name: exchange.buyAssetName,
        precision: exchange.tokenDecimalsB
    }));
    symbolApi = new symbolApi_1.default(s);
}));
describe("symbolOrderBookApi", () => {
    test("orderbook.current", () => __awaiter(this, void 0, void 0, function* () {
        const orderbook = symbolApi.orderbook();
        const current = yield orderbook.current();
        // console.log( current, {
        //   sell: current.sellPrice(),
        //   buy: current.buyPrice()
        // });
        expect(current.sell()[0].price).toBeGreaterThan(current.buy()[0].price);
    }));
    // TODO: orderbook.watch
    test.todo("orderbook.watch");
});
describe("symbolOrdersApi", () => {
    afterEach(() => {
        // @ts-ignore
        apollo.restoreTTApiClient();
    });
    test("symbolApi.orders type", () => {
        const orders = symbolApi.orders();
        expect(orders).toBeInstanceOf(symbolOrdersApi_1.default);
    });
    test("orders.query", () => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        apollo.setLocalTTApiClient();
        const orders = symbolApi.orders();
        expect.assertions(2);
        const result = yield orders.query();
        console.log('orders.query result:', result);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(0);
        // expect(result[0].symbolId).toBe(anteSymbolId);
    }));
    // TODO: orders.watch
    test.todo("orders.watch");
});
describe("symbolTickerApi", () => {
    test("symbolApi.ticker type", () => {
        const ticker = symbolApi.ticker();
        expect(ticker).toBeInstanceOf(symbolTickerApi_1.default);
    });
    test("ticker.current", () => __awaiter(this, void 0, void 0, function* () {
        const ticker = symbolApi.ticker();
        expect.assertions(1);
        const result = yield ticker.current();
        expect(result.price).toBeGreaterThan(0);
    }));
});
