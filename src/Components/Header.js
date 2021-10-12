import React, {useEffect, useState} from 'react'
import {Container, Image, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Wallets from './Modals/Wallets'

// images
import Logo from '../Assets/Logo.svg'
import MetaMask from '../Assets/MetaMask.svg'
import Coinbase from '../Assets/coinbase_Wallet.svg'
import Wallet from '../Assets/wallet.svg'

// redux imports
import {useSelector, useDispatch} from 'react-redux'
import { getProfile, getProfileInformation, getProfileInformationTest } from '../Redux/Profile/actions'

const Header = () => {
  const dispatch = useDispatch()
  // Redux State
  const {userAddress, walletType} = useSelector((state) => state.profile)

  // Wallets modal
  const [showWallets, setShowWallets] = useState(false)
  const closeWalletsModal = () => {
    setShowWallets(false)
  }
  const openWalletsModal = () => {
    setShowWallets(true)
  }

  useEffect(() => {
    if (userAddress) {
      closeWalletsModal()
      dispatch(getProfileInformation())
      dispatch(getProfileInformationTest())
    }
  }, [userAddress])

  return (
    <>
      <Navbar collapseOnSelect expand='xl' fixed='top' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src={Logo}
                className='d-inline-block align-top'
                alt='Credit Capital'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='m-auto nav__ mx-auto'>
              <div className='navbar__left'>
                <LinkContainer to='/'>
                  <Nav.Link>Capital Pool</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/credit_guaranty_pool'>
                  <Nav.Link>Credit Guaranty Pool</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/farming'>
                  <Nav.Link>Farming</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/yield-aggregator'>
                  <Nav.Link>Yield Aggregator</Nav.Link>
                </LinkContainer>
              </div>
              <div className='navbar__right'>
                {/* <div className='circle'>
                <LinkContainer to='/'>
                  <Image src={User} alt='User' />
                </LinkContainer>
              </div> */}
                {/* <div className='option__wrapper'>
                <a>962.00 CRT</a>
              </div> */}

                {userAddress && (
                  <div className='option__wrapper'>
                    <LinkContainer to='/portfolio'>
                      <Nav.Link>
                        <Image src={Wallet} alt='' />
                        Portfolio
                      </Nav.Link>
                    </LinkContainer>
                  </div>
                )}
                {userAddress && (
                  <div className='option__wrapper'>
                    <Image
                      src={
                        walletType === 'MetaMask'
                          ? MetaMask
                          : walletType === 'Coinbase'
                          ? Coinbase
                          : ''
                      }
                      alt=''
                    />
                    <a className='user__id'>{userAddress}</a>
                  </div>
                )}
                {!userAddress && (
                  <div className='option__wrapper' onClick={openWalletsModal}>
                    <a>Connect Wallet</a>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Wallets show={showWallets} handleClose={closeWalletsModal} />
    </>
  )
}

export default Header
