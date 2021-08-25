import React, {useState} from 'react'
import {Form, InputGroup} from 'react-bootstrap'
import Select, {components} from 'react-select'
import USDC from '../../Assets/money/usdc.svg'
import {BsFillPlayFill} from 'react-icons/bs'

const LiquidityInput = ({cpt, price, setPrice}) => {
  const [selectedValue, setSelectedValue] = useState('')

  // const {Option} = components
  const options = [
    {
      value: 'USDC',
      label: (
        <div className='d-flex align-items-center justify-content-between'>
          <img src={USDC} height='18px' width='18px' alt='' />
          <h6 className='mb-0' style={{fontSize: '12px', marginLeft: '3px'}}>
            USDC
          </h6>
        </div>
      ),
    },
  ]
  // const IconOption = (props) => (
  //   <Option {...props}>
  //     <img src={USDC} style={{width: 26}} alt={props.data.label} />
  //     {props.data.label}
  //   </Option>
  // )
  const CaretDownIcon = () => {
    return <BsFillPlayFill className='play-down' />
  }

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    )
  }

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption.value)
  }

  const handlePriceChange = (e) => {
    const priceRegex = /^[0-9-+()]*$/
    if (priceRegex.test(e.target.value)) {
      setPrice(e.target.value)
    }
  }

  return (
    <div className='liquidity__pool__box__middle'>
      {!cpt && (
        <Select
          placeholder={'USDC'}
          components={{DropdownIndicator}}
          value={selectedValue}
          onChange={handleChange}
          options={options}
          isSearchable={false}
          value={options.filter((option) => {
            return option.value === selectedValue
          })}
        />
      )}
      <InputGroup>
        {cpt && (
          <InputGroup.Text className='border-0 txt__brand cpt'>
            CPT
          </InputGroup.Text>
        )}
        <Form.Control
          type='tel'
          value={price}
          className='shadow-none'
          placeholder='0.00'
          onChange={handlePriceChange}
        />
        <InputGroup.Text>MAX</InputGroup.Text>
      </InputGroup>
    </div>
  )
}

export default LiquidityInput
