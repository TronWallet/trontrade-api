"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module api.queries
 */
const graphql_tag_1 = __importDefault(require("graphql-tag"));
/**
 * Reads the TRC20 balance for a given address and contract
 */
exports.readTRC20Balance = graphql_tag_1.default `
  query trc20Balance($address: ID!, $contract: String!) {
    account(address: $address) {
      balance {
        token: trc20(address: $contract) {
          balance
          balanceSun
          decimals
        }
      }
    }
  }`;
/**
 * Reads the TRC10 balance for a given address and contract
 */
exports.readTRC10Balance = graphql_tag_1.default `
  query trc10Balance($address: ID!, $id: String!) {
    account(address: $address) {
      balance {
        token: trc10(id: $id) {
          balance
          decimals
        }
      }
    }
  }`;
/**
 * Reads the TRX balance
 */
exports.readTrxBalance = graphql_tag_1.default `
  query trxBalance($address: ID!) {
    account(address: $address) {
      balance {
        trx
      }
    }
  }`;
exports.queryLatestTrades = graphql_tag_1.default `
  query latestTransactions($exchangeId: ID!) {
    exchange(id: $exchangeId) {
      history(limit: 50) {
        id
        side
        price
        filled
        createdAt
        marketId
        txId
      }
      tokenDecimalsA
      tokenDecimalsB
    }
  }
`;
exports.queryWalletOrders = graphql_tag_1.default `
  query queryWalletOrders($address: ID!, $status: String!, $exchangeId: Int!, $sortType: String, $orderBy: String, $start: Int!, $limit: Int!) {
    wallet(address: $address) {
      orders(start: $start, limit: $limit, status: $status, exchangeId: $exchangeId, sortType: $sortType, orderBy: $orderBy) {
        totalCount,
        rows {
          id
          marketPrice
          amount
          filled
          status
          txStatus
          createdAt
          txOrder
          marketId
          contractId
          side
          completedAt
        }
      }
    }
  }
`;
exports.querySymbols = graphql_tag_1.default `
  query {
    exchanges {
      id
      stats {
        h24_price
        high
        low
        volume
        volumeTrx
        h24_change
        lastPrice
      }
      icon
      buyAssetName
      sellAssetName
      tokenTypeA
      tokenIdA
      tokenTypeB
      tokenIdB
      tokenDecimalsA
      tokenDecimalsB
      site
      listed
    }
  }
`;
exports.querySymbol = graphql_tag_1.default `
  query querySymbol($exchangeId: ID!) {
    exchange(id: $exchangeId) {
      id
      stats {
        h24_price
        high
        low
        volume
        volumeTrx
        h24_change
        lastPrice
      }
      icon
      buyAssetName
      sellAssetName
      tokenTypeA
      tokenIdA
      tokenTypeB
      tokenIdB
      tokenDecimalsA
      tokenDecimalsB
      site
      listed
    }
  }
`;
exports.querySymbolTicker = graphql_tag_1.default `
  query querySymbol($exchangeId: ID!) {
    exchange(id: $exchangeId) {
      id
      stats {
        h24_price
        high
        low
        volume
        volumeTrx
        h24_change
        lastPrice
      }
    }
  }
`;
exports.queryOrderBook = graphql_tag_1.default `
  query orderBook($exchangeId: ID!){
    exchange(id: $exchangeId) {
      tokenIdA
      tokenIdB
      tokenDecimalsA
      tokenDecimalsB
      orderBook(limit: 100) {
        totalBuy
        totalSell
        buy {
          price
          totalAmount
        }
        sell {
          price
          totalAmount
        }
      }
    }
  }
`;
exports.queryAllLatestTransactions = graphql_tag_1.default `
  query {
    exchanges{
      history(limit: 1){
        id
        marketId
        price
        txId
      }
    }
  }
`;
exports.queryMarketStats = (marketId) => graphql_tag_1.default `
  query {
    exchange(id: ${marketId}) {
      stats {
        h24_price
        high
        low
        volume
        h24_change
      }
    }
  }
`;
exports.queryWalletHistoryOrders = graphql_tag_1.default `
query walletOrder($address: ID!, $start: Int, $limit: Int, $status: String!, $exchangeId: Int, $sortType: String, $orderBy: String){
  wallet(address: $address) {
    orders(limit: $limit, start: $start, status: $status, exchangeId: $exchangeId, sortType: $sortType, orderBy: $orderBy) {
      totalCount,
      rows {
        id
        marketPrice
        amount
        filled
        status
        txStatus
        createdAt
        txOrder
        marketId
        contractId
        side
        completedAt
      }
    }
  }
}
`;
exports.queryWalletHistoryTrades = graphql_tag_1.default `
query walletTrade($address: ID!, $start: Int, $limit: Int, $exchangeId: Int, $sortType: String, $orderBy: String!){
  wallet(address: $address) {
    trades(limit: $limit, start: $start, exchangeId: $exchangeId, sortType: $sortType, orderBy: $orderBy) {
      totalCount,
      rows {
        id
        txId
        quantity
        price
        filled
        status
        txStatus
        createdAt
        marketId
        side
        fromOrder
        toOrder
      }
    }
  }
}
`;
exports.queryWalletTotalVolume = (address, exchangeId, days) => graphql_tag_1.default `
  query {
    wallet(address: "${address}") {
      volume(exchangeId: ${exchangeId}, days: ${days})
    }
  }
`;
exports.queryStats = graphql_tag_1.default `
  query {
    stats {
      traders24hActive
      volume24hTrx
    }
  }
`;
exports.queryMarketCap = graphql_tag_1.default `
  query {
    marketCap {
      markets {
        name
        abbreviation
        icon
        type
        price
        volume
        marketcap
        h24Change
        decimals
        circulatingSupply
        totalSupply
        priceTrendLine(interval: "4h")
      }
    }
  }
`;
exports.querySymbolOrders = graphql_tag_1.default `
query symbolOrder($exchangeId: ID!, $start: Int, $limit: Int, $status: String!, $sortType: String, $orderBy: String){
  exchange(id: $exchangeId) {
    orders(status: $status, limit: $limit, start: $start, sortType: $sortType, orderBy: $orderBy) {
      totalCount,
      rows {
        id
        marketPrice
        amount
        filled
        status
        txStatus
        createdAt
        txOrder
        marketId
        contractId
        side
        completedAt
      }
    }
  }
}
`;
