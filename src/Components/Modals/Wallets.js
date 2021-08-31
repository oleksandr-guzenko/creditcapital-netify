import React, {useEffect, useState} from 'react'
import {Image, Modal} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'

// image
import MetaMaskFox from '../../Assets/MetaMask.svg'

// redux imports
import {useDispatch} from 'react-redux'
import {connToMetaMask, connToCoinbase} from '../../Redux/Profile/actions'
import MetaMaskNotFound from './MetaMaskNotFound'

import Coinbase_wallet from '../../Assets/coinbase_Wallet.svg'

const Wallets = ({show, handleClose}) => {
  const [meatMaskShow, setMeatMaskShow] = useState(false)
  const dispatch = useDispatch()
  const connectToMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      dispatch(connToMetaMask())
    } else {
      openMetaMaskModal()
    }
  }

  //   Connecting to Coinbase
  const connectToCoinbase = () => {
    dispatch(connToCoinbase())
    handleClose()
  }

  //  MetaMAsk PopUP
  const closeMetaMaskModal = () => {
    setMeatMaskShow(false)
  }
  const openMetaMaskModal = (e) => {
    setMeatMaskShow(true)
    handleClose()
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        dispatch(connToMetaMask())
      })
    }
  }, [])

  // useEffect(() => {
  //   const checkIt = async () => {
  //     if (typeof window.ethereum !== 'undefined') {
  //       // dispatch(connToMetaMask())
  //       const accounts = await web3.eth.getAccounts()
  //       if (accounts[0]) {
  //         dispatch(connToMetaMask())
  //       }
  //     }
  //   }
  //   checkIt()
  // }, [])

  return (
    <>
      <Modal
        className='buy__token__modal successModal wallets'
        show={show}
        onHide={handleClose}
      >
        <div className='buy__cpt__modal'>
          <div className='buy__cpt__header'>
            <div className='buy__cpt__header__tile'>
              <h4>Connect To a Wallet</h4>
            </div>
            <div className='buy__cpt__header__close' onClick={handleClose}>
              <CgClose />
            </div>
          </div>
          <div className='success__body'>
            <div className='wallet' onClick={connectToMetaMask}>
              <Image src={MetaMaskFox} alt='' />
              <h5>MetaMask</h5>
            </div>
            <div className='wallet' onClick={connectToCoinbase}>
              <Image src={Coinbase_wallet} alt='' />
              <h5>Coinbase</h5>
            </div>
          </div>
        </div>
      </Modal>
      <MetaMaskNotFound show={meatMaskShow} handleClose={closeMetaMaskModal} />
    </>
  )
}

export default Wallets
