/**
 * # Account API
 *
 * @module api.account
 */
import AccountOrdersApi from "./accountOrdersApi";
import AccountTradesApi from "./accountTradesApi";

/**
 * Account API
 */
export default class AccountApi {

  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  /**
   * Account Orders API
   */
  orders() {
    return new AccountOrdersApi(this.walletAddress);
  }

  /**
   * Account Orders API
   */
  trades() {
    return new AccountTradesApi(this.walletAddress);
  }
}
