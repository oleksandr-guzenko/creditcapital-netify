import React, {useEffect, useState} from 'react'
import {Container, Modal} from 'react-bootstrap'
import {BiChevronDown} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import {RiListSettingsLine} from 'react-icons/ri'
import {VscHistory} from 'react-icons/vsc'
import {useDispatch, useSelector} from 'react-redux'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import SettingsModal from '../SettingsModal/SettingsModal'
import SwapLoading from '../SwapModals/SwapLoading'
import SwapSuccess from '../SwapModals/SwapSuccess'

// svgs
import USDCSVG from '../../../Assets/money/usdc.svg'
import CCPTSVG from '../../../Assets/portfolio/card_three.svg'
import {numberFormate} from '../../../Utilities/Util'
import {
  clearHashValues,
  getUSDCAndCCPTBalance,
  transformTokens,
} from '../../../Redux/Vault/action'
import VaultSuccess from './VaultSuccess'
import {convertTokenValue} from '../../../Redux/Swap/actions'

const TransformModal = ({show, handleClose}) => {
  // Redux State
  const dispatch = useDispatch()
  const {usdcBNBBalance, ccptBNBBalance} = useSelector((state) => state.swap)
  const {usdcPrice, ccptPrice} = useSelector((state) => state.swap)
  const {vaultHash, vaultLoading} = useSelector((state) => state.vault)
  const {userAddress} = useSelector((state) => state.profile)
  const {usdc_ccpt_Balance} = useSelector((state) => state.vault)

  const [price, setPrice] = useState('')
  const [secondPrice, setSecondPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const [tokenType, setTokenType] = useState('usdcToken')

  const handlePriceChange = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
      dispatch(
        convertTokenValue(
          value / 2,
          tokenType === 'usdcToken'
            ? 'USDC'
            : tokenType === 'ccptToken'
            ? 'CAPL'
            : null
        )
      )
      // dispatch(getUSDCAndCCPTBalance(value, tokenType))
      // setFirstAvailableForChange(false)
      // setSecondAvailableForChange(true)
    }
  }

  // const handlePriceChangeTwo = (e) => {
  //   const {value} = e.target
  //   const priceRegex = /^[0-9]*\.?[0-9]*$/
  //   if (value === '') {
  //     setPrice('')
  //     setSecondPrice('')
  //   } else if (priceRegex.test(value)) {
  //     setSecondPrice(value)
  //     dispatch(getUSDCAndCCPTBalance(value, tokenType))
  //     // setFirstAvailableForChange(true)
  //     // setSecondAvailableForChange(false)
  //   }
  // }
  const handleTimeChange = (number) => {
    setTime(number.value)
  }

  const selectTokenType = (e) => {
    setTokenType(e.target.value)
    setPrice('')
  }

  const makeTransform = () => {
    dispatch(transformTokens(price, tokenType, time))
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
      setPrice('')
      setSecondPrice('')
      setTimeout(() => {
        dispatch(clearHashValues())
      }, 15000)
    } else {
      setSwapSucc(false)
    }
  }, [vaultHash])

  return (
    <Modal
      className='buy__token__modal successModal'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>Transform Tokens</h4>
          </div>
          <div className='buy__cpt__header__close' onClick={handleClose}>
            <CgClose />
          </div>
        </div>
        <div className='success__body'>
          <>
            <div className='swap transform'>
              <Container>
                <div className='box_wrapper'>
                  <div className='box_wrapper_header'>
                    <div className='box_wrapper_header_left'>
                      {/* <h1>Add Liquidity</h1>
                      <p>Instantly swap tokens on Credit Capital</p> */}
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
                        {tokenType === 'usdcToken'
                          ? numberFormate(usdcBNBBalance)
                          : tokenType === 'ccptToken'
                          ? numberFormate(ccptBNBBalance)
                          : 0}
                      </h4>
                    </div>
                    <div className='box_wrapper_container_bottom'>
                      <div className='box_wrapper_container_bottom_left'>
                        <input
                          placeholder='0.0000'
                          className='shadow-none form-control'
                          value={price}
                          onChange={handlePriceChange}
                        />
                      </div>
                      <div className='box_wrapper_container_bottom_right'>
                        {/* <h4 onClick={setMaximumBalanceOfUSDC}>MAX</h4> */}
                        {/* {firstToken === 'USDC' && <Image src={USDC} alt='' />} */}
                        <select name='' id='' onChange={selectTokenType}>
                          <option value='usdcToken'>USDC</option>
                          <option value='ccptToken'>CAPL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h6>Receive (Estimated)</h6>
                  <div className='box_wrapper_container'>
                    <div className='box_wrapper_container_top'>
                      <h4>
                        <span>
                          <img src={USDCSVG} alt='' />
                        </span>{' '}
                        USDC
                      </h4>
                      <h4>
                        {price === ''
                          ? 0
                          : tokenType === 'usdcToken'
                          ? numberFormate(price / 2)
                          : tokenType === 'ccptToken'
                          ? numberFormate(usdcPrice)
                          : 0}
                      </h4>
                    </div>
                  </div>
                  <div className='box_wrapper_container'>
                    <div className='box_wrapper_container_top'>
                      <h4>
                        <span>
                          <img src={CCPTSVG} alt='' />
                        </span>{' '}
                        CAPL
                      </h4>
                      <h4>
                        {price === ''
                          ? 0
                          : tokenType === 'ccptToken'
                          ? numberFormate(price / 2)
                          : tokenType === 'usdcToken'
                          ? numberFormate(ccptPrice)
                          : 0}
                      </h4>
                    </div>
                  </div>
                  <div className='box_wrapper_container'>
                    <div className='box_wrapper_container_top'>
                      <h4>
                        <span>
                          <img src={USDCSVG} alt='' />
                          <img src={CCPTSVG} alt='' />
                        </span>{' '}
                        USDC-CAPL
                      </h4>
                      <h4>
                        {price === ''
                          ? 0
                          : tokenType === 'usdcToken'
                          ? numberFormate(price / 2 + Number(ccptPrice))
                          : tokenType === 'ccptToken'
                          ? numberFormate(price / 2 + Number(usdcPrice))
                          : 0}
                      </h4>
                    </div>
                  </div>

                  <div className='box_wrapper_button'>
                    <button
                      className={
                        !userAddress || price === ''
                          ? 'btn_brand btn_brand_disabled'
                          : 'btn_brand'
                      }
                      disabled={!userAddress}
                      onClick={makeTransform}
                    >
                      Create LP
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
            <SwapLoading
              show={swapLoad}
              handleClose={() => setSwapLoad(false)}
            />
            <VaultSuccess
              show={swapSucc}
              handleClose={() => {
                setSwapSucc(false)
                dispatch(clearHashValues())
              }}
            />
          </>
        </div>
      </div>
    </Modal>
  )
}

export default TransformModal
