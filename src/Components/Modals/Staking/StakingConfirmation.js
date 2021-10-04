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
import {numberFormate, calculatePercentage} from '../../../Utilities/Util'

const StakingConfirmation = ({show, handleClose}) => {
  // Redux State
  const {
    tokenAmount,
    unStakeType,
    transactionHASH,
    stakingError,
    typeOfTransaction,
    stakingType,
  } = useSelector((state) => state.staking)
  // clipboard
  const [isCopied, setCopied] = useClipboard(transactionHASH, {
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
          {!stakingError && transactionHASH ? (
            <>
              <Image src={Tick} alt='' className='mb-3 loader' />
              <h3>Transaction success</h3>

              <h6 className='mb-3'>
                You have been successfully{' '}
                {typeOfTransaction === 'staking' ? 'Staked' : 'UnStaked'} tokens
              </h6>

              <h6 className='m-0'>
                {typeOfTransaction === 'staking'
                  ? 'You have been rewarded'
                  : 'Received'}
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
                    : null}
                </span>
                for
                <span className='big'>
                  {numberFormate(tokenAmount)}{' '}
                  {typeOfTransaction === 'staking'
                    ? stakingType === 'CAPL_TYPE'
                      ? 'CAPL'
                      : stakingType === 'CRET_TYPE'
                      ? 'CRET'
                      : null
                    : 'CAPL'}{' '}
                </span>
              </h6>
              <div className='user__id'>
                <p onClick={setCopied} className='txt__gray id'>
                  {transactionHASH}
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
            stakingError && (
              <>
                <Image src={Close} alt='' className='loader' />
                <h3 className='mt-3 text-danger'>Transaction Failed</h3>
                <h6 className='mt-2'>
                  {tokenAmount}{' '}
                  {stakingType === 'CAPL_TYPE'
                    ? 'CAPL'
                    : stakingType === 'CRET_TYPE'
                    ? 'CRET'
                    : null}
                </h6>
                <p className='txt__gray note'>View on Explorer</p>
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

export default StakingConfirmation
