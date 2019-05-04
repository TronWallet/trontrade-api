import xhr from "axios";
import {
  TronTradeCancelContract,
  TronTradeTRC10Contract,
  TronTradeTRC20Address,
  TronTradeTRC20Contract
} from "../../contracts";
import AddOrderRequest from "./addOrderRequest";
import {API_URL} from "../../config";
import {OrderSide} from "../../models/order";
import {Market} from "../../models/market";

const TYPE_LIMIT = 1;
const TYPE_MARKET = 2;

const FEE_LIMIT = 10000000;

export default class TradeService {

  private tronWeb: any;

  constructor(tronWeb: any) {
    this.tronWeb = tronWeb;
  }

  /**
   * Request approval to transfer tokens for the given TRC20 contract
   */
  private async approve(contractAddress: string, amount: number) {

    console.log("approve", amount);

    const contract = await this.tronWeb.contract().at(contractAddress);
    return await contract.approve(TronTradeTRC20Address, amount).send();
  }

  /**
   * Create a TRC20 sell order
   */
  private async createTRC20SellOrder(
    orderForm: AddOrderRequest) {

    console.log("createTRC20SellOrder", orderForm.getInfo());

    const price = orderForm.getPriceValue();
    const amount = orderForm.getTokenValue();

    return await TronTradeTRC20Contract(this.tronWeb).sellToken(orderForm.market.tokenIdA, price, amount, TYPE_LIMIT).send({
      feeLimit: FEE_LIMIT,
    });
  }

  /**
   * Create a TRC20 buy order
   */
  private async createTRC20BuyOrder(
    orderForm: AddOrderRequest) {

    console.log("createTRC20BuyOrder", orderForm.getInfo());

    const price = orderForm.getPriceValue();
    const amount = orderForm.getTokenValue();

    return await TronTradeTRC20Contract(this.tronWeb).buyToken(orderForm.market.tokenIdA, price, amount).send({
      callValue: orderForm.callValue(),
      feeLimit: FEE_LIMIT,
    });
  }

  /**
   * Create a TRC10 sell order
   */
  private async createTRC10SellOrder(
    orderForm: AddOrderRequest) {

    console.log("createTRC10SellOrder", orderForm.getInfo());

    return await TronTradeTRC10Contract(this.tronWeb).sellToken(orderForm.getPriceValue(), TYPE_LIMIT).send({
      // @ts-ignore
      tokenId: parseInt(orderForm.market.tokenIdA),
      tokenValue: orderForm.getTokenValue(),
      feeLimit: FEE_LIMIT,
    });
  }

  /**
   * Create a TRC10 buy order
   */
  private async createTRC10BuyOrder(
    orderForm: AddOrderRequest) {

    console.log("createTRC10BuyOrder", orderForm.getInfo());

    const price = orderForm.getPriceValue();
    const amount = orderForm.getTokenValue();

    return await TronTradeTRC10Contract(this.tronWeb).buyToken(orderForm.market.tokenIdA, price, amount).send({
      feeLimit: FEE_LIMIT,
      callValue: orderForm.callValue(),
    });
  }

  async placeOrder(
    ownerWallet: string,
    order: AddOrderRequest) {

    switch (order.side) {
      case OrderSide.Buy:
        return await this.placeBuyOrder(
          this.tronWeb.defaultAddress.base58,
          order
        );
      case OrderSide.Sell:
        return await this.placeSellOrder(
          this.tronWeb.defaultAddress.base58,
          order
        );
    }
  }

  /**
   * Place buy order
   */
  async placeBuyOrder(
    ownerWallet: string,
    orderForm: AddOrderRequest) {

    orderForm.validate();

    let buyOrderTxID = null;

    switch (orderForm.market.tokenTypeA) {
      case 'TRC20':
        buyOrderTxID = await this.createTRC20BuyOrder(orderForm);
        break;
      case 'TRC10':
        buyOrderTxID = await this.createTRC10BuyOrder(orderForm);
        break;
    }

    await xhr.post(`${API_URL}/api/orders`, {
      ownerWallet,
      exchangeId: orderForm.market.id,
      quantity: orderForm.getTokenValue(),
      marketPrice: orderForm.getPriceValue(),
      side: OrderSide.Buy,
      txOrder: buyOrderTxID,
    });

    return {
      side: OrderSide.Buy,
      txOrder: buyOrderTxID,
    };
  }

  async placeSellOrder(
    ownerWallet: string,
    orderForm: AddOrderRequest) {

    orderForm.validate();

    let sellOrderTxID = null;

    switch (orderForm.market.tokenTypeA) {
      case 'TRC20':
        await this.approve(orderForm.market.tokenIdA, orderForm.getTokenValue());
        sellOrderTxID = await this.createTRC20SellOrder(orderForm);
        break;
      case 'TRC10':
        sellOrderTxID = await this.createTRC10SellOrder(orderForm);
        break;
    }

    await xhr.post(`${API_URL}/api/orders`, {
      ownerWallet,
      exchangeId: orderForm.market.id,
      quantity: orderForm.getTokenValue(),
      marketPrice: orderForm.getPriceValue(),
      side: OrderSide.Sell,
      txOrder: sellOrderTxID,
    });

    return {
      side: OrderSide.Sell,
      txOrder: sellOrderTxID,
    };
  }

  async cancelOrder(
    market: Market,
    orderId: number
  ): Promise<string> {
    if (market.tokenTypeA === "TRC10") {
      return await TronTradeCancelContract(this.tronWeb).cancelTrc10Order(orderId).send({
        feeLimit: 10000000,
      });
    } else {
      return await TronTradeCancelContract(this.tronWeb).cancelOrder(orderId).send({
        feeLimit: 10000000,
      });
    }
  }
}
