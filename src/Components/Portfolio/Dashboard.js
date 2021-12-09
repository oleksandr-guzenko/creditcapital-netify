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

const Dashboard = () => {
  const dispatch = useDispatch()
  // loading
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const {userAddress} = useSelector((state) => state.profile)
  const {balanceLoading, caplPrice, ccptBNBBalance} = useSelector(
    (state) => state.swap
  )

  const {
    reserves,
    vaultHash,
    vaultLoading,
    vaultRewards,
    depositedLpBalance,
    withdrawLpBalance,
    totalShares,
    apy,
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
        <div className='title_info'>
          <h4>My Portfolio</h4>
          <button className='btn_brand' onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
        <div className='dashboard_wrapper'>
          <Container>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_one'>
                  <div className='db_top'>
                    <div className='db_top_left'>
                      <h3>CAPL</h3>
                    </div>
                    <div className='db_top_right'>
                      <h6>Current Price</h6>
                      <h5>${numberFormate(caplPrice)} USDC</h5>
                    </div>
                  </div>
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
                        <p>1</p>
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
                      <div className='list'>
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
                </div>
              </Col>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
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
              </Col>
            </Row>
            <Row>
              <Col className='mb-3' sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div className='dashboard_card dashboard_card_two dashboard_card_three'>
                  <div className='db_top'>
                    <h3>Wallet Address</h3>
                    <p className='id'>{userAddress}</p>
                  </div>
                  <div className='db_bottom'>
                    <div className='Db_lol'>
                      <div className='db_bottom_left'>
                        <p>Wallet Assets</p>
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
                            `${numberFormate(depositedLpBalance)} ($0 USD)`
                          )}
                        </p>
                        <p>CAPL Value</p>
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
                      <div className='db_bottom_right'>
                        <p>Vault Assets</p>
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
                            `${numberFormate(withdrawLpBalance)} ($0 USD)`
                          )}
                        </p>
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
                            `${numberFormate(vaultRewards)} ($0 USD)`
                          )}
                        </p>
                        <div className='d-flex align-items-center justify-content-end btns'>
                          <button
                            onClick={() =>
                              dispatch(
                                vaultDepositAndWithdrawTokens(0, 'rewards')
                              )
                            }
                            className='btn_brand me-2'
                          >
                            Claim
                          </button>
                          <button className='btn_brand'>Vault</button>
                        </div>
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
                        `$ ${numberFormate(caplPrice)} ($0 USD)`
                      )}
                    </p>
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
                      <p>Gain/Loss</p>
                      <p className='green'>+0.00%</p>
                      <p className='green'>+0.00%</p>
                      <p>$29.54 CAPL</p>
                    </div>
                    <div className='item'>
                      <p>STO Loans</p>
                      <p className='green'>+0.00%</p>
                      <p>$29.54 USD</p>
                    </div>
                  </div>
                </div>
              </Col>
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
