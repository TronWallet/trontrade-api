/**
 * @module tests
 */
import TradingClient from "..";
import { TRON_NODE_URL } from "../../../config";
import { OrderSide } from "../../../models/order";
import { AddOrderRequest } from "../addOrderRequest";

import SymbolApi from "../../../api/symbol/symbolApi";
import { tronTradeApiClient } from "../../../api/apollo";
import { querySymbols, querySymbol } from "../../../api/queries";
import Asset from "../../../models/asset";
import Symbol from "../../../models/symbol";
import { Market } from "../../../models/market";

// TODO: test account for trading client..

const trading = new TradingClient({
  privateKey: process.env.TRADING_PK || "",
  fullNodeUrl: "https://api.shasta.trongrid.io/"
});

let markets: { [key: number]: Market } = {};

async function loadMarkets() {
  const {
    data: { exchanges }
  } = await tronTradeApiClient.query({
    query: querySymbols
  });

  exchanges.forEach((exchange: Market) => {
    markets[exchange.id] = exchange;
  });
}

beforeAll(async () => {
  await loadMarkets();
});

// TODO: shared get symbol util
const anteSymbolId = 1;

let symbolApi: SymbolApi | null = null;

let anteSymbol: Symbol | null = null;

beforeAll(async () => {
  const {
    data: { exchange }
  } = await tronTradeApiClient.query({
    query: querySymbol,
    variables: {
      exchangeId: anteSymbolId
    }
  });

  const s = (anteSymbol = new Symbol(
    exchange.id,
    `${exchange.sellAssetName}${exchange.buyAssetName}`,
    new Asset({
      name: exchange.sellAssetName,
      precision: exchange.tokenDecimalsA
    }),
    new Asset({
      name: exchange.buyAssetName,
      precision: exchange.tokenDecimalsB
    })
  ));

  symbolApi = new SymbolApi(s);
});

// TODO: different between market and symbol..

const orderId =
  "7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd";

const orderHash =
  "7cdbaabcdce2cec43397a9d02a3e69a3685d66e15eb34729b67119263e83afbd";

describe.skip("tradingClient", () => {
  test("trading.submitOrder", async () => {
    expect.assertions(1);
    // TODO: fix this test..

    const resPromise = trading.submitOrder(
      new AddOrderRequest({
        amount: 10,
        price: 25,
        side: OrderSide.Buy,
        market: markets[anteSymbolId]
      })
    );

    await expect(resPromise).rejects.toBeDefined();
  });

  test("trading.submitBuyOrder", async () => {
    expect.assertions(1);
    // TODO: fix this test..
    const resPromise = trading.submitBuyOrder(anteSymbolId, 10, 25);
    await expect(resPromise).rejects.toBeDefined();
  });

  test("trading.submitSellOrder", async () => {
    expect.assertions(1);
    // TODO: fix this test..
    const resPromise = trading.submitSellOrder(anteSymbolId, 10, 25);

    await expect(resPromise).rejects.toBeDefined();
  });

  test("trading.cancelOrderById", async () => {
    expect.assertions(1);
    // TODO: fix this test..
    const resPromise = trading.cancelOrderById(anteSymbolId, orderId);

    await expect(resPromise).rejects.toBeDefined();
  });

  test("trading.cancelOrderByHash", async () => {
    expect.assertions(1);
    // TODO: fix this test..
    const resPromise = trading.cancelOrderByHash(anteSymbolId, orderHash);

    await expect(resPromise).rejects.toBeDefined();
  });
});
