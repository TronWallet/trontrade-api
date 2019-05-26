/**
 * @module tests
 */
jest.mock('../../apollo');
import * as apollo from "../../apollo";
import { querySymbol } from "../../queries";
import Asset from "../../../models/asset";
import SymbolApi from "../symbolApi";
import Symbol from "../../../models/symbol";
import SymbolOrderBookApi from "../symbolOrderBookApi";
import SymbolOrdersApi from "../symbolOrdersApi";
import SymbolTickerApi from "../symbolTickerApi";
import SymbolTradesApi from "../symbolTradesApi";

const anteSymbolId = 1;

let symbolApi: SymbolApi|null = null;

let anteSymbol: Symbol|null = null

// ..
jest.setTimeout(10_000)

beforeAll(async () => {
  const {
    data: { exchange }
  } = await apollo.tronTradeApiClient.query({
    query: querySymbol,
    variables: {
      exchangeId: anteSymbolId
    }
  });

  const s = anteSymbol = new Symbol(
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
  );

  symbolApi = new SymbolApi(s);
});

describe("symbolOrderBookApi", () => {
  test("orderbook.current", async () => {
    const orderbook = symbolApi!.orderbook();
    const current = await orderbook!.current();
    // console.log( current, {
    //   sell: current.sellPrice(),
    //   buy: current.buyPrice()
    // });
    expect(current.sell()[0].price).toBeGreaterThan(current.buy()[0].price);
  });

  // TODO: orderbook.watch
  test.todo("orderbook.watch");
});

describe("symbolOrdersApi", () => {
  afterEach(() => {
    // @ts-ignore
    apollo.restoreTTApiClient()
  })

  test("symbolApi.orders type", () => {
    const orders = symbolApi!.orders();
    expect(orders).toBeInstanceOf(SymbolOrdersApi);
  });

  test("orders.query", async () => {
    // @ts-ignore
    apollo.setLocalTTApiClient()
    const orders = symbolApi!.orders();

    expect.assertions(2);

    const result = await orders.query();

    console.log('orders.query result:', result)

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBeGreaterThanOrEqual(0);

    // expect(result[0].symbolId).toBe(anteSymbolId);
  });

  // TODO: orders.watch
  test.todo("orders.watch");
});

describe("symbolTickerApi", () => {

  test("symbolApi.ticker type", () => {
    const ticker = symbolApi!.ticker()
    expect(ticker).toBeInstanceOf(SymbolTickerApi);
  });

  test("ticker.current", async () => {
    const ticker = symbolApi!.ticker()
    expect.assertions(1);

    const result = await ticker.current();

    expect(result.price).toBeGreaterThan(0);

  });

});
