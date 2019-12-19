/**
 * @module models
 */
import Symbol from "./symbol";
interface OrderPrice {
    price: number;
    totalAmount: number;
}
export default class OrderBook {
    private symbol;
    private readonly _buy;
    private readonly _sell;
    constructor(symbol: Symbol, orderBook: {
        buy: OrderPrice[];
        sell: OrderPrice[];
    });
    /**
     * Return prices on buy side
     */
    buy(): OrderPrice[];
    /**
     * Return prices on sell side
     */
    sell(): OrderPrice[];
    /**
     * Return lowest sell price
     */
    sellPrice(): OrderPrice;
    /**
     * Return highest buy price
     */
    buyPrice(): OrderPrice;
}
export {};
