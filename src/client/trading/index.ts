/**
 * # Trading Client
 *
 * See [[TradingClient]]
 *
 * @module client.trading
 */
import TronWeb from "tronweb";
import TradeService from "./tradeService";
import {Market} from "../../models/market";
import {tronTradeApiClient} from "../../api/apollo";
import {querySymbols} from "../../api/queries";
import Symbol from "../../models/symbol";
import Asset from "../../models/asset";
import {AddOrderRequest} from "./addOrderRequest";
import {OrderSide} from "../../models/order";
import {find} from "lodash";

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

  private readonly tronWeb: any;
  private readonly tradeService: TradeService;
  private symbols: { [key: number]: Market };

  constructor(options: WalletOptions) {
    this.tronWeb = new TronWeb({
      privateKey: options.privateKey,
      fullHost: options.fullNodeUrl,
    });

    this.tradeService = new TradeService(this.tronWeb);
  }

  /**
   * Load markets
   *
   * @internal
   */
  private async loadMarkets() {
    const { data: { exchanges } } = await tronTradeApiClient.query({
      query: querySymbols
    });

    // TODO: this won't work ...
    this.symbols = exchanges.map(exchange => new Symbol(
      exchange.id,
      `${exchange.sellAssetName}${exchange.buyAssetName}`,
      new Asset({
        name: exchange.sellAssetName,
        precision: exchange.tokenDecimalsA,
      }),
      new Asset({
        name: exchange.buyAssetName,
        precision: exchange.tokenDecimalsB,
      }),
    ));
  }

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
  async submitOrder(order: AddOrderRequest): Promise<OrderResult> {
    // name : submitOrderRequest ?
    if (!this.symbols) {
      await this.loadMarkets();
    }

    const result = await this.tradeService.placeOrder(
      this.tronWeb.defaultAddress.hex,
      order
    );

    return {
      transaction: result.txOrder,
    };
  }

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
  async submitBuyOrder(symbolId: number, amount: number, price: number): Promise<OrderResult> {
    if (!this.symbols) {
      await this.loadMarkets();
    }

    return await this.submitOrder(new AddOrderRequest({
      amount,
      price,
      market: this.symbols[symbolId],
      side: OrderSide.Buy,
    }));
  }

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
  async submitSellOrder(symbolId: number, amount: number, price: number): Promise<OrderResult> {
    if (!this.symbols) {
      await this.loadMarkets();
    }

    return await this.submitOrder(new AddOrderRequest({
      amount,
      price,
      market: this.symbols[symbolId],
      side: OrderSide.Buy,
    }));
  }

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
  async cancelOrderByHash(symbolId: number, transactionHash: string): Promise<OrderCancelResult> {
    if (!this.symbols) {
      await this.loadMarkets();
    }

    const events  = await this.tronWeb.event.getEventsByTransactionID(transactionHash);

    const orderEvent = find(events, ev => ev.name === "Order");

    if (!orderEvent) {
      throw new Error("No event not found for hash");
    }

    return await this.cancelOrderById(symbolId, orderEvent.result.orderId);
  }

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
  async cancelOrderById(symbolId: number, orderId: number | string): Promise<OrderCancelResult> {

    if (!this.symbols) {
      await this.loadMarkets();
    }

    const symbol = this.symbols[symbolId];

    orderId = parseInt(orderId.toString());

    const txHash = await this.tradeService.cancelOrder(symbol, orderId);

    return {
      transaction: txHash
    };
  }
}
