import React from 'react'
import {CgClose} from 'react-icons/cg'
import {Image, Modal} from 'react-bootstrap'
import {FiCopy} from 'react-icons/fi'
// import useClipboard from 'react-use-clipboard'
// import format from 'date-fns/format'

// image
import Tick from '../../Assets/Tick.svg'
// import Close from '../../Assets/Close.svg'

// redux imports
import {useSelector} from 'react-redux'
// import {numberFormate} from '../../Utilities/Util'

const SuccessMessage = ({show, handleClose}) => {
  // Redux State
  const {USDCAmount, tranHash} = useSelector((state) => state.root)

  // clipboard
  // const [isCopied, setCopied] = useClipboard(hashID, {
  //   successDuration: 2000,
  // })
  // var result = format(new Date(), "do MMM, YYY' - 'hh:mm bb")

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
          {true ? (
            <>
              <Image src={Tick} alt='' />
              <h4 className='info'>
                Deposited Amount Successfully Transferred to Treasury Wallet
              </h4>
              <h4>{USDCAmount?.toFixed(2)}USDC</h4>
              <h4 className='mt-1'>
                {(USDCAmount / 2)?.toFixed(2)} CPT{' '}
                {(USDCAmount / 2)?.toFixed(2)} CRT
              </h4>
              <div className='user__id'>
                <p className='txt__gray id'>
                  {tranHash}
                  <span>
                    <FiCopy />
                  </span>
                </p>
              </div>
              {/* <h6 className='info'>
                You have been successfully purchased tokens
              </h6> */}
              {/* <h4>
                {numberFormate(cptReserved)} {tokenType} Purchased
              </h4>
              <h6>
                For
                <span className='big'>
                  {numberFormate(usdcReservedForCpt)} USDC{' '}
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
              </p> */}
            </>
          ) : (
            <>
              {/* <Image src={Close} alt='' />
              <h4 className='mt-3 text-danger'>Transaction Failed</h4>
              <h5 className='mt-2'>{numberFormate(temporaryUSD)} USDC</h5>
              <p className='txt__gray note'>{result}</p> */}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SuccessMessage
