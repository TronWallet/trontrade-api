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
 * @module client
 */
const apollo_1 = require("../api/apollo");
const queries_1 = require("../api/queries");
const symbol_1 = __importDefault(require("../models/symbol"));
const asset_1 = __importDefault(require("../models/asset"));
const symbolApi_1 = __importDefault(require("../api/symbol/symbolApi"));
const accountApi_1 = __importDefault(require("../api/account/accountApi"));
const lodash_1 = require("lodash");
/**
 * # Exchange Client
 *
 * Client which is used to read data from TronTrade
 *
 * ## Examples
 *
 * **Create client**
 *
 * ```javascript
 * const client = new ExchangeClient();
 * ```
 *
 * **Receive new orders from a specific symbol**
 *
 * ```javascript
 * const anteSymbolId = 1;
 * const symbolApi = await client.symbol(anteSymbolId);
 *
 * symbolApi.orders().watch().subscribe(order => {
 *   // Handle order
 *   console.log("New Order!", order);
 * });
 * ```
 *
 * **Get price for symbol**
 *
 * ```javascript
 * const anteSymbolId = 1;
 * const symbolApi = await client.symbol(anteSymbolId);
 *
 * const ticker = await symbolApi.ticker().current();
 *
 * console.log(`Current ANTE Price: ${ticker.price}`);
 * ```
 *
 * **Get price for symbol periodically**
 *
 * ```javascript
 * symbolApi.ticker().watch().subscribe(ticker => {
 *   console.log(`Current ANTE Price: ${ticker.price}`);
 * });
 * ```
 */
class ExchangeClient {
    symbols() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchanges } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.querySymbols
            });
            return exchanges.map(exchange => new symbol_1.default(exchange.id, `${exchange.sellAssetName}${exchange.buyAssetName}`, new asset_1.default({
                name: exchange.sellAssetName,
                precision: parseInt(exchange.tokenDecimalsA),
            }), new asset_1.default({
                name: exchange.buyAssetName,
                precision: parseInt(exchange.tokenDecimalsB),
            })));
        });
    }
    /**
     * Symbol API
     *
     * @param id Exchange ID
     */
    symbol(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: { exchange } } = yield apollo_1.tronTradeApiClient.query({
                query: queries_1.querySymbol,
                variables: {
                    exchangeId: id,
                }
            });
            const s = new symbol_1.default(exchange.id, `${exchange.sellAssetName}${exchange.buyAssetName}`, new asset_1.default({
                name: exchange.sellAssetName,
                precision: exchange.tokenDecimalsA,
            }), new asset_1.default({
                name: exchange.buyAssetName,
                precision: exchange.tokenDecimalsB,
            }));
            return new symbolApi_1.default(s);
        });
    }
    account(walletAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const symbols = yield this.symbols();
            return new accountApi_1.default(walletAddress, lodash_1.keyBy(symbols, s => s.id));
        });
    }
}
exports.default = ExchangeClient;
