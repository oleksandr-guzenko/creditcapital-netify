import React from 'react'
import {Image, Modal} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'
import usdcImage from '../../../Assets/money/usdc.svg'

// redux import
import {useSelector} from 'react-redux'
import {calculatePercentage, numberFormate} from '../../../Utilities/Util'

const StakingLoader = ({show, handleClose}) => {
  // Redux State
  const {tokenAmount, typeOfTransaction, unStakeType, stakingType} =
    useSelector((state) => state.staking)
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
          <h6 className='txt__black'>
            {typeOfTransaction === 'staking' ? 'Staking' : 'UnStaking'}
            <span className='big'>
              {numberFormate(tokenAmount)}{' '}
              {stakingType === 'CAPL_TYPE'
                ? 'CAPL'
                : stakingType === 'CRET_TYPE'
                ? 'CRET'
                : null}
            </span>{' '}
            & Receive
            <span className='big'>
              {typeOfTransaction === 'staking'
                ? numberFormate(tokenAmount / 10)
                : unStakeType === 0
                ? numberFormate(calculatePercentage(tokenAmount, 70))
                : numberFormate(tokenAmount)}{' '}
              {typeOfTransaction === 'staking'
                ? 'CCPT'
                : stakingType === 'CAPL_TYPE'
                ? 'CAPL'
                : stakingType === 'CRET_TYPE'
                ? 'CRET'
                : null}{' '}
            </span>{' '}
            {typeOfTransaction === 'staking' ? 'Rewards after 3 months' : ''}
          </h6>

          <p className='txt__gray note mt-5'>
            Confirm this transaction in your wallet
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default StakingLoader
