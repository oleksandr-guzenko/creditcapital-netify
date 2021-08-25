import React from 'react'
import {Col, Row} from 'react-bootstrap'
import Chart from './Chart'
import UnstakeInput from './UnstakeInput'

const CapitalTokenStaking = () => {
  return (
    <div className='capital__token'>
      <div className='capital__token__header'>
        <div className='capital__token__header__left'>
          <p>CPT-LP</p>
          <p className='txt__gray'>TVL $19,214.261</p>
        </div>
        <div className='capital__token__header__right'>
          <p>
            59.71 % <span className='txt__gray'>APY</span>
          </p>
          <p>
            3.23% <span className='txt__gray'>Daily</span>
          </p>
        </div>
      </div>
      <hr />
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
          <div className='capital__token__box'>
            <div className='capital__token__box__header'>
              <div className='capital__token__box__header__left'>
                <p className='txt__gray'>LP Balance</p>
                <p>
                  2,582.00 <span className='txt__gray'>($5,156.25)</span>
                </p>
              </div>
              <div className='capital__token__box__header__right'>
                <button className='btn_brand'>Approve</button>
                <button className='btn_brand btn_brand_disabled'>Stake</button>
              </div>
            </div>
            <div className='capital__token__box__body'>
              <p className='txt__gray text-center'>
                Add/remove liquidity to the CPT on Quick Swap to get CPTLP
                tokens. Then stake those LP tokens on credit capital to receive
                Capital rewards.
              </p>
              <div>
                <button className='btn_brand btn__brand__secondary mb-3'>
                  Add Liquidity on Quick Swap
                </button>
                <button className='btn_brand btn__brand__secondary'>
                  Remove Liquidity on Quick Swap
                </button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} xl={6} className='mb-3'>
          <div className='capital__token__box__two'>
            <div className='capital__token__box__two__top'>
              <p className='txt__gray'>Available to Unstake</p>
              <h6>
                9,263.00CPT<span className='txt__gray'>(~$19,214.261)</span>{' '}
              </h6>
              <UnstakeInput />
            </div>
            <div className='capital__token__box__two__bottom'>
              <p className='txt__gray'>CPT Chart</p>
              <Chart />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CapitalTokenStaking
