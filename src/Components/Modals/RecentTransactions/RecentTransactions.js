import React from 'react'
import {Modal} from 'react-bootstrap'
import { CgClose } from 'react-icons/cg'

const RecentTransactions = ({show, handleClose}) => {
  return (
    <Modal
      className='buy__token__modal successModal'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>Recent Transactions</h4>
          </div>
          <div className='buy__cpt__header__close' onClick={handleClose}>
            <CgClose />
          </div>
        </div>
      </div>
      <div className='success__body'>
        <h6>No Transactions Found</h6>
        <div className='my-5'></div>
      </div>
    </Modal>
  )
}

export default RecentTransactions
