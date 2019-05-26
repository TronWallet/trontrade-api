/**
 * # Account API
 *
 * @module api.account
 */
import AccountOrdersApi from "./accountOrdersApi";
import AccountTradesApi from "./accountTradesApi";
import Symbol from "../../models/symbol";
import {Dictionary} from "lodash";

/**
 * Account API
 */
export default class AccountApi {

  private walletAddress: string;
  private symbols: Dictionary<Symbol>;

  constructor(walletAddress: string, symbols: Dictionary<Symbol> = {}) {
    this.walletAddress = walletAddress;
    this.symbols = symbols;
  }

  /**
   * Account Orders API
   */
  orders() {
    return new AccountOrdersApi(this.walletAddress, this.symbols);
  }

  /**
   * Account Orders API
   */
  trades() {
    return new AccountTradesApi(this.walletAddress, this.symbols);
  }
}
