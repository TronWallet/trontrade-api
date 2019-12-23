const exchange = require('./dist/client/exchangeClient');
const trading = require('./dist/client/trading/index');
const account = require('./dist/api/account/accountApi');
const symbol = require('./dist/api/symbol/symbolApi');
const tradeService = require('./dist/client/trading/tradeService');

const api = {
  ExchangeClient: exchange.default,
  TradingClient: trading.default,
  AccountApi: account.default,
  SymbolApi: symbol.default,
  TradeService: tradeService.default
}

module.exports = api;
