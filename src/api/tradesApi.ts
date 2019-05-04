import {Observable} from "rxjs";
import Trade from "../models/trade";

export default interface TradesApi {
  /**
   * Realtime stream of trade updates
   */
  watch(): Observable<Trade>;

  /**
   * Retrieve recent trades
   *
   * @param limit
   */
  recent(limit?: number): Promise<Trade[]>;

}
