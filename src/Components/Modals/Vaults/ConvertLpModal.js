import React, {useEffect, useState} from 'react'
import {Container, Modal} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'
import {RiListSettingsLine} from 'react-icons/ri'
import {useDispatch, useSelector} from 'react-redux'
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import SettingsModal from '../SettingsModal/SettingsModal'
import SwapLoading from '../SwapModals/SwapLoading'
import ReactLoading from 'react-loading'

// svgs

import {numberFormate} from '../../../Utilities/Util'
import {clearHashValues, removeLpAction} from '../../../Redux/Vault/action'
import VaultSuccess from './VaultSuccess'

const ConvertLpModal = ({show, handleClose}) => {
  // Redux State
  const dispatch = useDispatch()
  const {usdcBNBBalance, balanceLoading, ccptBNBBalance} = useSelector(
    (state) => state.swap
  )
  const {vaultHash, vaultLoading} = useSelector((state) => state.vault)
  const {userAddress} = useSelector((state) => state.profile)
  const {depositedLpBalance, totalSup, reserves} = useSelector(
    (state) => state.vault
  )

  const [price, setPrice] = useState('')
  const [secondPrice, setSecondPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)
  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const [tokenType, setTokenType] = useState('usdcToken')
  const [usdc_capl, setUsdc_capl] = useState(0)

  const handlePriceChange = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
    }
  }

  //   useEffect(() => {
  //     if (tokenType === 'usdcToken') {
  //       const res =
  //         Number(totalSup) * (Number(ccptPrice) / Number(reserves?._reserve0))
  //       setUsdc_capl(res)
  //     } else if (tokenType === 'ccptToken') {
  //       const res =
  //         Number(totalSup) * (Number(price / 2) / Number(reserves?._reserve0))
  //       setUsdc_capl(res)
  //     }
  //   }, [totalSup, ccptPrice, reserves, price, reserves?._reserve0])

  // const handlePriceChangeTwo = (e) => {
  //   const {value} = e.target
  //   const priceRegex = /^[0-9]*\.?[0-9]*$/
  //   if (value === '') {
  //     setPrice('')
  //     setSecondPrice('')
  //   } else if (priceRegex.test(value)) {
  //     setSecondPrice(value)
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

  const submitConvertLp = () => {
    dispatch(removeLpAction(price, time))
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
    } else {
      setSwapSucc(false)
    }
  }, [vaultHash])

  const [errorOne, setErrorOne] = useState(false)

  //   useEffect(() => {
  //     if (tokenType === 'usdcToken') {
  //       if (Number(price) > Number(usdcBNBBalance)) {
  //         setErrorOne(true)
  //       } else {
  //         setErrorOne(false)
  //       }
  //     } else if (tokenType === 'ccptToken') {
  //       if (Number(price) > Number(ccptBNBBalance)) {
  //         setErrorOne(true)
  //       } else {
  //         setErrorOne(false)
  //       }
  //     }
  //   }, [price, usdcBNBBalance, ccptBNBBalance, tokenType])

  return (
    <Modal
      className='buy__token__modal successModal'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>Convert Tokens</h4>
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
                      {/* <VscHistory onClick={() => setOpenTrans(true)} /> */}
                    </div>
                  </div>
                  <div className='box_wrapper_container'>
                    <div className='box_wrapper_container_top'>
                      <h4>Convert</h4>
                      <h4 className='d-flex align-items-start'>
                        Balance:{' '}
                        {balanceLoading ? (
                          <ReactLoading
                            type='bars'
                            color='#ffffff'
                            height={0}
                            width={30}
                            className='load'
                          />
                        ) : (
                          depositedLpBalance
                        )}
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
                        USDC-CAPL
                      </div>
                    </div>
                  </div>
                  <div className='box_wrapper_button'>
                    <button
                      className={
                        !userAddress || price === '' || errorOne
                          ? 'btn_brand btn_brand_disabled'
                          : 'btn_brand'
                      }
                      disabled={!userAddress || price === '' || errorOne}
                      onClick={submitConvertLp}
                    >
                      Convert LP
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

export default ConvertLpModal
