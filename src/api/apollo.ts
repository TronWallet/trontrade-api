/**
 * @module api.graphql
 */
import fetch from 'node-fetch';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {BatchHttpLink} from "apollo-link-batch-http";
import {API_URL, GRAPHQL_API} from "../config";


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: 'all',
  },
};

export const tronTradeApiClient = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host

  link: new BatchHttpLink({
    uri: API_URL + "/graphql",
    fetch: fetch,
    batchInterval: 50,
  }),
  cache: new InMemoryCache(),
  // @ts-ignore
  defaultOptions,
});

export const guildChatApiClient = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new BatchHttpLink({
    uri: process.env.GRAPHQL_API || GRAPHQL_API,
    fetch: fetch,
    batchInterval: 50,
  }),
  cache: new InMemoryCache(),
  // @ts-ignore
  defaultOptions,
});
