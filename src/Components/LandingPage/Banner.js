import React, {useEffect, useState} from 'react'
import {Col, Container, Image, Row} from 'react-bootstrap'
import {v4 as uuid} from 'uuid'
import ReactLoading from 'react-loading'
import {useLocation} from 'react-router-dom'

//
import LiquidityInput from './LiquidityInput'
import LoadingModal from '../Modals/LoadingModal'
import SuccessMessage from '../Modals/SuccessMessage'
import {useDispatch} from 'react-redux'
import {
  clearHis,
  totalTreasuryAmount,
  treasuryInfo,
  treasuryWalletAction,
} from '../../Redux/Root/actions'

// icon Images
import ImgOne from '../../Assets/Investor/one__inv.svg'
import ImgTwo from '../../Assets/Investor/money__in.svg'
import ImgThree from '../../Assets/Investor/token.svg'
import ImgFour from '../../Assets/Investor/medal__inv.svg'
import ImgFive from '../../Assets/Investor/Token_burned.svg'

//
import {useSelector} from 'react-redux'
import {numberFormate} from '../../Utilities/Util'
// import {checkAndAddNetwork} from '../../Redux/Profile/actions'

const Banner = () => {
  const {pathname} = useLocation()
  const [showSection, setShowSection] = useState(false)

  //

  const dispatch = useDispatch()
  const {
    loading,
    depositedAmount,
    depositedLoading,
    tranHash,
    totalDepositedAmount,
    totalDepositedLoading,
  } = useSelector((state) => state.root)
  const {userAddress} = useSelector((state) => state.profile)
  const [depositPrice, setDepositPrice] = useState('')
  const [showLoader, setShowLoader] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (tranHash) {
      setShowSuccess(true)
    } else {
      setShowSuccess(false)
    }
  }, [tranHash])

  useEffect(() => {
    if (userAddress) {
      dispatch(treasuryInfo())
    }
  }, [userAddress])
  // useEffect(() => {
  //   dispatch(totalTreasuryAmount())
  // }, [tranHash])

  useEffect(() => {
    dispatch(totalTreasuryAmount())
    // dispatch(checkAndAddNetwork())
  }, [])
  useEffect(() => {
    if (tranHash) {
      setTimeout(() => {
        clearTransactionHis()
      }, 15000)
    }
  }, [tranHash])

  const clearTransactionHis = () => {
    setShowSuccess(false)
    dispatch(clearHis())
  }

  const handleDepositPriceChange = (number) => {
    setDepositPrice(number.value)
  }
  const submitDepositLiquidityPool = (e) => {
    e.preventDefault()
    dispatch(treasuryWalletAction(depositPrice))
  }

  //
  useEffect(() => {
    if (
      pathname === '/credit_guaranty_pool' ||
      pathname === '/trustee_credit_guaranty_pool'
    ) {
      setShowSection(true)
    } else {
      setShowSection(false)
    }
  }, [pathname])

  const box__info = [
    {
      id: uuid(),
      title: 'Capital Pool Locked',
      price: '$12,580,524.22',
      titleTwo: 'APY',
      percentage: '8.7%',
    },
    {
      id: uuid(),
      title: 'Excess Liquidity',
      price: '$11,530,524.22',
    },
    {
      id: uuid(),
      title: 'Loan Funds',
      price: '$82,580,524.22',
    },
  ]
  return (
    <>
      <div className='banner'>
        <div className='section__two'>
          <Container>
            <div className='box__wrapper banner__two__box text-center treasury'>
              <Row>
                <Col xl={6} lg={6}>
                  <form
                    onSubmit={submitDepositLiquidityPool}
                    className='treasury'
                  >
                    <h5 className='mb-4'>Send Amount to Treasury Wallet</h5>
                    <LiquidityInput
                      price={depositPrice}
                      handlePriceChange={handleDepositPriceChange}
                      typeOfToken='USDC'
                    />
                    <button
                      className={
                        userAddress
                          ? 'btn_brand mt-3'
                          : 'btn_brand mt-3 btn_brand_disabled'
                      }
                    >
                      Deposit
                    </button>
                  </form>
                </Col>
                <Col xl={3} lg={3} md={6}>
                  <Image src={ImgTwo} alt='' className='mb-3' />
                  <h5>
                    {depositedLoading ? (
                      <ReactLoading
                        type='bars'
                        color='#06397e'
                        height={30}
                        width={30}
                        className='m-auto'
                      />
                    ) : (
                      `$${numberFormate(depositedAmount)}`
                    )}
                  </h5>
                  <p className='txt__gray'>Funds deposited By User</p>
                </Col>
                <Col xl={3} lg={3} md={6}>
                  <Image src={ImgOne} alt='' className='mb-3' />
                  <h5>
                    {totalDepositedLoading ? (
                      <ReactLoading
                        type='bars'
                        color='#06397e'
                        height={30}
                        width={30}
                        className='m-auto'
                      />
                    ) : (
                      `$${numberFormate(totalDepositedAmount)}`
                    )}
                  </h5>
                  <p className='txt__gray'>
                    Total Funds deposited in Treasury wallet
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className='section__two'>
          <Container>
            <Row>
              <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                <div className='box__wrapper one__Sec'>
                  <Row>
                    <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                      <div className='banner__two__box'>
                        <Image src={ImgOne} alt='' className='mb-3' />
                        <h5>$11,530,524.22</h5>
                        <p className='txt__gray'>Circulating Supply</p>
                      </div>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                      <div className='banner__two__box'>
                        <Image src={ImgTwo} alt='' className='mb-3' />
                        <h5>$82,580,524.22</h5>
                        <p className='txt__gray'>Token Capitalization</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                <Row>
                  <Col
                    xl={showSection ? 4 : 6}
                    lg={showSection ? 4 : 6}
                    md={showSection ? 4 : 6}
                    sm={showSection ? 4 : 6}
                    xs={12}
                  >
                    <div className='banner__two__box box__wrapper separate__Sec'>
                      <Image src={ImgThree} alt='' className='mb-3' />
                      <h5>$2.00</h5>
                      <p className='txt__gray'>Capital Token Price</p>
                    </div>
                  </Col>
                  {showSection && (
                    <Col xl={4} lg={4} md={4} sm={4} xs={12}>
                      <div className='banner__two__box box__wrapper separate__Sec'>
                        <Image src={ImgFive} alt='' className='mb-3' />
                        <h5>4493.00</h5>
                        <p className='txt__gray'>Credit Tokens Burned</p>
                      </div>
                    </Col>
                  )}
                  <Col
                    xl={showSection ? 4 : 6}
                    lg={showSection ? 4 : 6}
                    md={showSection ? 4 : 6}
                    sm={showSection ? 4 : 6}
                    xs={12}
                  >
                    <div className='banner__two__box box__wrapper separate__Sec'>
                      <Image src={ImgFour} alt='' className='mb-3' />
                      <h5>25493.00</h5>
                      <p className='txt__gray'>Total Platform Rewards</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className='section__one'>
          <Container>
            <Row>
              {box__info?.map((info) => (
                <Col xl={4} lg={4} md={4} sm={12} xs={12} key={info?.id}>
                  <div className='banner__one__box'>
                    <div className='banner__one__box__left'>
                      <p className='txt__gray'>{info?.title}</p>
                      <h5>{info?.price}</h5>
                    </div>
                    {info?.titleTwo && (
                      <div>
                        <p className='txt__gray'>{info?.titleTwo}</p>
                        <h5>{info?.percentage}</h5>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      {loading && (
        <LoadingModal
          show={showLoader}
          handleClose={() => setShowLoader(false)}
        />
      )}
      <SuccessMessage
        show={showSuccess}
        handleClose={() => clearTransactionHis()}
      />
    </>
  )
}

export default Banner
