import React from 'react'
import {Image, Modal} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'
import usdcImage from '../../../Assets/money/usdc.svg'

// redux import
import {useSelector} from 'react-redux'
import {numberFormate} from '../../../Utilities/Util'

const LiquidityLoader = ({show, handleClose}) => {
  // Redux State
  const {temporaryUSDC, typeOfTransaction} = useSelector((state) => state.liquidity)
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
          <h3 className='mb-3'>Waiting for {typeOfTransaction} confirmation</h3>
          <h6 className='txt__black'>
            Swapping
            <span className='big'>
              {numberFormate(temporaryUSDC)} USDC{' '}
            </span>{' '}
            <Image src={usdcImage} alt='' className='me-1' />& Receive
            <span className='big'>{numberFormate(temporaryUSDC)} CAPL</span>
          </h6>

          <p className='txt__gray note mt-5'>
            Confirm this transaction in your wallet
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default LiquidityLoader
