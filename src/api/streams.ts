/**
 * @module api.streams
 */
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {createSocket} from "../services/sockets";
import Trade from "../models/trade";

export function newOrderStream() {
  return new Observable<Order>(observer => {
    const socket = createSocket();

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

export function newTradeStream() {
  return new Observable<Trade>(observer => {
    const socket = createSocket();

    socket.on("trade", trade => {
      observer.next({
        tx: trade.tx,
        symbolId: trade.marketId,
        price: trade.price,
        filled: trade.filled,
        time: trade.time,
        side: trade.side,
      });
    });

    return () => socket.disconnect();
  });
}
