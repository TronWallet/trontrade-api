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


test("isMinimumOrderValue", async () => {
    const addOrderRequest = new AddOrderRequest({
        amount: 10,
        price: 25,
        side: OrderSide.Buy,
        market: markets[anteSymbolId]
      })

    const yes = addOrderRequest.isMinimumOrderValue()
    console.log("isMinimumOrderValue:", yes)

    expect(yes).toBe(true)
});


test.todo('validate')