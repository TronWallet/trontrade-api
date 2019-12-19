"use strict";
/**
 * @module contracts
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TRC20 Smart Contract Address
 */
exports.address = process.env.TRONTRADE_TRC20_CONTRACT || 'TRC20_ADDRESS';
/**
 * TRC20 Smart Contract ABI
 */
exports.abi = [
    {
        outputs: [
            {
                type: "address"
            }
        ],
        constant: true,
        name: "feeAddr",
        stateMutability: "View",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_rate",
                type: "uint256"
            }
        ],
        name: "setFeeRate",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_feeAccount",
                type: "address"
            }
        ],
        name: "setFeeAccount",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_actionAddr",
                type: "address"
            },
            {
                name: "_useful",
                type: "bool"
            }
        ],
        name: "setActionContract",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_newAdmin",
                type: "address"
            }
        ],
        name: "setAdmin",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "address"
            }
        ],
        constant: true,
        name: "adminAddr",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "uint256"
            }
        ],
        constant: true,
        name: "minTrx",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "uint256"
            }
        ],
        constant: true,
        name: "feeRate",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "address"
            }
        ],
        constant: true,
        name: "ownerAddr",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                name: "userId",
                type: "uint64"
            },
            {
                name: "price",
                type: "uint64"
            },
            {
                name: "amount",
                type: "uint128"
            },
            {
                name: "tokenId",
                type: "uint16"
            },
            {
                name: "tokenAmount",
                type: "uint128"
            },
            {
                name: "trxAmount",
                type: "uint64"
            },
            {
                name: "status",
                type: "uint8"
            },
            {
                name: "side",
                type: "uint8"
            }
        ],
        constant: true,
        inputs: [
            {
                type: "uint256"
            }
        ],
        name: "orders",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "bool"
            }
        ],
        constant: true,
        name: "isPaused",
        stateMutability: "View",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_pause",
                type: "bool"
            }
        ],
        name: "setPause",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_mintrx",
                type: "uint256"
            }
        ],
        name: "setMinTrx",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        stateMutability: "Nonpayable",
        type: "Constructor"
    },
    {
        stateMutability: "Nonpayable",
        type: "Fallback"
    },
    {
        inputs: [
            {
                name: "orderId",
                type: "uint256"
            },
            {
                name: "userAddr",
                type: "address"
            },
            {
                name: "tokenAddr",
                type: "address"
            },
            {
                name: "price",
                type: "uint64"
            },
            {
                name: "amount",
                type: "uint128"
            },
            {
                name: "trxAmount",
                type: "uint64"
            },
            {
                name: "side",
                type: "uint8"
            }
        ],
        name: "Order",
        type: "Event"
    },
    {
        inputs: [
            {
                name: "orderId",
                type: "uint256"
            },
            {
                name: "user",
                type: "address"
            },
            {
                name: "token",
                type: "address"
            },
            {
                name: "refundAmount",
                type: "uint128"
            },
            {
                name: "side",
                type: "uint8"
            }
        ],
        name: "Cancel",
        type: "Event"
    },
    {
        inputs: [
            {
                name: "fromOrderId",
                type: "uint256"
            },
            {
                name: "toOrderId",
                type: "uint256"
            },
            {
                name: "fromAddr",
                type: "address"
            },
            {
                name: "toAddr",
                type: "address"
            },
            {
                name: "tokenAddr",
                type: "address"
            },
            {
                name: "amount",
                type: "uint256"
            },
            {
                name: "trxAmount",
                type: "uint256"
            },
            {
                name: "price",
                type: "uint256"
            },
            {
                name: "feeTrx",
                type: "uint256"
            },
            {
                name: "side",
                type: "uint8"
            }
        ],
        name: "Trade",
        type: "Event"
    },
    {
        inputs: [
            {
                name: "fromOrderId",
                type: "uint256"
            },
            {
                name: "toAddr",
                type: "address"
            },
            {
                name: "trxAmount",
                type: "uint256"
            }
        ],
        name: "Refund",
        type: "Event"
    },
    {
        inputs: [
            {
                name: "toAddr",
                type: "address"
            },
            {
                name: "trxAmount",
                type: "uint256"
            }
        ],
        name: "feeTransfer",
        type: "Event"
    },
    {
        inputs: [
            {
                name: "_addr",
                type: "address"
            }
        ],
        name: "setTradeBase",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_addr",
                type: "address"
            }
        ],
        name: "setTokenBase",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_id",
                type: "uint256"
            }
        ],
        name: "setOrdersLength",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        outputs: [
            {
                name: "orderId",
                type: "uint256"
            }
        ],
        payable: true,
        inputs: [
            {
                name: "_token",
                type: "address"
            },
            {
                name: "_price",
                type: "uint256"
            },
            {
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "buyToken",
        stateMutability: "Payable",
        type: "Function"
    },
    {
        outputs: [
            {
                name: "orderId",
                type: "uint256"
            }
        ],
        inputs: [
            {
                name: "_token",
                type: "address"
            },
            {
                name: "_price",
                type: "uint256"
            },
            {
                name: "_amount",
                type: "uint256"
            },
            {
                name: "_sType",
                type: "uint8"
            }
        ],
        name: "sellToken",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_fromOrderId",
                type: "uint256"
            },
            {
                name: "_orderArr",
                type: "uint256[]"
            }
        ],
        name: "tradeBuy",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_fromOrderId",
                type: "uint256"
            },
            {
                name: "_orderArr",
                type: "uint256[]"
            }
        ],
        name: "tradeSell",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_orderId",
                type: "uint256"
            },
            {
                name: "_user",
                type: "address"
            }
        ],
        name: "cancelOrder",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        outputs: [
            {
                name: "orderId",
                type: "uint256"
            }
        ],
        payable: true,
        inputs: [
            {
                name: "_token",
                type: "address"
            }
        ],
        name: "marketBuy",
        stateMutability: "Payable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_fromOrderId",
                type: "uint256"
            },
            {
                name: "_orderArr",
                type: "uint256[]"
            }
        ],
        name: "marketBuyTrade",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        inputs: [
            {
                name: "_fromOrderId",
                type: "uint256"
            },
            {
                name: "_orderArr",
                type: "uint256[]"
            }
        ],
        name: "marketSellTrade",
        stateMutability: "Nonpayable",
        type: "Function"
    },
    {
        outputs: [
            {
                name: "user",
                type: "address"
            },
            {
                name: "price",
                type: "uint64"
            },
            {
                name: "amount",
                type: "uint128"
            },
            {
                name: "token",
                type: "address"
            },
            {
                name: "tokenAmount",
                type: "uint128"
            },
            {
                name: "trxAmount",
                type: "uint64"
            },
            {
                name: "status",
                type: "uint8"
            },
            {
                name: "side",
                type: "uint8"
            }
        ],
        constant: true,
        inputs: [
            {
                name: "_orderId",
                type: "uint256"
            }
        ],
        name: "getOrder",
        stateMutability: "View",
        type: "Function"
    },
    {
        outputs: [
            {
                type: "uint256"
            }
        ],
        constant: true,
        name: "totalSupply",
        stateMutability: "View",
        type: "Function"
    }
];
