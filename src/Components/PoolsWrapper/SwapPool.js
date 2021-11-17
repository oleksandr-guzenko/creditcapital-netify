import React, {useEffect, useState} from 'react'
import {Container, Image} from 'react-bootstrap'
import {RiListSettingsLine} from 'react-icons/ri'
import {VscHistory} from 'react-icons/vsc'
import {BiChevronDown} from 'react-icons/bi'
import {BsArrowDown} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import RecentTransactions from '../Modals/RecentTransactions/RecentTransactions'
import SettingsModal from '../Modals/SettingsModal/SettingsModal'
import {useDispatch, useSelector} from 'react-redux'
import {
  convertTokenValue,
  REMOVE_hash,
  swapTokens,
} from '../../Redux/Swap/actions'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import SwapSuccess from '../Modals/SwapModals/SwapSuccess'

// svgs
import USDC from '../../Assets/money/usdc.svg'
import {numberFormate} from '../../Utilities/Util'

const SwapPool = () => {
  // Redux State
  const dispatch = useDispatch()
  const {
    usdcPrice,
    swapHash,
    swapLoading,
    ccptPrice,
    usdcBNBBalance,
    ccptBNBBalance,
  } = useSelector((state) => state.swap)
  const {userAddress} = useSelector((state) => state.profile)
  const [price, setPrice] = useState('')
  const [secondPrice, setSecondPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)
  const [firstToken, setFirstToken] = useState('USDC')
  const [secondToken, setSecondToken] = useState('CCPT')

  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)

  const [firstAvailableForChange, setFirstAvailableForChange] = useState(false)
  const [secondAvailableForChange, setSecondAvailableForChange] =
    useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (time === '') {
      setTime(0)
    }
  }, [time])

  useEffect(() => {
    if (swapLoading) {
      setSwapLoad(true)
    } else {
      setSwapLoad(false)
    }
  }, [swapLoading])

  useEffect(() => {
    if (swapHash) {
      setSwapSucc(true)
      setPrice('')
      setSecondPrice('')
      setTimeout(() => {
        dispatch(REMOVE_hash())
      }, 15000)
    } else {
      setSwapSucc(false)
    }
  }, [swapHash])

  // const handlePriceChange = (number) => {
  //   setPrice(number.value)
  //   dispatch(convertTokenValue(number.value, firstToken))
  //   setFirstAvailableForChange(false)
  //   setSecondAvailableForChange(true)
  // }

  // const handlePriceChangeTwo = (number) => {
  //   setSecondPrice(number.value)
  //   dispatch(convertTokenValue(number.value, firstToken))
  //   setFirstAvailableForChange(true)
  //   setSecondAvailableForChange(false)
  // }
  const handlePriceChange = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
      dispatch(convertTokenValue(value, firstToken))
      setFirstAvailableForChange(false)
      setSecondAvailableForChange(true)
    }
  }

  const handlePriceChangeTwo = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setSecondPrice(value)
      dispatch(convertTokenValue(value, secondToken))
      setFirstAvailableForChange(true)
      setSecondAvailableForChange(false)
    }
  }
  const handleTimeChange = (number) => {
    setTime(number.value)
  }
  const toggleTokens = () => {
    setFirstToken(secondToken)
    setSecondToken(firstToken)
    setToggle((prevState) => !prevState)
    setPrice('')
    setSecondPrice('')
  }
  const setMaximumBalanceOfUSDC = () => {
    const priceRegex = /^[0-9]*\.?[0-9]*$/

    if (usdcBNBBalance === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(usdcBNBBalance)) {
      if (toggle) {
        setSecondPrice(usdcBNBBalance)
      } else {
        setPrice(usdcBNBBalance)
      }
      dispatch(convertTokenValue(usdcBNBBalance, firstToken))
      setFirstAvailableForChange(false)
      setSecondAvailableForChange(true)
    }
  }
  const setMaximumBalanceOfCCPT = () => {
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (ccptBNBBalance === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(ccptBNBBalance)) {
      if (toggle) {
        setPrice(ccptBNBBalance)
      } else {
        setSecondPrice(ccptBNBBalance)
      }
      dispatch(convertTokenValue(ccptBNBBalance, secondToken))
      setFirstAvailableForChange(true)
      setSecondAvailableForChange(false)
    }
  }

  const makeSwap = () => {
    dispatch(swapTokens(price, toggle ? 'CCPT' : 'USDC', time))
  }

  return (
    <>
      <div className='swap'>
        <Container>
          <div className='toggle_buttons'>
            <Link to='/swap'>
              <div className='toggle_wrapper active'>
                <h6>Swap</h6>
              </div>
            </Link>
            <Link to='/liquidity'>
              <div className='toggle_wrapper'>
                <h6>Liquidity</h6>
              </div>
            </Link>
          </div>
          <div className='box_wrapper'>
            <div className='box_wrapper_header'>
              <div className='box_wrapper_header_left'>
                <h1>Swap</h1>
                <p>Instantly swap tokens on Credit Capital</p>
              </div>
              <div className='box_wrapper_header_right'>
                <RiListSettingsLine onClick={() => setOpenSet(true)} />
                <VscHistory onClick={() => setOpenTrans(true)} />
              </div>
            </div>
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Send</h4>
                <h4>
                  Balance:{' '}
                  {firstToken === 'USDC'
                    ? numberFormate(usdcBNBBalance)
                    : firstToken === 'CCPT'
                    ? numberFormate(ccptBNBBalance)
                    : null}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  {/* <NumberFormat
                    disabled={false}
                    thousandsGroupStyle='thousand'
                    value={price}
                    decimalSeparator='.'
                    displayType='input'
                    type='text'
                    thousandSeparator={true}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    allowLeadingZeros={false}
                    decimalScale={4}
                    onValueChange={handlePriceChange}
                    placeholder='0.0000'
                    className='shadow-none form-control'
                  /> */}
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={
                      firstAvailableForChange &&
                      (price != '' || secondPrice != '')
                        ? toggle
                          ? ccptPrice
                          : usdcPrice
                        : price
                    }
                    onChange={handlePriceChange}
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {/* <h4 onClick={setMaximumBalanceOfUSDC}>MAX</h4> */}
                  {firstToken === 'USDC' && <Image src={USDC} alt='' />}
                  <h4>
                    {firstToken}{' '}
                    <span>
                      <BiChevronDown />
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className='box_wrapper_circle' onClick={toggleTokens}>
              <BsArrowDown />
            </div>
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Receive (estimated)</h4>
                <h4>
                  Balance:{' '}
                  {secondToken === 'CCPT'
                    ? numberFormate(ccptBNBBalance)
                    : secondToken === 'USDC'
                    ? numberFormate(usdcBNBBalance)
                    : null}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  {/* <NumberFormat
                    disabled={false}
                    thousandsGroupStyle='thousand'
                    value={secondPrice}
                    decimalSeparator='.'
                    displayType='input'
                    type='text'
                    thousandSeparator={true}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    allowLeadingZeros={false}
                    decimalScale={4}
                    onValueChange={handlePriceChangeTwo}
                    placeholder='0.0000'
                    className='shadow-none form-control'
                  /> */}
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={
                      secondAvailableForChange &&
                      (price != '' || secondPrice != '')
                        ? toggle
                          ? usdcPrice
                          : ccptPrice
                        : secondPrice
                    }
                    onChange={handlePriceChangeTwo}
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {/* <h4 onClick={setMaximumBalanceOfCCPT}>MAX</h4> */}
                  {secondToken === 'USDC' && <Image src={USDC} alt='' />}
                  <h4>
                    {secondToken}{' '}
                    <span>
                      <BiChevronDown />
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className='box_wrapper_button'>
              <button
                className={
                  !userAddress ? 'btn_brand btn_brand_disabled' : 'btn_brand'
                }
                disabled={!userAddress}
                onClick={makeSwap}
              >
                Swap
              </button>
            </div>
          </div>
        </Container>
      </div>
      <RecentTransactions
        show={openTrans}
        handleClose={() => setOpenTrans(false)}
      />
      <SettingsModal
        handleTimeChange={handleTimeChange}
        time={time}
        show={openSet}
        handleClose={() => setOpenSet(false)}
      />
      <SwapLoading show={swapLoad} handleClose={() => setSwapLoad(false)} />
      <SwapSuccess
        show={swapSucc}
        handleClose={() => {
          setSwapSucc(false)
          dispatch(REMOVE_hash())
        }}
      />
    </>
  )
}

export default SwapPool
