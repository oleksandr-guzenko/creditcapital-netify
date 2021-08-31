import React from 'react'
import {CgClose} from 'react-icons/cg'
import {Image, Modal} from 'react-bootstrap'
import {VscCloudDownload} from 'react-icons/vsc'

// image
import MetaMaskFox from '../../Assets/MetaMask.svg'

const MetaMaskNotFound = ({show, handleClose}) => {
  return (
    <Modal
      className='buy__token__modal metaMaskNotFound'
      show={show}
      onHide={handleClose}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>MetaMask NotFound</h4>
          </div>
          <div className='buy__cpt__header__close' onClick={handleClose}>
            <CgClose />
          </div>
        </div>
        <div className='metaMask__body'>
          <Image src={MetaMaskFox} alt='' />
          <h5>Please Install MetaMask</h5>
          <VscCloudDownload />
          <a
            href='https://metamask.io/download.html'
            target='_blank'
            className='download'
            rel='noreferrer'
          >
            Download
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default MetaMaskNotFound
