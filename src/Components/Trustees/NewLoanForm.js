import React, {useState} from 'react'
import {InputGroup, Modal, Form} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'
import {GoCalendar} from 'react-icons/go'
import DatePicker from 'react-date-picker'
import GlobalFilter from '../LandingPage/GlobalFilter'
import Select, {components} from 'react-select'
import USDC from '../../Assets/money/usdc.svg'
import {BsFillPlayFill} from 'react-icons/bs'

const NewLoanForm = ({show, handleClose}) => {
  const [date, onDateChange] = useState(new Date())
  const options = [
    {value: 'Real estate', label: 'Real estate'},
    {value: 'Restaurants', label: 'Restaurants'},
    {value: 'E-commerce', label: 'E-commerce'},
  ]
  const [sector, setSector] = useState('')

  const [userName, setUserName] = useState('')
  const [withdrawingAmount, setWithdrawingAmount] = useState('')

  const submitNewLoanForm = (e) => {
    e.preventDefault()
  }
  //selected
  const [selectedValue, setSelectedValue] = useState('')
  const optionsOne = [
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

  return (
    <Modal show={show} onHide={handleClose}>
      <div className='modal__header'>
        <h6>Add New Loan</h6>
        <CgClose onClick={handleClose} className='close__btn' />
      </div>
      <div className='modal__body'>
        <Form onSubmit={submitNewLoanForm}>
          <div className='input__wrapper'>
            <label htmlFor='name'>Borrower</label>
            <input
              type='text'
              name='name'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <GlobalFilter
            filter={sector}
            setFilter={setSector}
            options={options}
            label='Sector'
          />
          <div className='input__wrapper'>
            <label htmlFor='date'>Approval Date</label>
            <DatePicker
              onChange={onDateChange}
              value={date}
              calendarIcon={<GoCalendar />}
              clearIcon={null}
            />
          </div>
          <div className='input__wrapper last__child d-flex align-items-center'>
            <label htmlFor='amount'>Withdrawing Amount</label>
            <InputGroup.Text>$</InputGroup.Text>
            <input
              type='text'
              name='amount'
              value={withdrawingAmount}
              onChange={(e) => {
                const priceRegex = /^[0-9-+()]*$/
                if (priceRegex.test(e.target.value)) {
                  setWithdrawingAmount(e.target.value)
                }
              }}
            />
            <InputGroup.Text className='second_text'>~2245.00</InputGroup.Text>
            <Select
              components={{DropdownIndicator}}
              onChange={handleChange}
              options={optionsOne}
              isSearchable={false}
              value={optionsOne.filter((option) => {
                return option.value === selectedValue
              })}
            />
          </div>
          <div className='w-100 d-flex'>
            <button type='submit' className='btn_brand m-auto'>
              Add New Loan
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default NewLoanForm
