import React from 'react'
import {CgClose} from 'react-icons/cg'
import {Image, Modal} from 'react-bootstrap'
import {FiCopy} from 'react-icons/fi'
import useClipboard from 'react-use-clipboard'
// image
import Tick from '../../../Assets/Tick.svg'
import Close from '../../../Assets/Close.svg'
import usdcImage from '../../../Assets/money/usdc.svg'

// redux imports
import {useSelector} from 'react-redux'
import {calculatePercentage, numberFormate} from '../../../Utilities/Util'

const SwapSuccess = ({show, handleClose}) => {
  const {swapError, swapHash, usdcPrice, ccptPrice, swapingType} = useSelector(
    (state) => state.swap
  )
  // clipboard
  const [isCopied, setCopied] = useClipboard(swapHash, {
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
          {!swapError && swapHash ? (
            <>
              <Image src={Tick} alt='' className='mb-3 loader' />
              <h3>Transaction success</h3>
              {/* <h6 className='mb-3'>
                You have been successfully Swapped tokens
              </h6> */}
              {/* {swapingType === 'USDC' ? (
                <h6 className='m-0'>
                  <span className='big'>
                    {numberFormate(ccptPrice)}{' '}
                    {typeOfLiquidity === 'CAPL_TYPE'
                      ? 'CAPL'
                      : typeOfLiquidity === 'CRET_TYPE'
                      ? 'CRET'
                      : null}
                  </span>
                  Received For
                  <span className='big'>
                    {numberFormate(temporaryTokenAmount)} USDC{' '}
                  </span>
                </h6>
              ) : swapingType === 'CCPT' ? (
                <h6 className='m-0'>
                  <span className='big'>
                    {numberFormate(calculatePercentage(caplAmount, 2))} USDC
                  </span>
                  <Image src={usdcImage} alt='' className='me-1' />
                  Received For
                  <span className='big'>
                    {numberFormate(temporaryTokenAmount)} CAPL{' '}
                  </span>
                </h6>
              ) : (
                ''
              )} */}

              <div className='user__id'>
                <p onClick={setCopied} className='txt__gray id'>
                  {swapHash}
                  <span>
                    <FiCopy />
                  </span>
                </p>
                <div className='toolt'>{isCopied ? 'Copied' : 'Copy'}</div>
              </div>
              <a
                target='_blank'
                style={{color: '#ffffff'}}
                href={`https://polygonscan.com/tx/${swapHash}`}
                className='btn_brand'
              >
                View on Polygon Scan
              </a>
            </>
          ) : (
            swapError && (
              <>
                <Image src={Close} alt='' className='loader' />
                <h3 className='mt-3 text-danger'>Transaction Failed</h3>
                <button className='btn_brand' onClick={handleClose}>
                  Close
                </button>
              </>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SwapSuccess
