import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LiquidityInput from '../LandingPage/LiquidityInput'
import ReactLoading from 'react-loading'
import Timer from '../LandingPage/Timer'

// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {numberFormate} from '../../Utilities/Util'
import {
  claimUnStakeWithdraw,
  clearTransHistory,
  getUnStakeCoolDownPeriod,
  stakedInformation,
  stakingCAPL,
  unStakingCAPL,
} from '../../Redux/staking/actions'
import StakingLoader from '../Modals/Staking/StakingLoader'
import StakingConfirmation from '../Modals/Staking/StakingConfirmation'
import StakingHistory from '../LandingPage/StakingHistory'

const StackingCRET = () => {
  // Redux State
  const dispatch = useDispatch()
  const {userAddress} = useSelector((state) => state.profile)
  const {
    testProfileLoading,
    CRETBalance: cptBalance,
    CRET_CCPTBalance,
    cretRewards,
  } = useSelector((state) => state.testProfile)
  const {
    transactionHASH,
    coolDownPeriodLoading,
    stakingLoading,
    transactionStatus,
    stakingError,
    coolDownPeriod,
    isAvailableForClaim,
  } = useSelector((state) => state.staking)

  // local stats
  const [stakePrice, setStakePrice] = useState('')
  const [stakeErrors, setStakeErrors] = useState(false)
  const [unStakePrice, setUnStakePrice] = useState('')
  const [unStakeErrors, setUnStakeErrors] = useState(false)
  const [enableClaim, setEnableClaim] = useState(false)

  useEffect(() => {
    if (CRET_CCPTBalance) {
      setUnStakePrice(CRET_CCPTBalance)
    }
  }, [CRET_CCPTBalance])

  // loaders and success states
  const [showLoader, setShowLoader] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // ErrorState
  const [balanceError, setBalanceError] = useState(false)
  const [unStakeType, setUnStakeType] = useState(null)

  const clearInputValues = () => {
    setStakePrice('')
  }

  const handleCloseAndClearValue = () => {
    setShowSuccessModal(false)
    clearInputValues()
    dispatch(clearTransHistory())
  }
  useEffect(() => {
    if (transactionHASH || stakingError) {
      setShowSuccessModal(true)
      setTimeout(() => {
        if (transactionStatus === 200) {
          handleCloseAndClearValue()
        }
      }, 15000)
    } else {
      setShowSuccessModal(false)
    }
  }, [transactionHASH, stakingError])

  useEffect(() => {
    if (stakingLoading) {
      setShowLoader(true)
    } else {
      setShowLoader(false)
    }
  }, [stakingLoading])

  // staking
  const handleStakePriceChange = (number) => {
    setStakePrice(number.value)
  }
  const submitStaking = (e) => {
    e.preventDefault()
    dispatch(stakingCAPL(stakePrice, 'staking', 'CRET_TYPE'))
  }

  // staking
  const handleUnStakePriceChange = (number) => {
    setUnStakePrice(number.value)
  }
  const submitUnStaking = (e) => {
    e.preventDefault()
    dispatch(unStakingCAPL(unStakePrice, 'unstaking', unStakeType, 'CRET_TYPE'))
  }

  // stakedInformation
  useEffect(() => {
    if (userAddress) {
      dispatch(stakedInformation('CRET_TYPE'))
    }
  }, [userAddress])

  //  Error handling
  useEffect(() => {
    if (
      stakePrice == 0 ||
      stakePrice == '.' ||
      !userAddress ||
      balanceError ||
      testProfileLoading
    ) {
      setStakeErrors(true)
    } else {
      setStakeErrors(false)
    }
  }, [stakePrice, userAddress, testProfileLoading])

  useEffect(() => {
    if (
      unStakePrice == 0 ||
      unStakePrice == '.' ||
      !userAddress ||
      balanceError ||
      testProfileLoading
    ) {
      setUnStakeErrors(true)
    } else {
      setUnStakeErrors(false)
    }
  }, [unStakePrice, userAddress, testProfileLoading])

  useEffect(() => {
    if (cptBalance === 0 && !testProfileLoading && userAddress) {
      setBalanceError(true)
      clearInputValues()
    } else {
      setBalanceError(false)
    }
  }, [testProfileLoading, cptBalance, userAddress])

  // Cool down period
  useEffect(() => {
    if (userAddress) {
      dispatch(getUnStakeCoolDownPeriod())
    }
  }, [userAddress])

  const claimFunds = () => {
    dispatch(claimUnStakeWithdraw(unStakePrice))
  }

  return (
    <>
      <div className='liquidity__pool stacking'>
        <Container>
          <div className='liquidity__pool__wrapper'>
            <h4 className='section__titles'>Staking CRET</h4>
            <p>
              Staking CRET is an additional way to earn extra yield on current
              deposit
            </p>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box'>
                  <div className='liquidity__pool__box__top'>
                    <div>
                      <h5>Stake CRET</h5>
                      {balanceError && (
                        <p className='text-danger danger error_message'>
                          Please fund your wallet with CRET
                        </p>
                      )}
                    </div>
                    <div>
                      <h6>
                        {testProfileLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#06397e'
                            height={0}
                            width={30}
                            className='loader'
                          />
                        ) : (
                          `${numberFormate(cptBalance)}`
                        )}{' '}
                      </h6>
                    </div>
                  </div>
                  <form onSubmit={submitStaking}>
                    <LiquidityInput
                      price={stakePrice}
                      handlePriceChange={handleStakePriceChange}
                      errors={balanceError}
                      typeOfToken='CRET'
                    />

                    <div className='liquidity__pool__box__btn'>
                      <button
                        type='submit'
                        disabled={stakeErrors}
                        className={
                          stakeErrors
                            ? 'btn_brand btn_brand_disabled'
                            : 'btn_brand'
                        }
                      >
                        Stake
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
              {/* <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box unstake'>
                  <div className='liquidity__pool__box__top'>
                    <div>
                      <h5>Unstake CRET</h5>
                      {!coolDownPeriodLoading && coolDownPeriod?.length > 0 && (
                        <Timer
                          countDownTime={coolDownPeriod}
                          setEnableClaim={setEnableClaim}
                        />
                      )}
                      {balanceError && (
                        <p className='text-danger danger error_message'>
                          Unstake Balance is Zero
                        </p>
                      )}
                    </div>
                    <div> */}
                      {/* <p className='txt__gray'>Unstake CAPL Balance</p> */}
                      {/* <h6>
                        {testProfileLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#06397e'
                            height={0}
                            width={30}
                            className='loader'
                          />
                        ) : (
                          `${numberFormate(CRET_CCPTBalance)}`
                        )}{' '}
                      </h6>
                    </div>
                  </div>
                  <form onSubmit={submitUnStaking}>
                    <LiquidityInput
                      price={unStakePrice}
                      handlePriceChange={handleUnStakePriceChange}
                      errors={balanceError}
                      typeOfToken='CRET'
                      disabled={true}
                    />
                    <p
                      className='txt__gray'
                      style={{fontSize: '11px', margin: 0}}
                    >
                      *Note: To unstake immediately, pay 70% penalty fees
                    </p>
                    <p
                      className='txt__gray'
                      style={{fontSize: '11px', marginBottom: 0}}
                    >
                      *Note: Staked amount available after cool down period of 3
                      months
                    </p> */}
                    {/* {(coolDownPeriod?.length > 0 || !isAvailableForClaim) && ( */}
                    {/* <div className='liquidity__pool__box__btn d-flex align-content-center justify-content-between'>
                      <button
                        type='submit'
                        onClick={() => setUnStakeType(0)}
                        disabled={unStakeErrors}
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          padding: '10px 15px',
                        }}
                        className={
                          unStakeErrors
                            ? 'btn_brand btn_brand_disabled'
                            : 'btn_brand'
                        }
                      >
                        Unstake Now
                      </button>
                      <button
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          padding: '10px 15px',
                        }}
                        type='submit'
                        disabled={unStakeErrors}
                        onClick={() => setUnStakeType(1)}
                        className={
                          unStakeErrors
                            ? 'btn_brand btn_brand_disabled'
                            : 'btn_brand'
                        }
                      >
                        Unstake After
                      </button>
                    </div> */}
                    {/* )} */}
                  {/* </form> */}
                  {/* {((isAvailableForClaim && coolDownPeriod?.length <= 0) ||
                    enableClaim) && (
                    <div className='liquidity__pool__box__btn m-auto'>
                      <button
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          padding: '10px 15px',
                        }}
                        onClick={claimFunds}
                        className='btn_brand'
                      >
                        Withdraw
                      </button>
                    </div>
                  )} */}
                {/* </div>
              </Col> */}
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box reward__section'>
                  <h5>Rewards</h5>
                  <h4 className='text-center'>
                    {testProfileLoading ? (
                      <ReactLoading
                        type='bars'
                        color='#06397e'
                        height={30}
                        width={30}
                        className='m-auto'
                      />
                    ) : (
                      `${numberFormate(cretRewards)}`
                    )}{' '}
                    <span>CCPT</span>
                  </h4>
                  {/* <p className='price txt__gray'>~$19,214.261</p> */}
                  <p className='txt__gray'>
                    *Note: Rewards will get deposited to your Wallet
                  </p>
                  <div className='liquidity__pool__box__btn mt-4'>
                    <button className='btn_brand btn_brand_disabled'>
                      Collect
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            <StakingHistory stakingType='CRET_TYPE' />
          </div>
        </Container>
      </div>
      <StakingLoader
        show={showLoader}
        handleClose={() => setShowLoader(false)}
      />
      <StakingConfirmation
        show={showSuccessModal}
        handleClose={() => handleCloseAndClearValue()}
      />
    </>
  )
}

export default StackingCRET
