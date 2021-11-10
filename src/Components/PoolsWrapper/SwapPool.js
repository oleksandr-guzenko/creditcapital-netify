import React, {useState} from 'react'
import {Container, Image} from 'react-bootstrap'
import {RiListSettingsLine} from 'react-icons/ri'
import {VscHistory} from 'react-icons/vsc'
import {BiChevronDown} from 'react-icons/bi'
import {BsArrowDown} from 'react-icons/bs'
import NumberFormat from 'react-number-format'
import {Link} from 'react-router-dom'

// svgs
import USDC from '../../Assets/money/usdc.svg'
import RecentTransactions from '../Modals/RecentTransactions/RecentTransactions'
import SettingsModal from '../Modals/SettingsModal/SettingsModal'

const SwapPool = () => {
  const [price, setPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)

  const handlePriceChange = (number) => {
    setPrice(number.value)
  }
  const handleTimeChange = (number) => {
    setTime(number.value)
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
                <h4>Balance: 0.00000</h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <NumberFormat
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
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  <h4>MAX</h4>
                  <Image src={USDC} alt='' />
                  <h4>
                    USDC{' '}
                    <span>
                      <BiChevronDown />
                    </span>
                  </h4>
                </div>
              </div>
            </div>

            <div className='box_wrapper_circle'>
              <BsArrowDown />
            </div>
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Receive</h4>
                <h4>Balance: 0.00000</h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <NumberFormat
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
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  <h4>MAX</h4>
                  {/* <Image src={USDC} alt='' /> */}
                  <h4>
                    CCPT{' '}
                    <span>
                      <BiChevronDown />
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className='box_wrapper_button'>
              <button className='btn_brand'>Swap</button>
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
    </>
  )
}

export default SwapPool
