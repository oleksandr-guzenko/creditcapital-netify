import Web3 from 'web3'
import WalletLink from 'walletlink'
import CC_LOGO from '../../Assets/CC_Logo.svg'

export const walletLink = new WalletLink({
  appName: 'Credit Capital',
  appLogoUrl: CC_LOGO,
  darkMode: 'true',
})

export const ethereum = walletLink.makeWeb3Provider(
  `${process.env.REACT_APP_ETH_JSONRPC_URL}`,
  process.env.REACT_APP_CHAIN_ID
)

const getContracts = (walletType) => {
  let web3
  switch (walletType) {
    case 'MetaMask':
      web3 = new Web3(window.ethereum)
      break
    case 'Coinbase':
      web3 = new Web3(ethereum)
      break
    default:
      web3 = new Web3(process.env.REACT_APP_ETH_JSONRPC_URL)
      break
  }

  const Liquiditycapl = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_fundsAddress',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'subtractedValue',
            type: 'uint256',
          },
        ],
        name: 'decreaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'addedValue',
            type: 'uint256',
          },
        ],
        name: 'increaseAllowance',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x4E6A7cBd23B4b43B7B611ebC4Fd1E89d9eb75FBD'
  )

  const liquidityPool = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_capl',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_usdc',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'oldOwner',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnerNominated',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'bool',
            name: 'isPaused',
            type: 'bool',
          },
        ],
        name: 'PauseChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Withdrawn',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposited',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '_timestamp',
            type: 'uint256',
          },
        ],
        name: 'withdrawrequested',
        type: 'event',
      },
      {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'cancelWithdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'capl',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'coolDownPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
        ],
        name: 'isavailabletoclaim',
        outputs: [
          {
            internalType: 'uint256',
            name: 'coolDownTimer',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isAvailableForClaim',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'lastPauseTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumWithdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'nominateNewOwner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'nominatedOwner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedAmount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'requestedTime',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bool',
            name: '_paused',
            type: 'bool',
          },
        ],
        name: 'setPaused',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transfertoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'wallet',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'transferusdc',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'percentage',
            type: 'uint256',
          },
        ],
        name: 'updateCharges',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'NewPeriod',
            type: 'uint256',
          },
        ],
        name: 'updateCoolDownPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'usdc',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawCharges',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    '0x73Bf12253A98a7DC6469357D85d60b0ecA5Fa448'
  )

  const usdc = new web3.eth.Contract(
    [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'authorizer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'nonce',
            type: 'bytes32',
          },
        ],
        name: 'AuthorizationCanceled',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'authorizer',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'nonce',
            type: 'bytes32',
          },
        ],
        name: 'AuthorizationUsed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'Blacklisted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'userAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'address payable',
            name: 'relayerAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bytes',
            name: 'functionSignature',
            type: 'bytes',
          },
        ],
        name: 'MetaTransactionExecuted',
        type: 'event',
      },
      {anonymous: false, inputs: [], name: 'Pause', type: 'event'},
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'newRescuer',
            type: 'address',
          },
        ],
        name: 'RescuerChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'previousAdminRole',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'newAdminRole',
            type: 'bytes32',
          },
        ],
        name: 'RoleAdminChanged',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleGranted',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'RoleRevoked',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'UnBlacklisted',
        type: 'event',
      },
      {anonymous: false, inputs: [], name: 'Unpause', type: 'event'},
      {
        inputs: [],
        name: 'APPROVE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'BLACKLISTER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'CANCEL_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DEPOSITOR_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'DOMAIN_SEPARATOR',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'EIP712_VERSION',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'META_TRANSACTION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'PAUSER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'PERMIT_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'RESCUER_ROLE',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'WITHDRAW_WITH_AUTHORIZATION_TYPEHASH',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'approveWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'authorizer', type: 'address'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
        ],
        name: 'authorizationState',
        outputs: [
          {
            internalType: 'enum GasAbstraction.AuthorizationState',
            name: '',
            type: 'uint8',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'blacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'blacklisters',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'authorizer', type: 'address'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'cancelAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'decrement', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'decreaseAllowanceWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'user', type: 'address'},
          {internalType: 'bytes', name: 'depositData', type: 'bytes'},
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'userAddress', type: 'address'},
          {internalType: 'bytes', name: 'functionSignature', type: 'bytes'},
          {internalType: 'bytes32', name: 'sigR', type: 'bytes32'},
          {internalType: 'bytes32', name: 'sigS', type: 'bytes32'},
          {internalType: 'uint8', name: 'sigV', type: 'uint8'},
        ],
        name: 'executeMetaTransaction',
        outputs: [{internalType: 'bytes', name: '', type: 'bytes'}],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bytes32', name: 'role', type: 'bytes32'}],
        name: 'getRoleAdmin',
        outputs: [{internalType: 'bytes32', name: '', type: 'bytes32'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'uint256', name: 'index', type: 'uint256'},
        ],
        name: 'getRoleMember',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bytes32', name: 'role', type: 'bytes32'}],
        name: 'getRoleMemberCount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'hasRole',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'increment', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'increaseAllowanceWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'string', name: 'newName', type: 'string'},
          {internalType: 'string', name: 'newSymbol', type: 'string'},
          {internalType: 'uint8', name: 'newDecimals', type: 'uint8'},
          {internalType: 'address', name: 'childChainManager', type: 'address'},
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'initialized',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'isBlacklisted',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
        name: 'nonces',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'pausers',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'deadline', type: 'uint256'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'permit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: 'tokenContract',
            type: 'address',
          },
          {internalType: 'address', name: 'to', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'rescueERC20',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'rescuers',
        outputs: [{internalType: 'address[]', name: '', type: 'address[]'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'bytes32', name: 'role', type: 'bytes32'},
          {internalType: 'address', name: 'account', type: 'address'},
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'from', type: 'address'},
          {internalType: 'address', name: 'to', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'transferWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'unBlacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'string', name: 'newName', type: 'string'},
          {internalType: 'string', name: 'newSymbol', type: 'string'},
        ],
        name: 'updateMetadata',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'uint256', name: 'value', type: 'uint256'},
          {internalType: 'uint256', name: 'validAfter', type: 'uint256'},
          {internalType: 'uint256', name: 'validBefore', type: 'uint256'},
          {internalType: 'bytes32', name: 'nonce', type: 'bytes32'},
          {internalType: 'uint8', name: 'v', type: 'uint8'},
          {internalType: 'bytes32', name: 'r', type: 'bytes32'},
          {internalType: 'bytes32', name: 's', type: 'bytes32'},
        ],
        name: 'withdrawWithAuthorization',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
  )

  const capl = new web3.eth.Contract(
    [
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x2dF9071BF084863B6dAa536f4Fb304DB0FbA7fe2'
  )

  const cret = new web3.eth.Contract(
    [
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'minttoken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0xf393E1ef50f19192fA03EB8a0b4142Fa6c62D0E1'
  )

  const depositUSDC = new web3.eth.Contract(
    [
      {
        inputs: [
          {internalType: 'address', name: '_USDC', type: 'address'},
          {internalType: 'address', name: '_CAPL', type: 'address'},
          {internalType: 'address', name: '_CRET', type: 'address'},
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'investor',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'USDCAmount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'tokentype',
            type: 'string',
          },
        ],
        name: 'Deposited',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: '_owner',
            type: 'address',
          },
          {indexed: false, internalType: 'uint256', name: '', type: 'uint256'},
        ],
        name: 'WithdrawnAny',
        type: 'event',
      },
      {
        inputs: [],
        name: 'AMOUNT_RAISED',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '_amount', type: 'uint256'}],
        name: 'depositToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: '', type: 'address'}],
        name: 'tokenBoughtUser',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'treasury',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: '_treasury', type: 'address'}],
        name: 'updatetreasury',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'contract IERC20', name: '_token', type: 'address'},
        ],
        name: 'withdrawTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x9BC84902d485Ab0A009B61f91f4dAAA397185500'
  )

  return {
    usdc,
    capl,
    cret,
    depositUSDC,
    web3,
    liquidityPool,
    Liquiditycapl,
  }
}

export default getContracts
