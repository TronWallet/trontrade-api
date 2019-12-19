/**
 * @module contracts
 */
/**
 * Cancel Smart Contract Address
 */
export declare const address: string;
/**
 * Cancel Smart Contract ABI
 */
export declare const abi: ({
    outputs: {
        type: string;
    }[];
    constant: boolean;
    name: string;
    stateMutability: string;
    type: string;
    inputs?: undefined;
} | {
    inputs: {
        name: string;
        type: string;
    }[];
    name: string;
    stateMutability: string;
    type: string;
    outputs?: undefined;
    constant?: undefined;
} | {
    stateMutability: string;
    type: string;
    outputs?: undefined;
    constant?: undefined;
    name?: undefined;
    inputs?: undefined;
})[];
