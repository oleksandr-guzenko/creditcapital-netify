import React, {useEffect, useState} from 'react'
import ReactLoading from 'react-loading'
import {CgClose} from 'react-icons/cg'
import {Form, Image, InputGroup, Modal} from 'react-bootstrap'
import Select, {components} from 'react-select'
import {BsFillPlayFill, BsArrowDown} from 'react-icons/bs'
import NumberFormat from 'react-number-format'

import {numberFormate} from '../../../Utilities/Util'

// images
import USDC from '../../../Assets/money/usdc.svg'

// redux imports
import {useSelector, useDispatch} from 'react-redux'
import {reserveCPTAndCRT} from '../../../Redux/BuyCAPTAndCRET/actions'

const ReserveToken = ({show, handleClose, name}) => {
  const dispatch = useDispatch()
  // const [selectedValue, setSelectedValue] = useState('')
  const [price, setPrice] = useState('')
  const [CPT, setCPT] = useState('')
  const [balanceError, setBalanceError] = useState(false)
  const [availableBalanceError, setAvailableBalanceError] = useState(false)

  // Redux State
  const {hashID, error} = useSelector((state) => state.buyTokens)

  const {userAddress} = useSelector((state) => state.profile)

  const {testUSDC: availableBalance, testProfileLoading: profileLoading} =
    useSelector((state) => state.testProfile)

  // select
  // const {Option} = components
  // const options = [
  //   {
  //     value: 'USDC',
  //     label: (
  //       <div className='d-flex align-items-center justify-content-between'>
  //         <img src={USDC} height='18px' width='18px' alt='' />
  //         <h6 className='mb-0' style={{fontSize: '12px', marginLeft: '3px'}}>
  //           USDC
  //         </h6>
  //       </div>
  //     ),
  //   },
  // ]

  // const CaretDownIcon = () => {
  //   return <BsFillPlayFill className='play-down' />
  // }

  // const DropdownIndicator = (props) => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <CaretDownIcon />
  //     </components.DropdownIndicator>
  //   )
  // }

  // const handleChange = (selectedOption) => {
  //   setSelectedValue(selectedOption.value)
  // }

  const handlePriceChange = (num) => {
    setPrice(num.value)
    setCPT(num.value)

    // const priceRegex = /^[0-9-+()]*$/
    // const priceRegex = /^[0-9]*\.?[0-9]*$/
    // if (priceRegex.test(e.target.value)) {
    //   setPrice(e.target.value)
    //   const bonus = Number(e.target.value) / 2
    //   if (isNaN(bonus)) {
    //     setCPT('')
    //   } else {
    //     setCPT((Number(e.target.value) + bonus)?.toFixed(2))
    //   }
    // }
  }
  // form
  const buyTokenHandler = (e) => {
    e.preventDefault()
    if (price && userAddress && CPT) {
      dispatch(
        reserveCPTAndCRT(
          price,
          CPT,
          name === 'Buy CAPL' ? 'CAPL' : name === 'Buy CRET' ? 'CRET' : null
        )
      )
    }
  }

  useEffect(() => {
    setPrice('')
    setCPT('')
  }, [hashID, error])

  // const setMaximumBalance = () => {
  //   // const priceRegex = /^[0-9-+()]*$/
  //   const priceRegex = /^[0-9]*\.?[0-9]*$/
  //   if (name === 'Buy CPT' && maximumCPTBalance) {
  //     // if (priceRegex.test(maximumCPTBalance)) {
  //     //   setPrice(maximumCPTBalance)
  //     //   const bonus = Number(maximumCPTBalance) / 2
  //     //   if (isNaN(bonus)) {
  //     //     setCPT('')
  //     //   } else {
  //     //     setCPT((Number(maximumCPTBalance) + bonus)?.toFixed(2))
  //     //   }
  //     // }
  //     setPrice(maximumCPTBalance)
  //   } else if (name === 'Buy CRT' && maximumCRTBalance) {
  //     setPrice(maximumCRTBalance)
  //   }
  // }

  useEffect(() => {
    if (availableBalance == 0) {
      setAvailableBalanceError(true)
    } else {
      setAvailableBalanceError(false)
    }
  }, [availableBalance])

  // useEffect(() => {
  //   if (name === 'Buy CPT' && availableBalance != 0) {
  //     if (Number(price) <= maximumCPTBalance) {
  //       setBalanceError(false)
  //     } else if (price == '.') {
  //       setBalanceError(false)
  //     } else {
  //       setBalanceError(true)
  //     }
  //   } else if (name === 'Buy CRT' && availableBalance != 0) {
  //     if (Number(price) <= maximumCRTBalance) {
  //       setBalanceError(false)
  //     } else if (price == '.') {
  //       setBalanceError(false)
  //     } else {
  //       setBalanceError(true)
  //     }
  //   } else {
  //     setBalanceError(false)
  //   }
  // }, [name, price, maximumCPTBalance, maximumCRTBalance, availableBalance])

  useEffect(() => {
    setPrice('')
    setCPT('')
  }, [userAddress])

  return (
    <Modal
      className='buy__token__modal'
      show={show}
      onHide={() => {
        handleClose()
        setPrice('')
        setCPT('')
      }}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>{name}</h4>
          </div>
          <div
            className='buy__cpt__header__close'
            onClick={() => {
              handleClose()
              setPrice('')
              setCPT('')
              setBalanceError(false)
            }}
          >
            <CgClose />
          </div>
        </div>
        <div className='buy__cpt__modal__instructions'>
          <div className='buy__cpt__modal__instructions__left'>
            <p className='txt__gray'>Available balance</p>
            <h6>
              {profileLoading ? (
                <ReactLoading
                  type='bars'
                  color='#06397e'
                  height={30}
                  width={30}
                />
              ) : (
                `${numberFormate(availableBalance)}`
              )}
            </h6>
          </div>
          <div className='buy__cpt__modal__instructions__right'>
            <p className='txt__gray'>
              1 USDC : 1 {name === 'Buy CAPL' ? 'CAPL' : 'CRET'}
            </p>
          </div>
        </div>
        <form onSubmit={buyTokenHandler}>
          <div className='price__inputs'>
            <div className='input__wrapper'>
              {/* <Select
                placeholder={'USDC'}
                components={{DropdownIndicator}}
                // value={selectedValue}
                onChange={handleChange}
                options={options}
                isSearchable={false}
                value={options.filter((option) => {
                  return option.value === selectedValue
                })}
              /> */}

              <InputGroup>
                <InputGroup.Text className='border-0 txt__brand cpt'>
                  <Image src={USDC} height='18px' width='18px' alt='' />
                  USDC
                </InputGroup.Text>
                {/* <Form.Control
                  type='tel'
                  disabled={availableBalanceError}
                  value={price}
                  className='shadow-none'
                  placeholder='0.00'
                  onChange={handlePriceChange}
                /> */}
                <NumberFormat
                  disabled={availableBalanceError}
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
                />
                {/* <InputGroup.Text onClick={setMaximumBalance}> */}
                <InputGroup.Text>MAX</InputGroup.Text>
              </InputGroup>
            </div>
            {/* <NumberFormat
              value={12}
              displayType='text'
              thousandSeparator={true}
              onValueChange={Formateer}
            /> */}
            {!profileLoading && availableBalanceError && (
              <p className='text-danger danger'>
                Please fund your wallet with USDC
              </p>
            )}
            {/* {!profileLoading && balanceError && (
              <p className='text-danger danger'>
                You can only reserve upto{' '}
                {name === 'Buy CPT'
                  ? maximumCPTBalance
                  : name === 'Buy CRT'
                  ? maximumCRTBalance
                  : null}{' '}
                USDC Only
              </p>
            )} */}
            <div className='input__wrapper'>
              <InputGroup>
                <InputGroup.Text className='border-0 txt__brand cpt'>
                  {name === 'Buy CAPL' ? 'CAPL' : 'CRET'}
                </InputGroup.Text>
                <Form.Control
                  disabled
                  type='tel'
                  value={numberFormate(CPT)}
                  className='shadow-none'
                  placeholder='0.0000'
                />
              </InputGroup>
            </div>
            <div className='arrow__circle'>
              <BsArrowDown />
            </div>
          </div>
          <div className='buy__btn__wrapper'>
            <button
              className={
                price != 0 && price != '.' && !balanceError
                  ? 'btn_brand'
                  : 'btn_brand btn_brand_disabled'
              }
              type='submit'
            >
              {name}
            </button>
          </div>
          {/* <p className='txt__gray'>
            *Stake you {name === 'Buy CPT' ? 'CPT' : 'CRT'} for 3months to
            get rewards | Buy Period Day1: 50% bonus | Day 2-5: 25% bonus on
            staking
          </p> */}
          {/* <p className='txt__gray'>
            {phase === 0
              ? `Pre ICO 50% Bonus`
              : phase === 1 || phase === 2
              ? `Buy Period Day 1-3: 50% Bonus | Day 4-10: 25% Bonus on Purchasing Tokens`
              : ''}
          </p> */}
        </form>
      </div>
    </Modal>
  )
}

export default ReserveToken
