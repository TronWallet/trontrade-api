/**
 * Socket.IO functions
 *
 * @module sockets
 */
import io from "socket.io-client";
import {API_URL} from "../config";

/**
 * Returns a socket.io client connected to TronTrade API
 */
export function createSocket(): SocketIOClient.Socket {
  return io(API_URL);
}
