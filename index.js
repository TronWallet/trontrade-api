const client = require('./dist/client/exchangeClient');
const trading = require('./dist/client/trading/index');

module.exports = {
 ExchangeClient: client,
 TradingClient: trading
}
