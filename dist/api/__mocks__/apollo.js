/**
 * @module tests
 */
const originModule = jest.requireActual('../apollo');
const originTronTradeApiClient = originModule.tronTradeApiClient;
const localTTApiClient = originModule.createTronTradeApiClient('http://localhost:3010');
let current = originTronTradeApiClient;
const mocked = Object.assign({}, originModule, { 
    // extra for test
    localTTApiClient,
    setLocalTTApiClient,
    restoreTTApiClient,
    isLocal });
Object.defineProperties(mocked, {
    tronTradeApiClient: {
        get() {
            // console.log('test isLocal:', isLocal(), new Error('stack:'))
            return current;
        },
    },
    __self: {
        get() {
            return mocked;
        }
    }
});
function setLocalTTApiClient() {
    current = localTTApiClient;
}
function isLocal(test = current) {
    return test === localTTApiClient;
}
function restoreTTApiClient() {
    current = originTronTradeApiClient;
}
module.exports = mocked;
