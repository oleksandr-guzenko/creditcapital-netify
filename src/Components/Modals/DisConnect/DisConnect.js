import {Image, Modal} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'
import {FiCopy} from 'react-icons/fi'
import useClipboard from 'react-use-clipboard'
import {useSelector} from 'react-redux'

// redux imports
import {useDispatch} from 'react-redux'
import {disConnectWallet} from '../../../Redux/Profile/actions'

// Svgs
import MetaMask from '../../../Assets/MetaMask.svg'
import Coinbase from '../../../Assets/coinbase_Wallet.svg'

const DisConnect = ({show, handleClose}) => {
  // redux State
  const dispatch = useDispatch()
  const {userAddress, walletType} = useSelector((state) => state.profile)

  //   clipboard
  const [isCopied, setCopied] = useClipboard(userAddress, {
    successDuration: 2000,
  })
  return (
    <>
      <Modal
        className='buy__token__modal successModal wallets Disconnecct'
        show={show}
        onHide={handleClose}
      >
        <div className='buy__cpt__modal'>
          <div className='buy__cpt__header'>
            <div className='buy__cpt__header__tile'>
              <h4>Disconnect Wallet</h4>
            </div>
            <div className='buy__cpt__header__close' onClick={handleClose}>
              <CgClose />
            </div>
          </div>
          <div className='success__body'>
            <div className='wallet_icon'>
              <Image
                src={
                  walletType === 'MetaMask'
                    ? MetaMask
                    : walletType === 'Coinbase'
                    ? Coinbase
                    : ''
                }
                alt=''
              />
            </div>
            <div className='user__id'>
              <p onClick={setCopied} className='txt__gray id'>
                {userAddress}
                <span>
                  <FiCopy />
                </span>
              </p>
              <div className='toolt'>{isCopied ? 'Copied' : 'Copy'}</div>
            </div>
          </div>
          <div>
            <button
              onClick={setCopied}
              className='btn_brand w-100 mb-3 outlined'
            >
              {isCopied ? 'Copied' : 'Copy to Clipboard'}
            </button>
          </div>
          <div>
            <button
              onClick={() => dispatch(disConnectWallet())}
              className='btn_brand w-100 mb-3'
            >
              Disconnect
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DisConnect
