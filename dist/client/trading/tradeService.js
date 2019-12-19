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
 * @module client.trading
 */
const axios_1 = __importDefault(require("axios"));
const contracts_1 = require("../../contracts");
const config_1 = require("../../config");
const order_1 = require("../../models/order");
const TYPE_LIMIT = 1;
const TYPE_MARKET = 2;
const FEE_LIMIT = 10000000;
/**
 * Trading Service
 *
 * Should not be used directly. Used [[TradingClient]] instead
 */
class TradeService {
    constructor(tronWeb) {
        this.tronWeb = tronWeb;
    }
    /**
     * Request approval to transfer tokens for the given TRC20 contract
     */
    approve(contractAddress, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("approve", amount);
            const contract = yield this.tronWeb.contract().at(contractAddress);
            return yield contract.approve(contracts_1.TronTradeTRC20Address, amount).send();
        });
    }
    /**
     * Create a TRC20 sell order
     */
    createTRC20SellOrder(orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createTRC20SellOrder", orderForm.getInfo());
            const price = orderForm.getPriceValue();
            const amount = orderForm.getTokenValue();
            return yield contracts_1.TronTradeTRC20Contract(this.tronWeb).sellToken(orderForm.market.tokenIdA, price, amount, TYPE_LIMIT).send({
                feeLimit: FEE_LIMIT,
            });
        });
    }
    /**
     * Create a TRC20 buy order
     */
    createTRC20BuyOrder(orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createTRC20BuyOrder", orderForm.getInfo());
            const price = orderForm.getPriceValue();
            const amount = orderForm.getTokenValue();
            return yield contracts_1.TronTradeTRC20Contract(this.tronWeb).buyToken(orderForm.market.tokenIdA, price, amount).send({
                callValue: orderForm.callValue(),
                feeLimit: FEE_LIMIT,
            });
        });
    }
    /**
     * Create a TRC10 sell order
     */
    createTRC10SellOrder(orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createTRC10SellOrder", orderForm.getInfo());
            return yield contracts_1.TronTradeTRC10Contract(this.tronWeb).sellToken(orderForm.getPriceValue(), TYPE_LIMIT).send({
                // @ts-ignore
                tokenId: parseInt(orderForm.market.tokenIdA),
                tokenValue: orderForm.getTokenValue(),
                feeLimit: FEE_LIMIT,
            });
        });
    }
    /**
     * Create a TRC10 buy order
     */
    createTRC10BuyOrder(orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createTRC10BuyOrder", orderForm.getInfo());
            const price = orderForm.getPriceValue();
            const amount = orderForm.getTokenValue();
            return yield contracts_1.TronTradeTRC10Contract(this.tronWeb).buyToken(orderForm.market.tokenIdA, price, amount).send({
                feeLimit: FEE_LIMIT,
                callValue: orderForm.callValue(),
            });
        });
    }
    placeOrder(ownerWallet, order) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (order.side) {
                case order_1.OrderSide.Buy:
                    return yield this.placeBuyOrder(this.tronWeb.defaultAddress.base58, order);
                case order_1.OrderSide.Sell:
                    return yield this.placeSellOrder(this.tronWeb.defaultAddress.base58, order);
            }
        });
    }
    /**
     * Place buy order
     */
    placeBuyOrder(ownerWallet, orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            orderForm.validate();
            let buyOrderTxID = null;
            switch (orderForm.market.tokenTypeA) {
                case 'TRC20':
                    buyOrderTxID = yield this.createTRC20BuyOrder(orderForm);
                    break;
                case 'TRC10':
                    buyOrderTxID = yield this.createTRC10BuyOrder(orderForm);
                    break;
            }
            yield axios_1.default.post(`${config_1.API_URL}/api/orders`, {
                ownerWallet,
                exchangeId: orderForm.market.id,
                quantity: orderForm.getTokenValue(),
                marketPrice: orderForm.getPriceValue(),
                side: order_1.OrderSide.Buy,
                txOrder: buyOrderTxID,
            });
            return {
                side: order_1.OrderSide.Buy,
                txOrder: buyOrderTxID,
            };
        });
    }
    placeSellOrder(ownerWallet, orderForm) {
        return __awaiter(this, void 0, void 0, function* () {
            orderForm.validate();
            let sellOrderTxID = null;
            switch (orderForm.market.tokenTypeA) {
                case 'TRC20':
                    yield this.approve(orderForm.market.tokenIdA, orderForm.getTokenValue());
                    sellOrderTxID = yield this.createTRC20SellOrder(orderForm);
                    break;
                case 'TRC10':
                    sellOrderTxID = yield this.createTRC10SellOrder(orderForm);
                    break;
            }
            yield axios_1.default.post(`${config_1.API_URL}/api/orders`, {
                ownerWallet,
                exchangeId: orderForm.market.id,
                quantity: orderForm.getTokenValue(),
                marketPrice: orderForm.getPriceValue(),
                side: order_1.OrderSide.Sell,
                txOrder: sellOrderTxID,
            });
            return {
                side: order_1.OrderSide.Sell,
                txOrder: sellOrderTxID,
            };
        });
    }
    cancelOrder(market, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (market.tokenTypeA === "TRC10") {
                return yield contracts_1.TronTradeCancelContract(this.tronWeb).cancelTrc10Order(orderId).send({
                    feeLimit: 10000000,
                });
            }
            else {
                return yield contracts_1.TronTradeCancelContract(this.tronWeb).cancelOrder(orderId).send({
                    feeLimit: 10000000,
                });
            }
        });
    }
}
exports.default = TradeService;
