import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Collapse} from 'react-bootstrap'
import LiquidityInput from '../LandingPage/LiquidityInput'
import {BiPlay} from 'react-icons/bi'

const YieldPool = ({name}) => {
  // Redux State

  const [depositPrice, setDepositPrice] = useState('')
  const [depositErrors, setDepositErrors] = useState(false)
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const [withdrawErrors, setWithdrawErrors] = useState(false)
  const [enableClaim, setEnableClaim] = useState(false)

  // loaders and success states
  const [showLoader, setShowLoader] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // ErrorState
  const [balanceError, setBalanceError] = useState(false)

  // Deposit
  const handleDepositPriceChange = (number) => {
    setDepositPrice(number.value)
  }
  const submitDepositLiquidityPool = (e) => {
    e.preventDefault()
  }
  // Withdraw

  const handleWithdrawPriceChange = (number) => {
    setWithdrawPrice(number.value)
  }
  const submitWithdrawLiquidityPool = (e) => {
    e.preventDefault()
  }
  const [open, setOpen] = useState(false)

  return (
    <div className='liquidity__pool'>
      <Container>
        <div className='liquidity__pool__wrapper'>
          <div className='liquidity mb-3'>
            <div className='liquidity__header'>
              <h4 className='section__titles'>{name}</h4>
              <div
                className='__play__icon__wrapper'
                onClick={() => {
                  setOpen(!open)
                  const playIcon = document.getElementById('play__icon')
                  playIcon.classList.toggle('toggle__play__icon')
                }}
                aria-controls='collapse-div'
                aria-expanded={open}
              >
                <BiPlay id='play__icon' />
              </div>
            </div>
          </div>
          {/* <h4 className='section__titles'>{name}</h4> */}
          <Collapse in={open}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
                <div className='liquidity__pool__box'>
                  <div className='liquidity__pool__box__top'>
                    <h5>Deposit</h5>
                    <div>
                      <p className='txt__gray'>Available balance</p>
                      <h6>0.0000</h6>
                    </div>
                  </div>
                  <form onSubmit={submitDepositLiquidityPool}>
                    <LiquidityInput
                      price={depositPrice}
                      handlePriceChange={handleDepositPriceChange}
                      errors={balanceError}
                      typeOfToken='USDC'
                    />
                    <div className='liquidity__pool__box__bottom'>
                      <div></div>

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
                      <h6>0.0000</h6>

                      {/* <span className='txt__gray ms-1'>(~$19,214.261)</span> */}
                    </div>
                  </div>
                  <form onSubmit={submitWithdrawLiquidityPool}>
                    <LiquidityInput
                      price={withdrawPrice}
                      handlePriceChange={handleWithdrawPriceChange}
                      errors={balanceError}
                      typeOfToken='CAPL'
                      disabled={true}
                    />
                    <div className='liquidity__pool__box__bottom withdraw'>
                      <div></div>
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
          </Collapse>
        </div>
      </Container>
    </div>
  )
}

export default YieldPool
