"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module api.graphql
 */
// TODO: web fetch polyfill or outside dependency
const node_fetch_1 = __importDefault(require("node-fetch"));
const apollo_client_1 = require("apollo-client");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_batch_http_1 = require("apollo-link-batch-http");
const config_1 = require("../config");
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
function createTronTradeApiClient(apiUrl) {
    return new apollo_client_1.ApolloClient({
        // By default, this client will send queries to the
        //  `/graphql` endpoint on the same host
        // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
        // to a different host
        link: new apollo_link_batch_http_1.BatchHttpLink({
            uri: apiUrl + "/graphql",
            fetch: node_fetch_1.default,
            batchInterval: 50,
        }),
        cache: new apollo_cache_inmemory_1.InMemoryCache(),
        // @ts-ignore
        defaultOptions,
    });
}
exports.createTronTradeApiClient = createTronTradeApiClient;
exports.tronTradeApiClient = createTronTradeApiClient(config_1.API_URL);
exports.guildChatApiClient = new apollo_client_1.ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new apollo_link_batch_http_1.BatchHttpLink({
        uri: process.env.GRAPHQL_API || config_1.GRAPHQL_API,
        fetch: node_fetch_1.default,
        batchInterval: 50,
    }),
    cache: new apollo_cache_inmemory_1.InMemoryCache(),
    // @ts-ignore
    defaultOptions,
});
