import React from 'react'
import {CgClose} from 'react-icons/cg'
import {Image, Modal} from 'react-bootstrap'
import {FiCopy} from 'react-icons/fi'
import useClipboard from 'react-use-clipboard'
import format from 'date-fns/format'

// image
import Tick from '../../../Assets/Tick.svg'
import Close from '../../../Assets/Close.svg'

// redux imports
import {useSelector} from 'react-redux'
import {numberFormate} from '../../../Utilities/Util'

const SuccessMessage = ({show, handleClose}) => {
  // Redux State
  const {temporaryCPT, ccptTokenType, hashID, temporaryUSD, tokenType, error} =
    useSelector((state) => state.buyTokens)

  // clipboard
  const [isCopied, setCopied] = useClipboard(hashID, {
    successDuration: 2000,
  })
  var result = format(new Date(), "do MMM, YYY' - 'hh:mm bb")

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
          {!error ? (
            <>
              <Image src={Tick} alt='' />
              <h6 className='info'>
                You have been successfully purchased tokens
              </h6>
              <h4>
                {numberFormate(temporaryCPT)} {tokenType} Purchased
              </h4>
              <h6>
                For
                <span className='big'>
                  {numberFormate(temporaryUSD)}{' '}
                  {tokenType === 'CAPL'
                    ? 'USDC'
                    : tokenType === 'CRET'
                    ? 'USDC'
                    : tokenType === 'CCPT'
                    ? ccptTokenType
                    : null}{' '}
                </span>
              </h6>
              <div className='user__id'>
                <p onClick={setCopied} className='txt__gray id'>
                  {hashID}
                  <span>
                    <FiCopy />
                  </span>
                </p>
                <div className='toolt'>{isCopied ? 'Copied' : 'Copy'}</div>
              </div>
              <p className='txt__gray note'>
                *Purchased Token/USDC will in your profile
              </p>
            </>
          ) : (
            error && (
              <>
                <Image src={Close} alt='' />
                <h4 className='mt-3 text-danger'>Transaction Failed</h4>
                <h5 className='mt-2'>
                  {numberFormate(temporaryUSD)}{' '}
                  {tokenType === 'CAPL'
                    ? 'USDC'
                    : tokenType === 'CRET'
                    ? 'USDC'
                    : tokenType === 'CCPT'
                    ? ccptTokenType
                    : null}{' '}
                </h5>
                <p className='txt__gray note'>{result}</p>
              </>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SuccessMessage
