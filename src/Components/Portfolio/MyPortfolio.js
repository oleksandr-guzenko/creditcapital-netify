import React, {useEffect, useState} from 'react'
import {Col, Container, Image, Row} from 'react-bootstrap'
import PortfolioCard from './PortfolioCard'
import {numberFormate} from '../../Utilities/Util'
import {useHistory} from 'react-router-dom'
import ReactLoading from 'react-loading'

// Svgs
import card_one from '../../Assets/portfolio/card_one.svg'
import card_two from '../../Assets/portfolio/card_two.svg'
import card_three from '../../Assets/portfolio/card_three.svg'
import card_four from '../../Assets/portfolio/card_four.svg'
import card_five from '../../Assets/portfolio/card_five.svg'
import Logo from '../../Assets/cc_white.svg'

// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {disConnectWallet} from '../../Redux/Profile/actions'
import {
  clearHashValues,
  vaultDepositAndWithdrawTokens,
} from '../../Redux/Vault/action'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import VaultSuccess from '../Modals/Vaults/VaultSuccess'

const MyPortfolio = () => {
  // Redux State
  // loading
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const dispatch = useDispatch()
  const {vaultHash, vaultLoading} = useSelector((state) => state.vault)
  let history = useHistory()

  const {apy, withdrawLpBalance, depositedLpBalance, vaultRewards} =
    useSelector((state) => state.vault)
  const {ccptBNBBalance, caplPrice, balanceLoading} = useSelector(
    (state) => state.swap
  )

  const handleDisconnect = () => {
    dispatch(disConnectWallet())
  }

  useEffect(() => {
    if (vaultLoading) {
      setSwapLoad(true)
    } else {
      setSwapLoad(false)
    }
  }, [vaultLoading])

  useEffect(() => {
    if (vaultHash) {
      setSwapSucc(true)
    } else {
      setSwapSucc(false)
    }
  }, [vaultHash])

  return (
    <>
      <div className='portfolio'>
        <Container>
          <div className='portfolio__container'>
            <div className='mt-5 d-flex align-items-center justify-content-center flex-column'>
              <h4>My Portfolio</h4>
              <button className='btn_brand sdfdsf' onClick={handleDisconnect}>
                Disconnect
              </button>
            </div>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                <div className='upBox'>
                  <h3>Metrics</h3>
                  <div className='d-flex flex-column justify-content-between'>
                    <div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <p>Max Supply</p>
                        <p>100,000,000</p>
                      </div>
                      {/* <div className='d-flex align-items-center justify-content-between'>
                  <p>CAPL Burned in USD</p>
                  <p>$252,943</p>
                </div> */}
                      <div className='d-flex align-items-center justify-content-between'>
                        <p>Market Cap / TVL Ratio</p>
                        <p>1</p>
                      </div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <p>Total rewards/day</p>
                        <p>5000 CAPL/day</p>
                      </div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <p>Total Value</p>
                        <p>{ccptBNBBalance * caplPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={4} xl={3}>
                <div className='upBox sfds'>
                  <Image src={Logo} alt='' />
                  <h6>CAPL Balance</h6>
                  <p>
                    {balanceLoading ? (
                      <ReactLoading
                        type='bars'
                        color='#ffffff'
                        height={0}
                        width={30}
                        className='load'
                      />
                    ) : (
                      numberFormate(ccptBNBBalance)
                    )}
                  </p>
                  <h6>CAPL Price</h6>
                  <p>{caplPrice}</p>
                  <div className='d-flex justify-content-center align-items-end'>
                    <button
                      onClick={() => history.push('/swap')}
                      className='btn_brand'
                    >
                      Buy CAPL
                    </button>
                  </div>
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={4} xl={5}>
                <div className='upBox third'>
                  <h3>Holdings</h3>
                  <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <div className='hleft text-start '>
                      <p>LP Balance In Wallet</p>
                      {/* <h5 className='redd'>{numberFormate(withdrawLpBalance)}</h5> */}
                      <h5 className='redd'>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          numberFormate(depositedLpBalance)
                        )}
                      </h5>
                    </div>
                    <div className='hright text-lg-end text-sm-start'></div>
                  </div>
                  <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <div className='hleft text-start '>
                      <p>LP Balance In Vault</p>
                      {/* <h5 className='redd'>{numberFormate(withdrawLpBalance)}</h5> */}
                      <h5 className='redd'>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          numberFormate(withdrawLpBalance)
                        )}
                      </h5>
                    </div>
                    <div className='hright text-lg-end text-sm-start'>
                      <p>Current APY</p>
                      <h5 className='redd'>{numberFormate(apy)}%</h5>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <div className='hleft text-start'>
                      <p>Pending Earnings</p>
                      <h5 className='redd'>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          numberFormate(vaultRewards)
                        )}
                      </h5>
                    </div>
                    <div className='hright text-lg-end text-sm-start'>
                      <p>CAPL Share</p>
                      <h5 className='redd'>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          `${(Number(ccptBNBBalance) / 100000000)?.toFixed(
                            18
                          )} %`
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <div className='hleft text-start'>
                      <p>User expenses</p>
                      <h5 className='redd'>$0</h5>
                    </div>
                    <div className='hright text-lg-end text-sm-start'>
                      <p>User Income</p>
                      <h5 className='redd'>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          numberFormate(vaultRewards)
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className='mt-3 d-flex justify-content-center'>
                    <button
                      onClick={() =>
                        dispatch(vaultDepositAndWithdrawTokens(0, 'rewards'))
                      }
                      className='btn_brand'
                    >
                      Claim Rewards
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                <div className='upBox '>
                  <h3>Income / Expenses</h3>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>CAPL Balance Value/Change</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>CAPL Gain/Loss</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>Rewards</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>Stable token Loans</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>Total Profit/Loss</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>Total APY</p>
                    <p>-</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <p>Projections</p>
                    <p>-</p>
                  </div>
                </div>
              </Col>
            </Row>
            {/* <Row className='portfolio__cards__container'>
            <PortfolioCard
              bgColor='#e5def0'
              amount={`$ ${numberFormate(CCPTBalance)}`}
              text='CAPL Balance'
              icon={card_one}
            />
            <PortfolioCard
              bgColor='#D6EDD9'
              amount={numberFormate(CAPLBalance)}
              text='CCUDC balance'
              icon={card_two}
            />
            <PortfolioCard
              bgColor='#F6F0D8'
              amount={numberFormate(CRETBalance)}
              text='CRET balance'
              icon={card_three}
            />
            <PortfolioCard
              bgColor='#D8E4F6'
              amount={`$ ${numberFormate(lpCAPLBalance || a)}`}
              text='CCUDC LP Balance'
              icon={card_four}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount={`$ ${numberFormate(lpCRETBalance || b)}`}
              text='CRET LP Balance'
              icon={card_five}
            />
            <PortfolioCard
              bgColor='#F6D8D8'
              amount={`$ ${numberFormate(availableBalance || c)}`}
              text='USDC Balance'
              icon={card_five}
            />
            <PortfolioCard
              bgColor='#e5def0'
              amount={`$ ${numberFormate(totalRewards)}`}
              text='Total Rewards Earned'
              icon={card_one}
            />
          </Row> */}
          </div>
        </Container>
      </div>
      <SwapLoading show={swapLoad} handleClose={() => setSwapLoad(false)} />
      <VaultSuccess
        show={swapSucc}
        handleClose={() => {
          setSwapSucc(false)
          dispatch(clearHashValues())
        }}
      />
    </>
  )
}

export default MyPortfolio
