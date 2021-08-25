import React, {useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LiquidityInput from '../LandingPage/LiquidityInput'

const TrusteeLiquidity = () => {
  const [addLiquidityPrice, setAddLiquidityPrice] = useState('')
  const [removeLiquidityPrice, setRemoveLiquidityPrice] = useState('')
  const [payoutRewards, setPayoutRewards] = useState('')

  return (
    <div className='liquidity__pool stacking trustee__iquidity'>
      <Container>
        <div className='liquidity__pool__wrapper'>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-3'>
              <div className='liquidity__pool__box'>
                <div className='liquidity__pool__box__top'>
                  <div>
                    <h5>Add Liquidity</h5>
                  </div>
                </div>
                <LiquidityInput
                  price={addLiquidityPrice}
                  setPrice={setAddLiquidityPrice}
                />
                <p className='trustee txt__gray'>
                  Receive: 0.0000 CPT ($0.0000)
                </p>
                <p className='trustee txt__gray'>
                  *Note: Every CPT received on liquidity into poll will get
                  burnt
                </p>
                <div className='liquidity__pool__box__btn'>
                  <button
                    disabled={!addLiquidityPrice}
                    className={
                      !addLiquidityPrice
                        ? 'btn_brand btn_brand_disabled'
                        : 'btn_brand'
                    }
                  >
                    Add Liquidity
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-3'>
              <div className='liquidity__pool__box'>
                <div className='liquidity__pool__box__top'>
                  <h5>Remove and Lock Liquidity</h5>
                </div>
                <LiquidityInput
                  price={removeLiquidityPrice}
                  setPrice={setRemoveLiquidityPrice}
                />
                <p className='trustee txt__gray'>
                  Receive: 0.0000 CPT ($0.0000)
                </p>
                <p className='trustee txt__gray'>Price impact: 0.0000%</p>
                <div className='liquidity__pool__box__btn'>
                  <button
                    disabled={!removeLiquidityPrice}
                    className={
                      !removeLiquidityPrice
                        ? 'btn_brand btn_brand_disabled'
                        : 'btn_brand'
                    }
                  >
                    Unstake
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-3'>
              <div className='liquidity__pool__box reward__section'>
                <div className='liquidity__pool__box__top'>
                  <h5>Payout Rewards</h5>
                </div>
                <LiquidityInput
                  cpt={true}
                  price={payoutRewards}
                  setPrice={setPayoutRewards}
                />
                <p className='trustee txt__gray'>
                  *Note: Amount of CPT will be distributed
                </p>
                <div className='liquidity__pool__box__btn'>
                  <button
                    disabled={!payoutRewards}
                    style={{marginTop: '19px'}}
                    className={
                      !payoutRewards
                        ? 'btn_brand  btn_brand_disabled'
                        : 'btn_brand'
                    }
                  >
                    Distribute Rewards
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default TrusteeLiquidity
