import React, {useEffect, useState} from 'react'
import {Col, Collapse, Container, Image, Row} from 'react-bootstrap'
import {BiPlay} from 'react-icons/bi'
import {GoChevronDown, GoChevronUp} from 'react-icons/go'
import TransformModal from '../Modals/Vaults/TransformModal'
import VaultInput from './VaultInput'
import ReactLoading from 'react-loading'

// svgs
import USDCSVG from '../../Assets/money/usdc.svg'
import CCPTSVG from '../../Assets/portfolio/card_three.svg'
import {useDispatch, useSelector} from 'react-redux'
import {
  clearHashValues,
  vaultDepositAndWithdrawTokens,
} from '../../Redux/Vault/action'
import {numberFormate, numberFormateWithoutDecimals} from '../../Utilities/Util'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import VaultSuccess from '../Modals/Vaults/VaultSuccess'
import ConvertLpModal from '../Modals/Vaults/ConvertLpModal'

const LpPools = () => {
  //redux
  const dispatch = useDispatch()
  const {userAddress} = useSelector((state) => state.profile)
  const {usdcBNBBalance, caplPrice, balanceLoading, ccptBNBBalance} =
    useSelector((state) => state.swap)
  const {
    vaultHash,
    vaultLoading,
    depositedLpBalance,
    vaultRewards,
    withdrawLpBalance,
    apy,
    totalLp,
    LpTokenPrice,
  } = useSelector((state) => state.vault)

  const [open, setOpen] = useState(true)
  const [depositPrice, setDepositPrice] = useState('')
  const [depositErrors, setDepositErrors] = useState(false)
  const [depositUSDCErrors, setDepositUSDCErrors] = useState(false)
  const [depositCAPLErrors, setDepositCAPLErrors] = useState(false)
  const [typeOfDeposit, setTypeOfDeposit] = useState('USDC-CAPL')
  const [digit, setDigits] = useState(18)

  // ErrorState
  const [balanceError, setBalanceError] = useState(false)
  const [withdrawPrice, setWithdrawPrice] = useState('')
  const [withdrawErrors, setWithdrawErrors] = useState(false)

  // loading
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)

  useEffect(() => {
    setDepositPrice('')
    typeOfDeposit === 'USDC-CAPL'
      ? setDigits(18)
      : typeOfDeposit === 'USDC'
      ? setDigits(4)
      : typeOfDeposit === 'CAPL'
      ? setDigits(4)
      : setDigits(18)
  }, [typeOfDeposit])

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
    } else {
      setSwapSucc(false)
    }
  }, [vaultHash])
  // ################

  // useEffect(() => {
  //   if (userAddress) {
  //     dispatch(getDepositedBalance())
  //   }
  // }, [userAddress])

  // Deposit
  const handleDepositPriceChange = (number) => {
    setDepositPrice(number.value)
  }
  const submitDepositLiquidityPool = (e) => {
    e.preventDefault()
    dispatch(
      vaultDepositAndWithdrawTokens(
        depositPrice,
        typeOfDeposit === 'USDC-CAPL'
          ? 'deposit'
          : typeOfDeposit === 'USDC'
          ? 'usdcDeposit'
          : typeOfDeposit === 'CAPL'
          ? 'caplDeposit'
          : ''
      )
    )
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

  // transform
  const [transformModal, setTransformModal] = useState(false)

  const [convertModal, setConvertModal] = useState(false)

  useEffect(() => {
    if (typeOfDeposit === 'USDC-CAPL') {
      if (
        depositPrice === '' ||
        depositedLpBalance === '0' ||
        !userAddress ||
        Number(depositPrice) > Number(depositedLpBalance)
      ) {
        setDepositErrors(true)
      } else {
        setDepositErrors(false)
      }
    } else if (typeOfDeposit === 'USDC') {
      if (
        depositPrice === '' ||
        usdcBNBBalance === '0' ||
        !userAddress ||
        Number(depositPrice) > Number(usdcBNBBalance)
      ) {
        setDepositUSDCErrors(true)
      } else {
        setDepositUSDCErrors(false)
      }
    } else if (typeOfDeposit === 'CAPL') {
      if (
        depositPrice === '' ||
        ccptBNBBalance === '0' ||
        !userAddress ||
        Number(depositPrice) > Number(ccptBNBBalance)
      ) {
        setDepositCAPLErrors(true)
      } else {
        setDepositCAPLErrors(false)
      }
    }
  }, [
    usdcBNBBalance,
    ccptBNBBalance,
    userAddress,
    depositedLpBalance,
    depositPrice,
    typeOfDeposit,
    balanceLoading,
  ])

  useEffect(() => {
    if (
      !userAddress ||
      withdrawLpBalance === '0' ||
      withdrawPrice === '' ||
      Number(withdrawPrice) > Number(withdrawLpBalance)
    ) {
      setWithdrawErrors(true)
    } else {
      setWithdrawErrors(false)
    }
  }, [userAddress, withdrawLpBalance, withdrawPrice])

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
                  <Image src={CCPTSVG} alt='' className='img_sec' />
                </div>
                <div className='header_wrapper_right'>
                  <h4>USDC-CAPL Liquidity Pool</h4>
                </div>
              </div>
              <div className='header_wrapper'>
                <h4>{numberFormate(apy)}%</h4>
                <p>APY</p>
              </div>
              <div className='header_wrapper'>
                <h4>
                  {numberFormate(totalLp)} (${' '}
                  {numberFormate((totalLp / 100000000) * LpTokenPrice)} USD)
                </h4>
                <p>Total Value Locked in Vault</p>
              </div>
              {/* <div className='header_wrapper'>
                <h4>$0.00</h4>
              </div> */}
              <div className='header_wrapper'>
                {open ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <Collapse in={open}>
              <div className='lpWrapper' id='collapse-div'>
                <h6 style={{color: 'white'}}>
                  1 LP Token = 100,000,000 Shares
                </h6>
                <Row>
                  <Col className='mb-3' sm={12} md={12} lg={5} xl={4}>
                    <div className='liquidity__pool__box'>
                      <div className='liquidity__pool__box__top'>
                        <h5>
                          {typeOfDeposit}{' '}
                          {typeOfDeposit === 'USDC-CAPL'
                            ? 'Liquidity Pool'
                            : ''}
                        </h5>
                        <div>
                          <p className='txt__gray'>Available Balance</p>
                          <h6
                            className='lolsscsd'
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                              setDepositPrice(
                                typeOfDeposit === 'USDC-CAPL'
                                  ? depositedLpBalance
                                  : typeOfDeposit === 'USDC'
                                  ? usdcBNBBalance
                                  : typeOfDeposit === 'CAPL'
                                  ? ccptBNBBalance
                                  : ''
                              )
                            }
                          >
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='_one'
                              />
                            ) : typeOfDeposit === 'USDC-CAPL' ? (
                              `${depositedLpBalance} LP Shares $(${numberFormate(
                                (depositedLpBalance * LpTokenPrice) / 100000000
                              )})`
                            ) : typeOfDeposit === 'USDC' ? (
                              `${numberFormate(
                                usdcBNBBalance
                              )} USDC Token Balance $(${numberFormate(
                                usdcBNBBalance * caplPrice
                              )})`
                            ) : typeOfDeposit === 'CAPL' ? (
                              `${numberFormate(
                                ccptBNBBalance
                              )} CAPL Token Balance $(${numberFormate(
                                ccptBNBBalance * caplPrice
                              )})`
                            ) : (
                              ''
                            )}
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
                          typeOfDeposit={typeOfDeposit}
                          setTypeOfDeposit={setTypeOfDeposit}
                          deposit={true}
                          digits={digit}
                        />
                        <div className='liquidity__pool__box__bottom'>
                          {/* <div>
                          <p className='text-danger danger'>
                            Please fund your wallet
                          </p>
                        </div> */}
                        </div>
                        <div
                          className={
                            typeOfDeposit === 'USDC-CAPL'
                              ? 'liquidity__pool__box__btn'
                              : 'liquidity__pool__box__btn justify-content-center'
                          }
                        >
                          {typeOfDeposit === 'USDC-CAPL' && (
                            <a
                              style={{cursor: 'pointer'}}
                              onClick={() => setTransformModal(true)}
                              className='btn_brand'
                            >
                              Transform
                            </a>
                          )}
                          <button
                            type='submit'
                            className={
                              typeOfDeposit === 'USDC-CAPL'
                                ? depositErrors
                                  ? 'btn_brand btn_brand_disabled'
                                  : 'btn_brand'
                                : typeOfDeposit === 'USDC'
                                ? depositUSDCErrors
                                  ? 'btn_brand btn_brand_disabled'
                                  : 'btn_brand'
                                : typeOfDeposit === 'CAPL'
                                ? depositCAPLErrors
                                  ? 'btn_brand btn_brand_disabled'
                                  : 'btn_brand'
                                : ''
                            }
                            disabled={
                              typeOfDeposit === 'USDC-CAPL'
                                ? depositErrors
                                : typeOfDeposit === 'USDC'
                                ? depositUSDCErrors
                                : typeOfDeposit === 'CAPL'
                                ? depositCAPLErrors
                                : false
                            }
                          >
                            Deposit
                          </button>
                        </div>
                      </form>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <div className='liquidity__pool__box__top'>
                        <h5>USDC-CAPL Reward Vault</h5>
                        <div>
                          <p className='txt__gray'>USDC-CAPL LP Shares</p>
                          <h6
                            className='lolsscsd'
                            style={{cursor: 'pointer'}}
                            onClick={() => setWithdrawPrice(withdrawLpBalance)}
                          >
                            {balanceLoading ? (
                              <ReactLoading
                                type='bars'
                                color='#ffffff'
                                height={0}
                                width={30}
                                className='_one'
                              />
                            ) : (
                              `${withdrawLpBalance} LP Shares $(${numberFormate(
                                (withdrawLpBalance * LpTokenPrice) / 100000000
                              )})`
                            )}

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
                          digits={18}
                        />
                        <div className='liquidity__pool__box__bottom'>
                          {/* <div>
                          <p className='text-danger danger'>
                            Please fund your wallet
                          </p>
                        </div> */}
                        </div>
                        <div className='liquidity__pool__box__btn'>
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

                          <a
                            style={{cursor: 'pointer'}}
                            onClick={() => setConvertModal(true)}
                            className='btn_brand'
                          >
                            Convert
                          </a>

                          <button
                            type='submit'
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
                  <Col className='mb-3' sm={12} md={12} lg={3} xl={4}>
                    <div className='liquidity__pool__box reward__section'>
                      <h5>My Rewards</h5>
                      <h4 className='text-center' style={{fontSize: '14px'}}>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='m-auto mt-4'
                          />
                        ) : (
                          `${vaultRewards} CAPL`
                        )}
                      </h4>
                      <h4 className='text-center' style={{fontSize: '14px'}}>
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='m-auto mt-4'
                          />
                        ) : (
                          `$ ${vaultRewards * caplPrice} USD`
                        )}
                      </h4>
                      {/* <p className='price txt__gray'>~$19,214.261</p> */}
                      {/* <p className='txt__gray'>
                        *Note: Rewards will get deposited to your Wallet
                      </p> */}
                      <div className='liquidity__pool__box__btn justify-content-center mt-5'>
                        <button
                          disabled={vaultRewards === '0' || !userAddress}
                          className={
                            vaultRewards === '0' || !userAddress
                              ? 'btn_brand btn_brand_disabled'
                              : 'btn_brand'
                          }
                          onClick={claimVaultRewards}
                        >
                          Claim
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <h5>Liquidity Pool Details</h5>
                      <div className='info'>
                        {/* <div className='info_part'>
                          <p>LP Share Price</p>
                          <>$66.00</>
                        </div> */}
                        <div className='info_part'>
                          <p>Pool Name</p>
                          <p>USDC-CAPL</p>
                        </div>
                        {/* <div className='info_part'>
                          <p>Farm Contract</p>
                          <a href='#'>View</a>
                        </div> */}
                        <div className='info_part'>
                          <p>Vault Contract</p>
                          <a
                            target='_blank'
                            href='https://polygonscan.com/address/0xFcB66EEDa88865B0d8aa9c3b51E7db6078E8c948'
                          >
                            View
                          </a>
                        </div>
                        <div className='info_part'>
                          <p>Vault Rewards</p>
                          <p>5000 CAPL/day</p>
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
                          <p>1%</p>
                        </div>
                        {/* <div className='info_part'>
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
                        </div> */}
                        <div className='info_part'>
                          <p>Withdraw Fee</p>
                          <p>1%</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className='mb-3' sm={12} md={12} lg={4} xl={4}>
                    <div className='liquidity__pool__box'>
                      <h5>Reward Vault Yield</h5>
                      <div className='info'>
                        {/* <div className='info_part'>
                          <p>Total APY</p>
                          <p>{numberFormate(apy)}%</p>
                        </div>
                        <div className='info_part'>
                          <p>Optimal Compounds Per Year</p>
                          <p>0</p>
                        </div>
                        <div className='info_part'>
                          <p>CAPL APR</p>
                          <p>160.26%</p>
                        </div> */}
                        <div className='info_part'>
                          <p>Total APY</p>
                          <p>{numberFormate(apy)}%</p>
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
      <TransformModal
        show={transformModal}
        handleClose={() => setTransformModal(false)}
      />
      <ConvertLpModal
        show={convertModal}
        handleClose={() => setConvertModal(false)}
      />
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

export default LpPools
