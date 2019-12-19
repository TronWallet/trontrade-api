"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Socket.IO functions
 *
 * @module sockets
 */
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const config_1 = require("../config");
/**
 * Returns a socket.io client connected to TronTrade API
 */
function createSocket() {
    return socket_io_client_1.default(config_1.API_URL);
}
exports.createSocket = createSocket;
