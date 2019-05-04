import {tronTradeApiClient} from "../api/apollo";
import {querySymbol, querySymbols} from "../api/queries";
import Symbol from "../models/symbol";
import Asset from "../models/asset";
import SymbolApi from "../api/symbol/symbolApi";
import AccountApi from "../api/account/accountApi";

export default class ExchangeClient {

  async symbols() {

    const { data: { exchanges } } = await tronTradeApiClient.query({
      query: querySymbols
    });

    return exchanges.map(exchange => new Symbol(
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

  async symbol(id: number) {

    const { data: { exchange } } = await tronTradeApiClient.query({
      query: querySymbol,
      variables: {
        exchangeId: id,
      }
    });

    const s = new Symbol(
      `${exchange.sellAssetName}${exchange.buyAssetName}`,
      new Asset({
        name: exchange.sellAssetName,
        precision: exchange.tokenDecimalsA,
      }),
      new Asset({
        name: exchange.buyAssetName,
        precision: exchange.tokenDecimalsB,
      }),
    );

    return new SymbolApi(s);
  }

  async account(walletAddress: string) {
    return new AccountApi(walletAddress);
  }
}
