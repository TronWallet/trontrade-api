/**
 * @module client.trading
 */
import BigNumber from "bignumber.js";
import OrderPriceCalculator from "./orderPriceCalculator";
import { OrderSide } from "../../models/order";
import { Market } from "../../models/market";
export interface Options {
    amount: number | BigNumber;
    price: number | BigNumber;
    side: OrderSide;
    market: Market;
}
/**
 * Order Form
 *
 * price = Token B
 * amount = Token A
 */
export declare class AddOrderRequest {
    readonly amount: BigNumber;
    readonly price: BigNumber;
    readonly calculator: OrderPriceCalculator;
    readonly market: Market;
    readonly side: OrderSide;
    constructor({ amount, price, market, side }: Options);
    /**
     * Total Price of the order
     */
    getTotalPrice(): BigNumber;
    getFee(): BigNumber;
    getAmount(): BigNumber;
    /**
     * @Returns the amount without decimals
     */
    getTokenValue(): number;
    /**
     * @returns price in sun
     */
    getPriceValue(): number;
    /**
     * Call value for the smart contract
     */
    callValue(): number;
    /**
     * Checks if the amounts are within the limits of the smart contract call
     */
    validate(): void;
    /**
     * If the amount is at least the minimal required amount
     */
    isMinimumOrderValue(): boolean;
    getInfo(): {
        amount: number;
        price: number;
        priceValue: number;
        tokenValue: number;
        tokenId: string;
        callValue: number;
        market: Market;
        fee: number;
    };
}
