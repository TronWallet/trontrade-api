# TronTrade SDK

## Getting Started

```bash
yarn install
```

### Build

```bash
yarn build
```

### Generate documentation

```bash
yarn docs
```

The documentation will be available in the folder `/docs`

## Examples

**Create client**

```javascript
const client = new ExchangeClient();
```

**Receive new orders from a specific symbol**

```javascript
const anteSymbolId = 1;
const symbolApi = await client.symbol(anteSymbolId);

symbolApi.orders().watch().subscribe(order => {
  // Handle order
  console.log("New Order!", order);
});
```

**Get price for symbol**

```javascript
const anteSymbolId = 1;
const symbolApi = await client.symbol(anteSymbolId);

const ticker = await symbolApi.ticker().current();

console.log(`Current ANTE Price: ${ticker.price}`);
```

**Get price for symbol periodically**

```javascript
symbolApi.ticker().watch().subscribe(ticker => {
  console.log(`Current ANTE Price: ${ticker.price}`);
});
```
