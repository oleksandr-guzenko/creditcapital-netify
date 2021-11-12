import React from 'react'
import {Image, Modal} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'

// redux import

const SwapLoading = ({show, handleClose}) => {
  return (
    <Modal
      className='buy__token__modal successModal'
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <div className='buy__cpt__modal'>
        <div className='success__body'>
          <Image className='my-2 loader update__spinner' src={Loader} alt='' />
          <h3 className='mb-3'>Waiting for confirmation</h3>

          {/* <h6 className='txt__black'>
            Swapping
            <span className='big'>
              {numberFormate(temporaryTokenAmount)} USDC{' '}
            </span>{' '}
            <Image src={usdcImage} alt='' className='me-1' />& Receive
            <span className='big'>
              {numberFormate(temporaryTokenAmount)}{' '}
              {typeOfLiquidity === 'CAPL_TYPE'
                ? 'CAPL'
                : typeOfLiquidity === 'CRET_TYPE'
                ? 'CRET'
                : null}
            </span>
          </h6> */}
          <p className='txt__gray note mt-5'>
            Confirm this transaction in your wallet
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default SwapLoading
