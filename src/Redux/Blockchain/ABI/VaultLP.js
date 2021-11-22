export const vaultLPAddress = '0x2320613371A1F51c0C6Ad41152957b4000157751'
export const vaultLPABI = [
  {
    inputs: [
      {internalType: 'address', name: '_capl', type: 'address'},
      {internalType: 'address', name: '_usdc', type: 'address'},
      {internalType: 'address', name: '_pair', type: 'address'},
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: '_index',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'tokenAmountcapl', type: 'uint256'},
      {internalType: 'uint256', name: 'tokenAmountUsdc', type: 'uint256'},
      {internalType: 'uint256', name: 'duration', type: 'uint256'},
    ],
    name: 'addLiquidityBoth',
    outputs: [
      {internalType: 'uint256', name: '_amountA', type: 'uint256'},
      {internalType: 'uint256', name: '_amountB', type: 'uint256'},
      {internalType: 'uint256', name: '_amounts', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
      {internalType: 'uint256', name: 'duration', type: 'uint256'},
    ],
    name: 'addLiquidityCapl',
    outputs: [
      {internalType: 'uint256', name: '_amountA', type: 'uint256'},
      {internalType: 'uint256', name: '_amountB', type: 'uint256'},
      {internalType: 'uint256', name: '_amounts', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'tokenAmount', type: 'uint256'},
      {internalType: 'uint256', name: 'duration', type: 'uint256'},
    ],
    name: 'addLiquidityUsdc',
    outputs: [
      {internalType: 'uint256', name: '_amountA', type: 'uint256'},
      {internalType: 'uint256', name: '_amountB', type: 'uint256'},
      {internalType: 'uint256', name: '_amounts', type: 'uint256'},
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'capl',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'caplUsdcPair',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenAmount', type: 'uint256'}],
    name: 'getCaplAmount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenAmount', type: 'uint256'}],
    name: 'getUSDCAmount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reserves',
    outputs: [
      {internalType: 'uint112', name: '', type: 'uint112'},
      {internalType: 'uint112', name: '', type: 'uint112'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'swapAndLiquifyEnabled',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniswapV2Router',
    outputs: [
      {internalType: 'contract IUniswapV2Router02', name: '', type: 'address'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usdc',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
]
