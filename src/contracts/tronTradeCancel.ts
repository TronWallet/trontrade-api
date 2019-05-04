export const address = process.env.TRONTRADECANCEL_CONTRACT || 'CANCEL_ADDRESS';
export const abi =  [
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
    inputs: [
      {
        name: "_addr",
        type: "address"
      }
    ],
    name: "setTronTrade",
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
    name: "setTrc10Trade",
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
    name: "getTronTrade",
    stateMutability: "View",
    type: "Function"
  },
  {
    inputs: [
      {
        name: "_orderId",
        type: "uint256"
      }
    ],
    name: "cancelOrder",
    stateMutability: "Nonpayable",
    type: "Function"
  },
  {
    inputs: [
      {
        name: "_orderId",
        type: "uint256"
      }
    ],
    name: "cancelTrc10Order",
    stateMutability: "Nonpayable",
    type: "Function"
  }
];
