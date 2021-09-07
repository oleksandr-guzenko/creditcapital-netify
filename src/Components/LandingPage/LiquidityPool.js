import React, {useEffect, useState} from 'react'
import ReactLoading from 'react-loading'
import LiquidityLoader from '../Modals/LiquidityPool/LiquidityLoader'
import LiquidityConfirmation from '../Modals/LiquidityPool/LiquidityConfirmation'
import {numberFormate} from '../../Utilities/Util'

import {Col, Container, Row} from 'react-bootstrap'
import LiquidityHistory from './LiquidityHistory'
import LiquidityInput from './LiquidityInput'

// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {
  liquidityDepositAction,
  clearTransactionHistory,
} from '../../Redux/LiquidityPool/actions'

const LiquidityPool = () => {
  // Redux State
  const dispatch = useDispatch()
  const {userAddress, availableBalance, profileLoading} = useSelector(
    (state) => state.profile
  )
  const {liquidityLoading, transactionHashID, liquidityError} = useSelector(
    (state) => state.liquidity
  )

  const [depositPrice, setDepositPrice] = useState('')
  const [depositErrors, setDepositErrors] = useState(false)
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const [withdrawErrors, setWithdrawErrors] = useState(false)

  // loaders and success states
  const [showLoader, setShowLoader] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(true)

  const clearInputValues = () => {
    setDepositPrice('')
    setWithdrawPrice('')
  }

  const handleCloseAndClearValue = () => {
    setShowSuccessModal(false)
    dispatch(clearTransactionHistory())
    clearInputValues()
  }

  useEffect(() => {
    if (liquidityLoading) {
      setShowLoader(true)
    } else {
      setShowLoader(false)
    }
  }, [liquidityLoading])

  useEffect(() => {
    if (transactionHashID || liquidityError) {
      setShowSuccessModal(true)
      setTimeout(() => {
        handleCloseAndClearValue()
      }, 15000)
    } else {
      setShowSuccessModal(false)
    }
  }, [transactionHashID, liquidityError])

  // ErrorState
  const [balanceError, setBalanceError] = useState(false)

  // Deposit
  const handleDepositPriceChange = (number) => {
    setDepositPrice(number.value)
  }
  const submitDepositLiquidityPool = (e) => {
    e.preventDefault()
    dispatch(liquidityDepositAction(depositPrice, 'deposit'))
  }
  // Withdraw

  const handleWithdrawPriceChange = (number) => {
    setWithdrawPrice(number.value)
  }
  const submitWithdrawLiquidityPool = (e) => {
    dispatch(liquidityDepositAction(depositPrice, 'withdraw'))

    e.preventDefault()
  }

  //  Error handling
  useEffect(() => {
    if (
      depositPrice == 0 ||
      depositPrice == '.' ||
      !userAddress ||
      balanceError ||
      profileLoading
    ) {
      setDepositErrors(true)
    } else {
      setDepositErrors(false)
    }
  }, [depositPrice, userAddress])

  useEffect(() => {
    if (
      withdrawPrice == 0 ||
      withdrawPrice == '.' ||
      !userAddress ||
      balanceError ||
      profileLoading
    ) {
      setWithdrawErrors(true)
    } else {
      setWithdrawErrors(false)
    }
  }, [withdrawPrice, userAddress])

  useEffect(() => {
    if (availableBalance === 0 && !profileLoading) {
      setBalanceError(true)
      clearInputValues()
    } else {
      setBalanceError(false)
    }
  }, [profileLoading, availableBalance, userAddress])

  return (
    <>
      <div className='liquidity__pool'>
        <Container>
          <div className='liquidity__pool__wrapper'>
            <h4 className='section__titles'>Liquidity Pool</h4>
            <p>Earn yield on your adding liquidity, and get extra rewards</p>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box'>
                  <div className='liquidity__pool__box__top'>
                    <h5>Deposit</h5>
                    <div>
                      <p className='txt__gray'>Available balance</p>
                      <h6>
                        {profileLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#06397e'
                            height={0}
                            width={30}
                            className='loader'
                          />
                        ) : (
                          `${numberFormate(availableBalance)}`
                        )}{' '}
                        <span className='txt__gray ms-1'>(~$19,214.261)</span>
                      </h6>
                    </div>
                  </div>
                  <form onSubmit={submitDepositLiquidityPool}>
                    <LiquidityInput
                      price={depositPrice}
                      handlePriceChange={handleDepositPriceChange}
                      errors={balanceError}
                    />
                    <div className='liquidity__pool__box__bottom'>
                      <div>
                        {balanceError && (
                          <p className='text-danger danger'>
                            Please fund your wallet with USDC
                          </p>
                        )}
                      </div>

                      <div>
                        <p>Receive: 0.0000 CPT ($0.0000)</p>
                        <p>Price impact: 0.0000%</p>
                      </div>
                    </div>
                    <div className='liquidity__pool__box__btn'>
                      <button
                        disabled={depositErrors}
                        type='submit'
                        className={
                          depositErrors
                            ? 'btn_brand btn_brand_disabled'
                            : 'btn_brand'
                        }
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box'>
                  <div className='liquidity__pool__box__top'>
                    <h5>Withdrawal</h5>
                    <div>
                      <p className='txt__gray'>Available balance to withdraw</p>
                      <h6>
                        {profileLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#06397e'
                            height={0}
                            width={30}
                            className='loader'
                          />
                        ) : (
                          `${numberFormate(availableBalance)}`
                        )}
                        <span className='txt__gray ms-1'>(~$19,214.261)</span>
                      </h6>
                    </div>
                  </div>
                  <form onSubmit={submitWithdrawLiquidityPool}>
                    <LiquidityInput
                      price={withdrawPrice}
                      handlePriceChange={handleWithdrawPriceChange}
                      errors={balanceError}
                    />
                    <div className='liquidity__pool__box__bottom withdraw'>
                      <div>
                        {balanceError && (
                          <p className='text-danger danger text-start'>
                            Please fund your wallet with USDC
                          </p>
                        )}
                      </div>
                      <div>
                        <p>Receive: 0.0000 CPT ($0.0000)</p>
                        <p>
                          *Note:Withdraw amount after cool down period of 24 hrs
                        </p>
                      </div>
                    </div>
                    <div className='liquidity__pool__box__btn'>
                      <button
                        disabled={withdrawErrors}
                        className={
                          withdrawErrors
                            ? 'btn_brand btn_brand_disabled'
                            : 'btn_brand'
                        }
                      >
                        Withdraw
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
            <hr />
            <LiquidityHistory />
          </div>
        </Container>
      </div>
      <LiquidityLoader
        show={showLoader}
        handleClose={() => setShowLoader(false)}
      />
      <LiquidityConfirmation
        show={showSuccessModal}
        handleClose={() => handleCloseAndClearValue()}
      />
    </>
  )
}

export default LiquidityPool
