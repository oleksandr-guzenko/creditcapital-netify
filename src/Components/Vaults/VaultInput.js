import React, {useState} from 'react'
import {Form, InputGroup, Image} from 'react-bootstrap'
import Select, {components} from 'react-select'
import {BsFillPlayFill} from 'react-icons/bs'
import NumberFormat from 'react-number-format'

// images
import USDC from '../../Assets/money/usdc.svg'

const VaultInput = ({
  price,
  handlePriceChange,
  errors,
  typeOfToken,
  disabled,
}) => {
  // const [selectedValue, setSelectedValue] = useState('')

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
  // const IconOption = (props) => (
  //   <Option {...props}>
  //     <img src={USDC} style={{width: 26}} alt={props.data.label} />
  //     {props.data.label}
  //   </Option>
  // )
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

  return (
    <div className='liquidity__pool__box__middle'>
      {/* {!cpt && (
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
      )} */}
      <InputGroup>
        {/* {cpt && (
          <InputGroup.Text className='border-0 txt__brand cpt'>
            CPT
          </InputGroup.Text>
        )} */}
        {/* {typeOfToken === 'USDC' ? (
          <InputGroup.Text className='border-0 txt__brand cpt'>
            <Image src={USDC} height='15px' width='15px' alt='' />
            USDC
          </InputGroup.Text>
        ) : typeOfToken === 'CAPL' ? (
          <InputGroup.Text className='border-0 txt__brand cpt'>
            CAPL
          </InputGroup.Text>
        ) : typeOfToken === 'CRET' ? (
          <InputGroup.Text className='border-0 txt__brand cpt'>
            CRET
          </InputGroup.Text>
        ) : (
          ''
        )} */}
        <NumberFormat
          disabled={errors || disabled}
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
        <InputGroup.Text>MAX</InputGroup.Text>
      </InputGroup>
    </div>
  )
}

export default VaultInput
