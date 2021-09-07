import React from 'react'
import {CgClose} from 'react-icons/cg'
import {Image, Modal} from 'react-bootstrap'
import {FiCopy} from 'react-icons/fi'
import useClipboard from 'react-use-clipboard'
// image
import Tick from '../../../Assets/Tick.svg'
import Close from '../../../Assets/Close.svg'
// redux imports
import {useSelector} from 'react-redux'
import {numberFormate} from '../../../Utilities/Util'

const LiquidityConfirmation = ({show, handleClose}) => {
  // Redux State
  const {
    temporaryUSDC,
    caplAmount,
    transactionHashID,
    liquidityError,
    typeOfTransaction,
  } = useSelector((state) => state.liquidity)
  // clipboard
  const [isCopied, setCopied] = useClipboard(transactionHashID, {
    successDuration: 2000,
  })
  return (
    <Modal
      className='buy__token__modal successModal'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__close' onClick={handleClose}>
            <CgClose />
          </div>
        </div>
        <div className='success__body'>
          {!liquidityError && transactionHashID ? (
            <>
              <Image src={Tick} alt='' className='mb-3 loader' />
              <h3>Transaction success</h3>
              <h6 className='mb-3'>
                You have been successfully{' '}
                {typeOfTransaction === 'deposit' ? 'deposited' : 'withdrawn'}{' '}
                tokens
              </h6>
              <h6 className='m-0'>
                <span className='big'>{numberFormate(caplAmount)} CAPL</span>
                Received For
                <span className='big'>{numberFormate(caplAmount)} USDC </span>
              </h6>
              <div className='user__id'>
                <p onClick={setCopied} className='txt__gray id'>
                  {transactionHashID}
                  <span>
                    <FiCopy />
                  </span>
                </p>
                <div className='toolt'>{isCopied ? 'Copied' : 'Copy'}</div>
              </div>
              {/* <p className='txt__gray note'>View on Explorer</p>
              <button className='btn_brand' onClick={handleClose}>
                Close
              </button> */}
            </>
          ) : (
            <>
              <Image src={Close} alt='' className='loader' />
              <h3 className='mt-3 text-danger'>Transaction Failed</h3>
              <h6 className='mt-2'>{numberFormate(temporaryUSDC)} USDC</h6>
              <p className='txt__gray note'>View on Explorer</p>
              <button className='btn_brand' onClick={handleClose}>
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default LiquidityConfirmation
