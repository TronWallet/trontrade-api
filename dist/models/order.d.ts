/**
 * @module models
 */
/**
 * Order
 */
export interface Order {
    transaction: string;
    orderId: number;
    symbolId: number;
    status: OrderStatus;
    wallet: string;
    createdAt: number;
    side: number;
    price: number;
    amount: number;
    filled: number;
}
/**
 * Order Status
 */
export declare enum OrderStatus {
    Failed = 0,
    Pending = 1,
    Completed = 2,
    Cancelled = 3
}
/**
 * Order Side
 */
export declare enum OrderSide {
    Sell = 0,
    Buy = 1
}
