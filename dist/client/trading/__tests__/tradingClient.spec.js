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
const __1 = __importDefault(require(".."));
const order_1 = require("../../../models/order");
const addOrderRequest_1 = require("../addOrderRequest");
const symbolApi_1 = __importDefault(require("../../../api/symbol/symbolApi"));
const apollo_1 = require("../../../api/apollo");
const queries_1 = require("../../../api/queries");
const asset_1 = __importDefault(require("../../../models/asset"));
const symbol_1 = __importDefault(require("../../../models/symbol"));
// TODO: test account for trading client..
const trading = new __1.default({
    privateKey: process.env.TRADING_PK || "",
    fullNodeUrl: "https://api.shasta.trongrid.io/"
});
let markets = {};
function loadMarkets() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: { exchanges } } = yield apollo_1.tronTradeApiClient.query({
            query: queries_1.querySymbols
        });
        exchanges.forEach((exchange) => {
            markets[exchange.id] = exchange;
        });
    });
}
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield loadMarkets();
}));
// TODO: shared get symbol util
const anteSymbolId = 1;
let symbolApi = null;
let anteSymbol = null;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    const { data: { exchange } } = yield apollo_1.tronTradeApiClient.query({
        query: queries_1.querySymbol,
        variables: {
            exchangeId: anteSymbolId
        }
    });
    const s = (anteSymbol = new symbol_1.default(exchange.id, `${exchange.sellAssetName}${exchange.buyAssetName}`, new asset_1.default({
        name: exchange.sellAssetName,
        precision: exchange.tokenDecimalsA
    }), new asset_1.default({
        name: exchange.buyAssetName,
        precision: exchange.tokenDecimalsB
    })));
    symbolApi = new symbolApi_1.default(s);
}));
// TODO: different between market and symbol..
const orderId = "7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd";
const orderHash = "7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd";
describe.skip("tradingClient", () => {
    test("trading.submitOrder", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(1);
        // TODO: fix this test..
        const resPromise = trading.submitOrder(new addOrderRequest_1.AddOrderRequest({
            amount: 10,
            price: 25,
            side: order_1.OrderSide.Buy,
            market: markets[anteSymbolId]
        }));
        yield expect(resPromise).rejects.toBeDefined();
    }));
    test("trading.submitBuyOrder", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(1);
        // TODO: fix this test..
        const resPromise = trading.submitBuyOrder(anteSymbolId, 10, 25);
        yield expect(resPromise).rejects.toBeDefined();
    }));
    test("trading.submitSellOrder", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(1);
        // TODO: fix this test..
        const resPromise = trading.submitSellOrder(anteSymbolId, 10, 25);
        yield expect(resPromise).rejects.toBeDefined();
    }));
    test("trading.cancelOrderById", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(1);
        // TODO: fix this test..
        const resPromise = trading.cancelOrderById(anteSymbolId, orderId);
        yield expect(resPromise).rejects.toBeDefined();
    }));
    test("trading.cancelOrderByHash", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(1);
        // TODO: fix this test..
        const resPromise = trading.cancelOrderByHash(anteSymbolId, orderHash);
        yield expect(resPromise).rejects.toBeDefined();
    }));
});
