/**
 * @module models
 */
import {OrderSide} from "./order";

/**
 * Trade
 */
export default interface Trade {
  tx: string;
  symbolId: number;
  price: number;
  filled: number;
  time: number;
  side: OrderSide;
}

