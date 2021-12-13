import React, {useEffect, useState} from 'react'
import {Col, Container, Image, Row} from 'react-bootstrap'
import {numberFormate} from '../../Utilities/Util'
import ReactLoading from 'react-loading'
import {disConnectWallet} from '../../Redux/Profile/actions'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineCaretDown, AiOutlineCaretUp} from 'react-icons/ai'
import Logo from '../../Assets/cc_white.svg'
import {
  clearHashValues,
  vaultDepositAndWithdrawTokens,
} from '../../Redux/Vault/action'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import VaultSuccess from '../Modals/Vaults/VaultSuccess'
import {useHistory} from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  // loading
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const {userAddress} = useSelector((state) => state.profile)
  const {balanceLoading, usdcBNBBalance, caplPrice, ccptBNBBalance} =
    useSelector((state) => state.swap)
  const {
    reserves,
    totalLp,
    vaultHash,
    vaultLoading,
    vaultRewards,
    depositedLpBalance,
    withdrawLpBalance,
    totalShares,
    apy,
    LpTokenPrice,
  } = useSelector((state) => state.vault)
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
      <section className='dashboard'>
        <Container>
          <div className='dashboard_header'>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={8} xl={8} xxl={8}>
                <div className='dashboard_header_left'>
                  <Row>
                    <Col className='mb-1' sm={12} md={12} lg={4} xl={4} xxl={4}>
                      <div className='main_card'>
                        <div>
                          <p>Your Locked CAPL</p>
                          <h3>0 CAPL</h3>
                        </div>
                        <div>
                          <p>Your Staked CAPL</p>
                          <h3>0 CAPL</h3>
                        </div>
                      </div>
                    </Col>
                    <Col className='mb-1' sm={12} md={12} lg={4} xl={4} xxl={4}>
                      <div className='main_card'>
                        <div>
                          <p>Your Daily Revenue</p>
                          <h3>$0.00 USD</h3>
                        </div>
                        <div>
                          <p>Your Weekly CAPL</p>
                          <h3>$0.00 USD</h3>
                        </div>
                      </div>
                    </Col>
                    <Col className='mb-1' sm={12} md={12} lg={4} xl={4} xxl={4}>
                      <div className='main_card'>
                        <div>
                          <p>Revenue Projected</p>
                          <h3>$0.00 USD</h3>
                          <h6>/month</h6>
                        </div>
                        <div>
                          <p>Revenue Projected</p>
                          <h3>$0.00 USD</h3>
                          <h6>/year</h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={4} xl={4} xxl={4}>
                <div className='dashboard_header_right'>
                  <div className='main_card last_Card'>
                    <p>Your Daily Platform Fees</p>
                    <h3>1.00 CAPL</h3>
                    <h3>$0.00 USD</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <div className='title_info'>
          <h4>PORTFOLIO</h4>
          <Container>
            <p></p>
          </Container>
          {/* <button className='btn_brand' onClick={handleDisconnect}>
            Disconnect
          </button> */}
        </div>
        <div className='dashboard_wrapper'>
          <Container>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_two dashboard_card_three'>
                  <div className='db_top'>
                    <div>
                      <h3>WALLET ADDRESS</h3>
                    </div>
                    <div>
                      <p className='id'>{userAddress}</p>
                    </div>
                  </div>
                  <div className='db_bottom'>
                    <div className='Db_lol'>
                      <p className='heads'>Wallet Assets</p>
                      <div className='db_bottom_left'>
                        <div>
                          <p>USDC-CAPL Shares</p>
                          <p>
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='mb-4'
                              />
                            ) : (
                              `${numberFormate(
                                depositedLpBalance
                              )} ($${numberFormate(
                                (depositedLpBalance * LpTokenPrice) / 100000000
                              )} USD)`
                            )}
                          </p>
                        </div>
                        <div>
                          <p>CAPL Tokens</p>
                          <p>
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='mb-4'
                              />
                            ) : (
                              `${numberFormate(
                                ccptBNBBalance
                              )} ($ ${numberFormate(
                                ccptBNBBalance * caplPrice
                              )} USD)`
                            )}
                          </p>
                        </div>
                        <div>
                          <p>USDC Tokens</p>
                          <p>
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='mb-4'
                              />
                            ) : (
                              `${numberFormate(
                                usdcBNBBalance
                              )} ($${numberFormate(usdcBNBBalance)} USD)`
                            )}
                          </p>
                        </div>
                      </div>
                      <p className='heads'>Vault Assets</p>
                      <div className='db_bottom_right'>
                        <div>
                          <p>USDC-CAPL Shares</p>
                          <p>
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='ms-auto mb-4'
                              />
                            ) : (
                              `${numberFormate(
                                withdrawLpBalance
                              )} ($${numberFormate(
                                (withdrawLpBalance * LpTokenPrice) / 100000000
                              )} USD)`
                            )}
                          </p>
                        </div>
                        <div>
                          <p>Pending Rewards</p>
                          <p>
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='ms-auto mb-4'
                              />
                            ) : (
                              `${numberFormate(vaultRewards)} ($${numberFormate(
                                vaultRewards * caplPrice
                              )} USD)`
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='d-flex align-items-center justify-content-center mt-3 '>
                        <button
                          onClick={() =>
                            dispatch(
                              vaultDepositAndWithdrawTokens(0, 'rewards')
                            )
                          }
                          className='btn_brand me-2'
                        >
                          Claim Rewards
                        </button>
                        {/*<button className='btn_brand'>Compound</button>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_four'>
                  <div className='db_bottom_top'>
                    <p>CAPL Price</p>
                    <p>
                      {balanceLoading ? (
                        <ReactLoading
                          type='bars'
                          color='#ffffff'
                          height={0}
                          width={30}
                          className='ms-auto mb-4'
                        />
                      ) : (
                        `$ ${numberFormate(caplPrice)}`
                      )}
                    </p>
                    <p className='green'>+0.00 (USD)</p>
                    <p className='green'>
                      +0.00%{' '}
                      <span>
                        <AiOutlineCaretUp />
                      </span>
                    </p>
                  </div>
                  <div className='db_bottom'>
                    <div className='item'>
                      <p>Rewards</p>
                      <p className='green'>+0.00%</p>
                      <p className='green'>+0.00%</p>
                      <p>{numberFormate(vaultRewards * caplPrice)}</p>
                    </div>
                    <div className='item'>
                      <p>CAPL Changes</p>
                      <p className='green'>+0.00%</p>
                      <p className='green'>+0.00%</p>
                      <p>$0.00 CAPL</p>
                    </div>
                    <div className='item'>
                      <p>STO Loans</p>
                      <p className='green'>+0.00%</p>
                      <p>$00.00 CCUSD</p>
                    </div>
                    <div className='item'>
                      <p>Total profit/Loss</p>
                      <p className='green'>+0.00%</p>
                      <p>$00.00 USD</p>
                    </div>
                    <div className='item'>
                      <p>Total APY</p>
                      <p>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='profile_loading'
                          />
                        ) : (
                          `${numberFormate(apy)} %`
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className='title_info platform'>
              <h4>PLATFORM</h4>
              <p></p>
            </div>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_one'>
                  <div className='db_top'>
                    <div className='db_top_left'>
                      <h3>CAPL</h3>
                    </div>

                    <div className='db_top_right'>
                      <h5>${numberFormate(caplPrice)} USD</h5>
                      <h6>Current Price</h6>
                    </div>
                    <div>
                      <button
                        onClick={() => history.push('/swap')}
                        className='btn_brand'
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                  <p className='tokenomics'>Tokenomics</p>
                  <div className='db_bottom'>
                    <div className='db_bottom_left'>
                      <Image src={Logo} alt='' />
                      <h5>CAPL</h5>
                      <p>
                        +0.00%{' '}
                        <span>
                          <AiOutlineCaretUp />
                        </span>
                      </p>
                    </div>
                    <div className='db_bottom_right'>
                      <div className='list'>
                        <p>Market Cap</p>
                        <p>
                          {balanceLoading ? (
                            <ReactLoading
                              type='bars'
                              color='#ffffff'
                              height={0}
                              width={30}
                              className='profile_loading'
                            />
                          ) : (
                            `${numberFormate(
                              (reserves?._reserve1 / 10 ** 6) * caplPrice
                            )} CAPL`
                          )}
                        </p>
                      </div>
                      <div className='list'>
                        <p>Total Supply</p>
                        <p>100,000,000 CAPL</p>
                      </div>
                      <div className='list'>
                        <p>Circulating Supply</p>
                        <p>
                          {balanceLoading ? (
                            <ReactLoading
                              type='bars'
                              color='#ffffff'
                              height={0}
                              width={30}
                              className='profile_loading'
                            />
                          ) : (
                            `${numberFormate(
                              reserves?._reserve1 / 10 ** 6
                            )} CAPL`
                          )}
                        </p>
                      </div>
                      <div className='list'>
                        <p>Daily Rewards</p>
                        <p>5000 CAPL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_four dashboard_card_two'>
                  <div className='db_bottom_top'>
                    <p>Platform Assets</p>
                    <p>
                      {balanceLoading ? (
                        <ReactLoading
                          type='bars'
                          color='#ffffff'
                          height={0}
                          width={30}
                          className='mb-4'
                        />
                      ) : (
                        `${numberFormate(
                          (totalLp * LpTokenPrice) / 100000000
                        )} USD`
                      )}
                    </p>
                    <p className='green'>
                      +0.00%{' '}
                      <span>
                        <AiOutlineCaretUp />
                      </span>
                    </p>
                  </div>
                  <div className='totalLiquidty'>
                    <p>USDC-CAPL Total Liquidity</p>
                    <p>
                      {balanceLoading ? (
                        <ReactLoading
                          type='bars'
                          color='#ffffff'
                          height={0}
                          width={30}
                          className='mb-4'
                        />
                      ) : (
                        `${numberFormate(totalLp)} LP ($ ${numberFormate(
                          (totalLp / 100000000) * LpTokenPrice
                        )} USD)`
                      )}
                    </p>
                  </div>
                  <p className='tresury'>Treasury Assets</p>
                  <div className='db_bottom'>
                    <div className='item'>
                      <p>USDC</p>
                      <p>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='mb-4'
                          />
                        ) : (
                          `${numberFormate(0)} USDC`
                        )}
                      </p>
                    </div>
                    <div className='item'>
                      <p>CAPL</p>
                      <p>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='mb-4'
                          />
                        ) : (
                          `${numberFormate(0)} CAPL`
                        )}
                      </p>
                    </div>
                    <div className='item'>
                      <p>USDC-CAPL Shares</p>
                      <p>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='mb-4'
                          />
                        ) : (
                          `${numberFormate(0)} USDC-CAPL`
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              {/* <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_two'>
                  <div className='db_top'>
                    <h3>Rewards</h3>
                    <button className='btn_brand'>Redeem</button>
                  </div>
                  <div className='db_bottom'>
                    <p className='Massin'>Liquidity Pool</p>
                    <div className='Db_lol'>
                      <div className='db_bottom_left'>
                        <p>Platform Revenue</p>
                        <p>0(USD)</p>
                        <p className='green'>
                          +0.00%{' '}
                          <span>
                            <AiOutlineCaretUp />
                          </span>
                        </p>
                      </div>
                      <div className='db_bottom_right'>
                        <p>Daily Rewards</p>
                        <p>
                          {balanceLoading ? (
                            <ReactLoading
                              type='bars'
                              color='#ffffff'
                              height={0}
                              width={30}
                              className='ms-auto mb-4'
                            />
                          ) : (
                            `${numberFormate(totalShares)} CAPL`
                          )}
                        </p>
                        <p className='green'>
                          +0.00%{' '}
                          <span>
                            <AiOutlineCaretUp />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col> */}
            </Row>
          </Container>
        </div>
      </section>
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

export default Dashboard
