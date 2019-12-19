"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module utils
 */
const bignumber_js_1 = __importDefault(require("bignumber.js"));
/**
 * Convert the number from TRX to SUN
 */
function toSun(value) {
    return pow(new bignumber_js_1.default(value), 6);
}
exports.toSun = toSun;
/**
 * Math.pow
 *
 * @param value
 * @param pow
 */
function pow(value, pow) {
    return new bignumber_js_1.default(value).multipliedBy(Math.pow(10, pow));
}
exports.pow = pow;
