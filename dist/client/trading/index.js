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
 * # Trading Client
 *
 * See [[TradingClient]]
 *
 * @module client.trading
 */
const tronweb_1 = __importDefault(require("tronweb"));
const tradeService_1 = __importDefault(require("./tradeService"));
const apollo_1 = require("../../api/apollo");
const queries_1 = require("../../api/queries");
const symbol_1 = __importDefault(require("../../models/symbol"));
const asset_1 = __importDefault(require("../../models/asset"));
const addOrderRequest_1 = require("./addOrderRequest");
const order_1 = require("../../models/order");
const lodash_1 = require("lodash");
/**
 * # Trading Client
 *
 * Trading Client requires a valid wallet private key
 *
 * ## Usage
 *
 * ```javascript
 * const tradingClient = new TradingClient({
 *  privateKey: '....',
 *  fullNodeUrl: 'https://api.trongrid.io',
 * });
 *
 * const anteSymbolId = 1;
 *
 * // Buy 10 ANTE for the price of 25 TRX
 * tradingClient.submitBuyOrder(anteSymbolId, 10, 25);
 *
 * // Sell 10 ANTE for the price of 25 TRX
 * tradingClient.sellBuyOrder(anteSymbolId, 10, 25);
 * ```
 *
 */
class TradingClient {
    constructor(options) {
        this.tronWeb = new tronweb_1.default({
            privateKey: options.privateKey,
            fullHost: options.fullNodeUrl,
        });
        this.tradeService = new tradeService_1.default(this.tronWeb);
    }
    /**
     * Load markets
     *
     * @internal
     */
    loadMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchanges } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.querySymbols
            });
            // TODO: this won't work ...
            this.symbols = exchanges.map(exchange => new symbol_1.default(exchange.id, `${exchange.sellAssetName}${exchange.buyAssetName}`, new asset_1.default({
                name: exchange.sellAssetName,
                precision: exchange.tokenDecimalsA,
            }), new asset_1.default({
                name: exchange.buyAssetName,
                precision: exchange.tokenDecimalsB,
            })));
        });
    }
    /**
     * Submit a new order
     *
     * It is recommended to use the [[submitBuyOrder]] and [[submitSellOrder]] functions
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     * const anteSymbol
     *
     * // Buy 10 ANTE for the price of 25 TRX
     * tradingClient.submitOrder(new AddOrderRequest({
     *   amount: 10,
     *   price: 25,
     *   side: OrderSide.Buy,
     *   market: markets[anteSymbolId],
     * });
     * ```
     */
    submitOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            // name : submitOrderRequest ?
            if (!this.symbols) {
                yield this.loadMarkets();
            }
            const result = yield this.tradeService.placeOrder(this.tronWeb.defaultAddress.hex, order);
            return {
                transaction: result.txOrder,
            };
        });
    }
    /**
     * Submit a new buy order
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Buy 10 ANTE for the price of 25 TRX
     * tradingClient.submitBuyOrder(anteSymbolId, 10, 25);
     * ```
     *
     * @param symbolId
     * @param amount
     * @param price
     */
    submitBuyOrder(symbolId, amount, price) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.symbols) {
                yield this.loadMarkets();
            }
            return yield this.submitOrder(new addOrderRequest_1.AddOrderRequest({
                amount,
                price,
                market: this.symbols[symbolId],
                side: order_1.OrderSide.Buy,
            }));
        });
    }
    /**
     * Submit a new sell order
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.submitSellOrder(anteSymbolId, 10, 25);
     * ```
     *
     * @param symbolId
     * @param amount
     * @param price
     */
    submitSellOrder(symbolId, amount, price) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.symbols) {
                yield this.loadMarkets();
            }
            return yield this.submitOrder(new addOrderRequest_1.AddOrderRequest({
                amount,
                price,
                market: this.symbols[symbolId],
                side: order_1.OrderSide.Buy,
            }));
        });
    }
    /**
     * Cancel an order by giving the transaction hash
     *
     * The orderId is then read from the event by reading it from the event server
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.cancelOrderById(anteSymbolId, '7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd');
     * ```
     *
     * @param symbolId
     * @param transactionHash
     */
    cancelOrderByHash(symbolId, transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.symbols) {
                yield this.loadMarkets();
            }
            const events = yield this.tronWeb.event.getEventsByTransactionID(transactionHash);
            const orderEvent = lodash_1.find(events, ev => ev.name === "Order");
            if (!orderEvent) {
                throw new Error("No event not found for hash");
            }
            return yield this.cancelOrderById(symbolId, orderEvent.result.orderId);
        });
    }
    /**
     * Cancel an order by giving the orderId
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.cancelOrderById(anteSymbolId, 1000);
     * ```
     *
     * @param symbolId
     * @param orderId
     */
    cancelOrderById(symbolId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.symbols) {
                yield this.loadMarkets();
            }
            const symbol = this.symbols[symbolId];
            orderId = parseInt(orderId.toString());
            const txHash = yield this.tradeService.cancelOrder(symbol, orderId);
            return {
                transaction: txHash
            };
        });
    }
}
exports.default = TradingClient;
