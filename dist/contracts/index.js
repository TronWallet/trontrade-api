"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Smart Contract ABI and Addresses
 *
 * @module contracts
 */
const TronTradeTRC10Abi = __importStar(require("./tronTradeTRC10"));
const TronTradeTRC20Abi = __importStar(require("./tronTradeTRC20"));
const TronTradeCancelAbi = __importStar(require("./tronTradeCancel"));
var tronTradeTRC10_1 = require("./tronTradeTRC10");
exports.TronTradeTRC10Address = tronTradeTRC10_1.address;
var tronTradeTRC20_1 = require("./tronTradeTRC20");
exports.TronTradeTRC20Address = tronTradeTRC20_1.address;
var tronTradeCancel_1 = require("./tronTradeCancel");
exports.TronTradeCancelAddress = tronTradeCancel_1.address;
exports.TronTradeTRC10Contract = (tronWeb) => tronWeb.contract(TronTradeTRC10Abi.abi, TronTradeTRC10Abi.address);
exports.TronTradeTRC20Contract = (tronWeb) => tronWeb.contract(TronTradeTRC20Abi.abi, TronTradeTRC20Abi.address);
exports.TronTradeCancelContract = (tronWeb) => tronWeb.contract(TronTradeCancelAbi.abi, TronTradeCancelAbi.address);
