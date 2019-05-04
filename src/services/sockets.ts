import io from "socket.io-client";
import {API_URL} from "../config";

export function createSocket(): SocketIOClient.Socket {
  return io(API_URL);
}
