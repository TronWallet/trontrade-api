/*
 * @module tests
 */
import AccountTradesApi from "../accountTradesApi";

var trades = new AccountTradesApi('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');

// beforeEach(() => {
//   accountOrders = new AccountOrdersApi();
// });

describe('AccountTradesApi', () => {

  test('query trades', async () => {

    const anteSymbolId = 1;
    // const accountApi = await account('TCgnJmYmMUJ9eS6x62Vj7YFfpBM1DTL8V8');
   
    const result = await trades.query({
      start: 0,
      limit: 50,
      sortBy: 'createdAt:ASC'
    })

    console.log('result:', result)

    expect(result.length).toBeGreaterThan(0);
  });

});
