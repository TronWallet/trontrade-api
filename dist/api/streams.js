"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module api.streams
 */
const rxjs_1 = require("rxjs");
const sockets_1 = require("../services/sockets");
function newOrderStream() {
    return new rxjs_1.Observable(observer => {
        const socket = sockets_1.createSocket();
        socket.on("order", order => {
            observer.next({
                transaction: order.txOrder,
                orderId: order.contractId,
                symbolId: order.marketId,
                status: order.status,
                wallet: order.wallet,
                amount: order.amount,
                filled: order.filled,
                price: order.marketPrice,
                createdAt: order.createdAt,
                side: order.side,
            });
        });
        return () => socket.disconnect();
    });
}
exports.newOrderStream = newOrderStream;
function newTradeStream() {
    return new rxjs_1.Observable(observer => {
        const socket = sockets_1.createSocket();
        socket.on("trade", trade => {
            observer.next({
                tx: trade.tx,
                symbolId: trade.marketId,
                price: trade.price,
                filled: trade.filled,
                time: trade.time,
                side: trade.side,
                fromWallet: trade.fromWallet,
                toWallet: trade.toWallet,
            });
        });
        return () => socket.disconnect();
    });
}
exports.newTradeStream = newTradeStream;
