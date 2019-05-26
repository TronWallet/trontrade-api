/**
 * @module tests
 */
jest.mock('../../apollo');
import * as apollo from '../../apollo';
import Account from '../accountApi';
import { Observable } from 'rxjs';
import { OrderStatus } from '../../../models/order';

const walletAddress = 'TXRgUnEKA9qHwCnsmXJxvBSNogkZUGgf9v';

const anteSymbol = 1;

const account = new Account(walletAddress , {});

const orders = account.orders();

const trades = account.trades();

describe('AccountOrdersApi', () => {

  test('orders.query', async () => {

    expect.assertions(3);

    const result = await orders.query({
      start: 0,
      limit: 10,
      status: [
        OrderStatus.Pending,
        OrderStatus.Failed,
        OrderStatus.Completed,
        OrderStatus.Cancelled,
      ],
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].wallet).toBe(walletAddress);
  });

  test.skip('orders.watch', async (done) => {

    expect.assertions(2);

    const result$ = orders.watch();

    expect(result$).toBeInstanceOf(Observable);

    const sub = result$.subscribe((order) => {

      expect(order.wallet).toBe(walletAddress);
      sub.unsubscribe();
      done();
    })

  });
});


describe('AccountTradesApi', () => {
  beforeEach(() => {
    // @ts-ignore
    apollo.restoreTTApiClient()
  })

  test('trades.query', async () => {
    // @ts-ignore
    apollo.setLocalTTApiClient()

    expect.assertions(3);

    const result = await trades.query({
      symbolId: anteSymbol
    })

    expect(Array.isArray(result)).toBe(true);

    expect(result.length).toBeGreaterThan(0);

    expect(result[0].symbolId).toBe(anteSymbol);

  });


});
