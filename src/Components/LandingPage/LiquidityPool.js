import React, {useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LiquidityHistory from './LiquidityHistory'
import LiquidityInput from './LiquidityInput'

import getContracts from '../../Redux/Blockchain/contracts'

const LiquidityPool = () => {
  const [depositPrice, setDepositPrice] = useState('')
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const {usdc, cpt, Buycpt, web3} = getContracts()
  const connectToMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      const add = window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((res) => {
          if (res[0]) {
            depositToken(res[0])
          }
        })
        .catch((err) => console.log(err.message))
    } else {
      alert('Please Install Metamask')
    }
  }

  const depositToken = async (userAddress) => {
    try {
      const price = web3.utils.toWei(depositPrice.toString())

      await usdc.methods
        .approve(Buycpt._address, price)
        .send({from: userAddress})

      const transaction = await Buycpt.methods
        .buyToken(price)
        .send({from: userAddress})

      const transactionEvents = transaction.events.BuyToken.returnValues

      const usdcAm = web3.utils.fromWei(
        transactionEvents?.usdcAmount?.toString()
      )
      alert(
        `Transaction Success ${transactionEvents?.tokentype} USDC: ${usdcAm}`
      )
    } catch (error) {
      console.log(error?.message)
    }
  }

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
                <LiquidityInput
                  price={depositPrice}
                  setPrice={setDepositPrice}
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
                    disabled={!depositPrice}
                    onClick={connectToMetaMask}
                    className={
                      !depositPrice
                        ? 'btn_brand btn_brand_disabled'
                        : 'btn_brand'
                    }
                  >
                    Deposit
                  </button>
                </div>
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
                <LiquidityInput
                  price={withdrawPrice}
                  setPrice={setWithdrawPrice}
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
                    disabled={!withdrawPrice}
                    className={
                      !withdrawPrice
                        ? 'btn_brand btn_brand_disabled'
                        : 'btn_brand'
                    }
                  >
                    Withdraw
                  </button>
                </div>
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
