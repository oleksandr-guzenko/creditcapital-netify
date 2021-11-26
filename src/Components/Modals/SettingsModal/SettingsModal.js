import React, {useState} from 'react'
import {Form, Modal} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'
import NumberFormat from 'react-number-format'

const SettingsModal = ({show, handleClose, handleTimeChange, time}) => {
  return (
    <Modal
      className='buy__token__modal successModal settings'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>Settings</h4>
          </div>
          <div className='buy__cpt__header__close' onClick={handleClose}>
            <CgClose />
          </div>
        </div>
      </div>
      <div className='success__body m-0'>
        <div className='minutes_wrapper'>
          <h5>Transaction Deadline</h5>
          <Form.Group>
            <Form.Label>Minutes</Form.Label>
            <NumberFormat
              disabled={false}
              //   thousandsGroupStyle='thousand'
              value={time}
              //   decimalSeparator='.'
              displayType='input'
              type='text'
              //   thousandSeparator={true}/
              allowNegative={false}
              fixedDecimalScale={true}
              allowLeadingZeros={false}
              decimalScale={0}
              onValueChange={handleTimeChange}
              placeholder='0'
              className='shadow-none form-control'
            />
          </Form.Group>
        </div>
        <button className='btn_brand' onClick={() => handleClose()}>
          Save
        </button>
      </div>
    </Modal>
  )
}

export default SettingsModal
