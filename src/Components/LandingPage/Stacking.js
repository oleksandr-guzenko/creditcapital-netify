import React, {useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LiquidityInput from './LiquidityInput'

const Stacking = () => {
  const [stakePrice, setStakePrice] = useState('')
  const [unStakePrice, setUnStakePrice] = useState('')
  return (
    <div className='liquidity__pool stacking'>
      <Container>
        <div className='liquidity__pool__wrapper'>
          <h4 className='section__titles'>Staking CPT</h4>
          <p>
            Staking CPT is an additional way to earn extra yield on current
            deposit
          </p>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-3'>
              <div className='liquidity__pool__box'>
                <div className='liquidity__pool__box__top'>
                  <div>
                    <h5>Stake CPT</h5>
                    <h6>
                      9,263.00 <span className='txt__gray'>(~$19,214.261)</span>
                    </h6>
                  </div>
                </div>
                <LiquidityInput
                  cpt={true}
                  price={stakePrice}
                  setPrice={setStakePrice}
                />
                <div className='liquidity__pool__box__btn'>
                  <button
                    disabled={!stakePrice}
                    className={
                      !stakePrice ? 'btn_brand btn_brand_disabled' : 'btn_brand'
                    }
                  >
                    Stake
                  </button>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className='mb-3'>
              <div className='liquidity__pool__box unstake'>
                <div className='liquidity__pool__box__top'>
                  <h5>Unstake CPT</h5>
                  <div>
                    <p className='txt__gray'>CPT Balance Avaiable to unstake</p>
                    <h6>
                      163.00 <span className='txt__gray'>(~$214.261)</span>
                    </h6>
                  </div>
                </div>
                <LiquidityInput
                  cpt={true}
                  price={unStakePrice}
                  setPrice={setUnStakePrice}
                />
                <div className='liquidity__pool__box__btn'>
                  <button
                    disabled={!unStakePrice}
                    className={
                      !unStakePrice
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
                <h5>Rewards</h5>
                <h4>9,263 CPT</h4>
                <p className='price txt__gray'>~$19,214.261</p>
                <p className='txt__gray'>
                  *Note: Rewards will get deposited to your Wallet
                </p>
                <div className='liquidity__pool__box__btn'>
                  <button className='btn_brand'>Collect</button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Stacking
