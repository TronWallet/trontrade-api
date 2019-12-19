/**
 * # Account API
 *
 * @module api.account
 */
import AccountOrdersApi from "./accountOrdersApi";
import AccountTradesApi from "./accountTradesApi";
import Symbol from "../../models/symbol";
import { Dictionary } from "lodash";
/**
 * Account API
 */
export default class AccountApi {
    private walletAddress;
    private symbols;
    constructor(walletAddress: string, symbols?: Dictionary<Symbol>);
    /**
     * Account Orders API
     */
    orders(): AccountOrdersApi;
    /**
     * Account Orders API
     */
    trades(): AccountTradesApi;
}
