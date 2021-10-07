import React from 'react'
import {Image, Modal} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'

// redux import
import {useSelector} from 'react-redux'
import {numberFormate} from '../../../Utilities/Util'
const LoadingModal = ({show, handleClose}) => {
  // Redux State
  const {temporaryUSD, temporaryCPT, tokenType} = useSelector(
    (state) => state.buyTokens
  )

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
          <Image className='my-2 update__spinner' src={Loader} alt='' />
          <h2>Waiting for confirmation</h2>
          <h6 className='txt__black'>
            Swapping
            <span className='big'>{numberFormate(temporaryUSD)} USDC </span> for
            <span className='big'>
              {numberFormate(temporaryCPT)}{' '}
              {tokenType === 'CAPL'
                ? 'CAPL'
                : tokenType === 'CRET'
                ? 'CRET'
                : null}
            </span>
          </h6>
          <p className='txt__gray note mt-5'>
            Confirm this transaction in your wallet
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default LoadingModal
