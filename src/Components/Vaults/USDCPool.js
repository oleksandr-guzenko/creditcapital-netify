import React, {useEffect, useState} from 'react'
import {Col, Collapse, Container, Image, Row} from 'react-bootstrap'
import {BiPlay} from 'react-icons/bi'
import {GoChevronDown, GoChevronUp} from 'react-icons/go'
import VaultInput from './VaultInput'

// svgs
import USDCSVG from '../../Assets/money/usdc.svg'
import CCPTSVG from '../../Assets/portfolio/card_three.svg'
import {useDispatch, useSelector} from 'react-redux'
import {
  clearHashValues,
  getDepositedBalance,
  vaultDepositAndWithdrawTokens,
  withdrawVaultTokens,
} from '../../Redux/Vault/action'
import {numberFormate} from '../../Utilities/Util'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import VaultSuccess from '../Modals/Vaults/VaultSuccess'

const USDCPool = () => {
  //redux
  const dispatch = useDispatch()
  const {userAddress} = useSelector((state) => state.profile)
  const {usdcBNBBalance} = useSelector((state) => state.swap)

  const {
    vaultHash,
    vaultLoading,
    depositedLpBalance,
    vaultRewards,
    withdrawLpBalance,
  } = useSelector((state) => state.vault)

  const [open, setOpen] = useState(false)
  const [depositPrice, setDepositPrice] = useState('')
  const [depositErrors, setDepositErrors] = useState(false)

  // ErrorState
  const [balanceError, setBalanceError] = useState(false)
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const [withdrawErrors, setWithdrawErrors] = useState(false)

  // loading
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)

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
      setDepositPrice('')
      setWithdrawPrice('')
      setTimeout(() => {
        dispatch(clearHashValues())
      }, 15000)
    } else {
      setSwapSucc(false)
    }
  }, [vaultHash])
  // ################

  useEffect(() => {
    if (userAddress) {
      dispatch(getDepositedBalance())
    }
  }, [userAddress])

  // Deposit
  const handleDepositPriceChange = (number) => {
    setDepositPrice(number.value)
  }
  const submitDepositLiquidityPool = (e) => {
    e.preventDefault()
    dispatch(vaultDepositAndWithdrawTokens(depositPrice, 'deposit'))
  }
  // Withdraw
  const handleWithdrawPriceChange = (number) => {
    setWithdrawPrice(number.value)
  }
  const submitWithdrawLiquidityPool = (e) => {
    e.preventDefault()
    dispatch(vaultDepositAndWithdrawTokens(withdrawPrice, 'withdraw'))
  }
  const claimVaultRewards = () => {
    dispatch(vaultDepositAndWithdrawTokens(0, 'rewards'))
  }

  return (
    <>
      <div className='swap lpVaults'>
        <Container>
          <section className='main_wrapper'>
            <div
              className='main_wrapper_header'
              onClick={() => setOpen(!open)}
              aria-controls='collapse-div'
              aria-expanded={open}
            >
              <div className='header_wrapper wefwe'>
                <div className='header_wrapper_left'>
                  <Image src={USDCSVG} alt='' />
                </div>
                <div className='header_wrapper_right'>
                  <h4>USDC</h4>
                  <p>0.625</p>
                </div>
              </div>
              <div className='header_wrapper'>
                <h4>967.51%</h4>
                <p>0.625</p>
              </div>
              <div className='header_wrapper'>
                <h4>$0.00</h4>
                <p>0.000 LP</p>
              </div>
              <div className='header_wrapper'>
                <h4>$0.00</h4>
                <p>0.000 CAPL</p>
              </div>
              <div className='header_wrapper'>
                {open ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <Collapse in={open}>
              <div className='lpWrapper' id='collapse-div'>
                <Row>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <div className='liquidity__pool__box__top'>
                        <h5>In Wallet</h5>
                        <div>
                          <p className='txt__gray'>Available balance</p>
                          <h6>
                            {numberFormate(usdcBNBBalance)} USDC $(0.0000)
                            {/* {profileLoading ? (
                            <ReactLoading
                              type='bars'
                              color='#06397e'
                              height={0}
                              width={30}
                              className='loader'
                            />
                          ) : (
                            `${numberFormate(availableBalance)}`
                          )}{' '} */}
                            {/* <span className='txt__gray ms-1'>(~$19,214.261)</span> */}
                          </h6>
                        </div>
                      </div>
                      <form onSubmit={submitDepositLiquidityPool}>
                        <VaultInput
                          price={depositPrice}
                          handlePriceChange={handleDepositPriceChange}
                          errors={balanceError}
                          typeOfToken='USDC'
                        />
                        <div className='liquidity__pool__box__bottom'>
                          {/* <div>
                          <p className='text-danger danger'>
                            Please fund your wallet
                          </p>
                        </div> */}
                        </div>
                        <div className='liquidity__pool__box__btn justify-content-center'>
                          {/* <button
                          disabled={depositErrors}
                          type='submit'
                          className={
                            depositErrors
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                        >
                          Deposit
                        </button> */}

                          <button type='submit' className='btn_brand'>
                            Deposit
                          </button>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={5} xl={4}>
                    <div className='liquidity__pool__box'>
                      <div className='liquidity__pool__box__top'>
                        <h5>In Vault</h5>
                        <div>
                          <p className='txt__gray'>Available balance</p>
                          <h6>
                            {numberFormate(withdrawLpBalance)} LP $(0.0000)
                            {/* {profileLoading ? (
                            <ReactLoading
                              type='bars'
                              color='#06397e'
                              height={0}
                              width={30}
                              className='loader'
                            />
                          ) : (
                            `${numberFormate(availableBalance)}`
                          )}{' '} */}
                            {/* <span className='txt__gray ms-1'>(~$19,214.261)</span> */}
                          </h6>
                        </div>
                      </div>
                      <form onSubmit={submitWithdrawLiquidityPool}>
                        <VaultInput
                          price={withdrawPrice}
                          handlePriceChange={handleWithdrawPriceChange}
                          errors={balanceError}
                          typeOfToken='USDC'
                        />
                        <div className='liquidity__pool__box__bottom'>
                          {/* <div>
                          <p className='text-danger danger'>
                            Please fund your wallet
                          </p>
                        </div> */}
                        </div>
                        <div className='liquidity__pool__box__btn  justify-content-center'>
                          {/* <button
                          disabled={depositErrors}
                          type='submit'
                          className={
                            depositErrors
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                        >
                          Deposit
                        </button> */}

                          <button type='submit' className='btn_brand'>
                            Withdraw
                          </button>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={3} xl={4}>
                    <div className='liquidity__pool__box reward__section'>
                      <h5>Rewards</h5>
                      <h4 className='text-center'>
                        {/* {profileLoading ? (
                        <ReactLoading
                          type='bars'
                          color='#06397e'
                          height={30}
                          width={30}
                          className='m-auto'
                        />
                      ) : (
                        `${numberFormate(caplRewards)}`
                      )}{' '} */}
                        {numberFormate(vaultRewards)} <span>CAPL</span>
                      </h4>
                      {/* <p className='price txt__gray'>~$19,214.261</p> */}
                      <p className='txt__gray'>
                        *Note: Rewards will get deposited to your Wallet
                      </p>
                      <div className='liquidity__pool__box__btn justify-content-center mt-5'>
                        <button
                          disabled={vaultRewards === '0'}
                          className={
                            vaultRewards === '0'
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                          onClick={claimVaultRewards}
                        >
                          Collect
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <h5>In Wallet</h5>
                      <div className='info'>
                        <div className='info_part'>
                          <p>LP Token Price</p>
                          <>$66.00</>
                        </div>
                        <div className='info_part'>
                          <p>Farm Name</p>
                          <p>CAPL</p>
                        </div>
                        <div className='info_part'>
                          <p>Farm Contract</p>
                          <a href='#'>View</a>
                        </div>
                        <div className='info_part'>
                          <p>Vault Contract</p>
                          <a href='#'>View</a>
                        </div>
                        <div className='info_part'>
                          <p>Vault Multiplier</p>
                          <p>110X</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <h5>Fees</h5>
                      <div className='info'>
                        <div className='info_part'>
                          <p>Deposit Fee</p>
                          <p>0.0%</p>
                        </div>
                        <div className='info_part'>
                          <p>Auto-Compound Fee (on profits)</p>
                          <p>0.0%</p>
                        </div>
                        <div className='info_part'>
                          <p>Platform Fee (on profits)</p>
                          <p>0.0%</p>
                        </div>
                        <div className='info_part'>
                          <p>Buyback & Burn Fee (on profits)</p>
                          <p>0.0%</p>
                        </div>
                        <div className='info_part'>
                          <p>Withdraw Fee</p>
                          <p>0.0%</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <h5>APY Calculations</h5>
                      <div className='info'>
                        <div className='info_part'>
                          <p>Farm APY</p>
                          <p>0.0%</p>
                        </div>
                        <div className='info_part'>
                          <p>Optimal Compounds Per Year</p>
                          <p>0</p>
                        </div>
                        <div className='info_part'>
                          <p>CAPL APR</p>
                          <p>160.26%</p>
                        </div>
                        <div className='info_part'>
                          <p>Total APY</p>
                          <p>394.85%</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </section>
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

export default USDCPool
