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
const accountApi_1 = __importDefault(require("../accountApi"));
const rxjs_1 = require("rxjs");
const order_1 = require("../../../models/order");
const walletAddress = 'TXRgUnEKA9qHwCnsmXJxvBSNogkZUGgf9v';
const anteSymbol = 1;
const account = new accountApi_1.default(walletAddress, {});
const orders = account.orders();
const trades = account.trades();
describe('AccountOrdersApi', () => {
    test('orders.query', () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(3);
        const result = yield orders.query({
            start: 0,
            limit: 10,
            status: [
                order_1.OrderStatus.Pending,
                order_1.OrderStatus.Failed,
                order_1.OrderStatus.Completed,
                order_1.OrderStatus.Cancelled,
            ],
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].wallet).toBe(walletAddress);
    }));
    test.skip('orders.watch', (done) => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(2);
        const result$ = orders.watch();
        expect(result$).toBeInstanceOf(rxjs_1.Observable);
        const sub = result$.subscribe((order) => {
            expect(order.wallet).toBe(walletAddress);
            sub.unsubscribe();
            done();
        });
    }));
});
describe('AccountTradesApi', () => {
    beforeEach(() => {
        // @ts-ignore
        apollo.restoreTTApiClient();
    });
    test('trades.query', () => __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        apollo.setLocalTTApiClient();
        expect.assertions(3);
        const result = yield trades.query({
            symbolId: anteSymbol
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].symbolId).toBe(anteSymbol);
    }));
});
