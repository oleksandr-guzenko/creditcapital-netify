import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LiquidityHistory from './LiquidityHistory'
import LiquidityInput from './LiquidityInput'

const LiquidityPool = () => {
  const [depositPrice, setDepositPrice] = useState('')
  const [depositErrors, setDepositErrors] = useState(false)
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const [withdrawErrors, setWithdrawErrors] = useState(false)

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

  //  Error handling
  useEffect(() => {
    if (depositPrice == 0 || depositPrice == '.') {
      setDepositErrors(true)
    } else {
      setDepositErrors(false)
    }
  }, [depositPrice])

  useEffect(() => {
    if (withdrawPrice == 0 || withdrawPrice == '.') {
      setWithdrawErrors(true)
    } else {
      setWithdrawErrors(false)
    }
  }, [withdrawPrice])

  return (
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
                      9,263.00 <span className='txt__gray'>(~$19,214.261)</span>
                    </h6>
                  </div>
                </div>
                <form onSubmit={submitDepositLiquidityPool}>
                  <LiquidityInput
                    price={depositPrice}
                    handlePriceChange={handleDepositPriceChange}
                    errors={depositErrors}
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
                    <h6>
                      9,263.00 <span className='txt__gray'>(~$19,214.261)</span>
                    </h6>
                  </div>
                </div>
                <form onSubmit={submitWithdrawLiquidityPool}>
                  <LiquidityInput
                    price={withdrawPrice}
                    handlePriceChange={handleWithdrawPriceChange}
                    errors={withdrawErrors}
                  />
                  <div className='liquidity__pool__box__bottom withdraw'>
                    <div>
                      <p>
                        *Note:Withdraw amount after cool down period of 24 hrs
                      </p>
                    </div>
                    <div>
                      <p>Receive: 0.0000 CPT ($0.0000)</p>
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
  )
}

export default LiquidityPool
