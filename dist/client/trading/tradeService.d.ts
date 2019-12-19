import { OrderSide } from "../../models/order";
import { Market } from "../../models/market";
import { AddOrderRequest } from "./addOrderRequest";
/**
 * Trading Service
 *
 * Should not be used directly. Used [[TradingClient]] instead
 */
export default class TradeService {
    private tronWeb;
    constructor(tronWeb: any);
    /**
     * Request approval to transfer tokens for the given TRC20 contract
     */
    private approve;
    /**
     * Create a TRC20 sell order
     */
    private createTRC20SellOrder;
    /**
     * Create a TRC20 buy order
     */
    private createTRC20BuyOrder;
    /**
     * Create a TRC10 sell order
     */
    private createTRC10SellOrder;
    /**
     * Create a TRC10 buy order
     */
    private createTRC10BuyOrder;
    placeOrder(ownerWallet: string, order: AddOrderRequest): Promise<{
        side: OrderSide;
        txOrder: any;
    }>;
    /**
     * Place buy order
     */
    placeBuyOrder(ownerWallet: string, orderForm: AddOrderRequest): Promise<{
        side: OrderSide;
        txOrder: any;
    }>;
    placeSellOrder(ownerWallet: string, orderForm: AddOrderRequest): Promise<{
        side: OrderSide;
        txOrder: any;
    }>;
    cancelOrder(market: Market, orderId: number): Promise<string>;
}
