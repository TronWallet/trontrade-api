"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class OrderBook {
    constructor(symbol, orderBook) {
        this.symbol = symbol;
        this._buy = orderBook.buy;
        this._sell = orderBook.sell;
    }
    /**
     * Return prices on buy side
     */
    buy() {
        return this._buy;
    }
    /**
     * Return prices on sell side
     */
    sell() {
        return this._sell;
    }
    /**
     * Return lowest sell price
     */
    sellPrice() {
        return lodash_1.sortBy(this.sell(), s => s.price)[0];
    }
    /**
     * Return highest buy price
     */
    buyPrice() {
        return lodash_1.sortBy(this.buy(), s => s.price * -1)[0];
    }
}
exports.default = OrderBook;
