"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Account API
 *
 * @module api.account
 */
const accountOrdersApi_1 = __importDefault(require("./accountOrdersApi"));
const accountTradesApi_1 = __importDefault(require("./accountTradesApi"));
/**
 * Account API
 */
class AccountApi {
    constructor(walletAddress, symbols = {}) {
        this.walletAddress = walletAddress;
        this.symbols = symbols;
    }
    /**
     * Account Orders API
     */
    orders() {
        return new accountOrdersApi_1.default(this.walletAddress, this.symbols);
    }
    /**
     * Account Orders API
     */
    trades() {
        return new accountTradesApi_1.default(this.walletAddress, this.symbols);
    }
}
exports.default = AccountApi;
