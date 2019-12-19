import { AddOrderRequest } from "./addOrderRequest";
interface WalletOptions {
    privateKey: string;
    fullNodeUrl: string;
}
export interface OrderResult {
    transaction: string;
}
export interface OrderCancelResult {
    transaction: string;
}
/**
 * # Trading Client
 *
 * Trading Client requires a valid wallet private key
 *
 * ## Usage
 *
 * ```javascript
 * const tradingClient = new TradingClient({
 *  privateKey: '....',
 *  fullNodeUrl: 'https://api.trongrid.io',
 * });
 *
 * const anteSymbolId = 1;
 *
 * // Buy 10 ANTE for the price of 25 TRX
 * tradingClient.submitBuyOrder(anteSymbolId, 10, 25);
 *
 * // Sell 10 ANTE for the price of 25 TRX
 * tradingClient.sellBuyOrder(anteSymbolId, 10, 25);
 * ```
 *
 */
export default class TradingClient {
    private readonly tronWeb;
    private readonly tradeService;
    private symbols;
    constructor(options: WalletOptions);
    /**
     * Load markets
     *
     * @internal
     */
    private loadMarkets;
    /**
     * Submit a new order
     *
     * It is recommended to use the [[submitBuyOrder]] and [[submitSellOrder]] functions
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     * const anteSymbol
     *
     * // Buy 10 ANTE for the price of 25 TRX
     * tradingClient.submitOrder(new AddOrderRequest({
     *   amount: 10,
     *   price: 25,
     *   side: OrderSide.Buy,
     *   market: markets[anteSymbolId],
     * });
     * ```
     */
    submitOrder(order: AddOrderRequest): Promise<OrderResult>;
    /**
     * Submit a new buy order
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Buy 10 ANTE for the price of 25 TRX
     * tradingClient.submitBuyOrder(anteSymbolId, 10, 25);
     * ```
     *
     * @param symbolId
     * @param amount
     * @param price
     */
    submitBuyOrder(symbolId: number, amount: number, price: number): Promise<OrderResult>;
    /**
     * Submit a new sell order
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.submitSellOrder(anteSymbolId, 10, 25);
     * ```
     *
     * @param symbolId
     * @param amount
     * @param price
     */
    submitSellOrder(symbolId: number, amount: number, price: number): Promise<OrderResult>;
    /**
     * Cancel an order by giving the transaction hash
     *
     * The orderId is then read from the event by reading it from the event server
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.cancelOrderById(anteSymbolId, '7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd');
     * ```
     *
     * @param symbolId
     * @param transactionHash
     */
    cancelOrderByHash(symbolId: number, transactionHash: string): Promise<OrderCancelResult>;
    /**
     * Cancel an order by giving the orderId
     *
     * ## Example
     *
     * ```javascript
     * const anteSymbolId = 1;
     *
     * // Sell 10 ANTE for the price of 25 TRX
     * tradingClient.cancelOrderById(anteSymbolId, 1000);
     * ```
     *
     * @param symbolId
     * @param orderId
     */
    cancelOrderById(symbolId: number, orderId: number | string): Promise<OrderCancelResult>;
}
export {};
