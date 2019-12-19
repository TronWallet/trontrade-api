"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Symbol
 */
class Symbol {
    constructor(id, name, baseAsset, quoteAsset) {
        this.id = parseInt(id);
        this.name = name;
        this.baseAsset = baseAsset;
        this.quoteAsset = quoteAsset;
    }
}
exports.default = Symbol;
