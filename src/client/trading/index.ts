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

  private async loadMarkets() {
    const { data: { exchanges } } = await tronTradeApiClient.query({
      query: querySymbols
    });

    this.symbols = exchanges.map(exchange => new Symbol(
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

  async submitOrder(order: AddOrderRequest): Promise<OrderResult> {
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
