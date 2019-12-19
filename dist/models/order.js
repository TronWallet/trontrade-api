"use strict";
/**
 * @module models
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Order Status
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Failed"] = 0] = "Failed";
    OrderStatus[OrderStatus["Pending"] = 1] = "Pending";
    OrderStatus[OrderStatus["Completed"] = 2] = "Completed";
    OrderStatus[OrderStatus["Cancelled"] = 3] = "Cancelled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
/**
 * Order Side
 */
var OrderSide;
(function (OrderSide) {
    OrderSide[OrderSide["Sell"] = 0] = "Sell";
    OrderSide[OrderSide["Buy"] = 1] = "Buy";
})(OrderSide = exports.OrderSide || (exports.OrderSide = {}));
