const originModule = jest.requireActual('../apollo')

const originTronTradeApiClient = originModule.tronTradeApiClient

const localTTApiClient = originModule.createTronTradeApiClient('http://localhost:3010')

const mocked =   {
    ...originModule,
    tronTradeApiClient: originTronTradeApiClient,
    // extra for test
    localTTApiClient,
    setLocalTTApiClient,
    restoreTTApiClient
}

function setLocalTTApiClient() {
    mocked.tronTradeApiClient = localTTApiClient
}

function restoreTTApiClient() {
    mocked.tronTradeApiClient = originTronTradeApiClient
}

module.exports = mocked