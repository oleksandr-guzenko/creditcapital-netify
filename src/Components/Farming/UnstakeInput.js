import React, {useState} from 'react'
import {Form, InputGroup} from 'react-bootstrap'

const UnstakeInput = () => {
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className='unstack__input' onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type='tel'
          value={price}
          className='shadow-none'
          placeholder='0.00'
          onChange={(e) => setPrice(e.target.value)}
        />
        <InputGroup.Text>MAX</InputGroup.Text>
      </InputGroup>
      <button type='submit' className='btn_brand'>
        Unstake
      </button>
    </form>
  )
}

export default UnstakeInput
