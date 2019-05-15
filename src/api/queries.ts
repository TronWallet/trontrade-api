/**
 * @module api.queries
 */
import gql from "graphql-tag";
import {OrderStatus} from "../models/order";

/**
 * Reads the TRC20 balance for a given address and contract
 */
export const readTRC20Balance = gql`
  query trc20Balance($address: String!, $contract: String!) {
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
export const readTRC10Balance = gql`
  query trc10Balance($address: String!, $id: String!) {
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
export const readTrxBalance = gql`
  query trxBalance($address: String!) {
    account(address: $address) {
      balance {
        trx
      }
    }
  }`;

export const queryLatestTrades = gql`
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
    }
  }
`;


export const queryWalletOrders = gql`
  query queryWalletOrders($address: String!, $status: String!, $exchangeId: Int!, $sortType: String, $orderBy: String, $start: Int!, $limit: Int!) {
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

export const querySymbols = gql`
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

export const querySymbol = gql`
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
export const querySymbolTicker = gql`
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


export const queryOrderBook = gql`
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

export const queryAllLatestTransactions = gql`
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

export const queryMarketStats = (marketId) => gql`
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


export const queryWalletHistoryOrders = gql`
query walletOrder($address: String!, $start: Int!, $limit: Int!, $status: String, $exchangeId: Int!, $sortType: String!, $orderBy: String!){
  wallet(address: address) {
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


export const queryWalletHistoryTrades = gql`
query walletTrade($address: String!, $start: Int!, $limit: Int!, $exchangeId: Int!, $sortType: String!, $orderBy: String!){
  wallet(address: address) {
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
        contractId
        side
        fromOrder
        toOrder
        fromOrderWallet
        toOrderWallet
      }
    }
  }
}
`;

export const queryWalletTotalVolume = (address, exchangeId, days) => gql`
  query {
    wallet(address: "${address}") {
      volume(exchangeId: ${exchangeId}, days: ${days})
    }
  }
`;

export const queryStats = gql`
  query {
    stats {
      traders24hActive
      volume24hTrx
    }
  }
`;

export const queryMarketCap = gql`
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
