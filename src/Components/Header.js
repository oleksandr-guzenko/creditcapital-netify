import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Wallets from './Modals/Wallets'
import { useLocation } from 'react-router-dom'
import { BiWalletAlt } from 'react-icons/bi'
import { numberFormate } from '../Utilities/Util'
import { connToMetaMask, connToCoinbase } from '../Redux/Profile/actions'

// images
import Logo from '../Assets/cc_white.svg'
import MetaMask from '../Assets/MetaMask.svg'
import Coinbase from '../Assets/coinbase_Wallet.svg'

// redux imports
import { useSelector, useDispatch } from 'react-redux'
import { checkAndAddNetwork, checkAdminAddress } from '../Redux/Profile/actions'
import DisConnect from './Modals/DisConnect/DisConnect'
import {
  caplPriceAction,
  getSwapTokenBalances,
  getSwapTokenBalancesPerSecond,
} from '../Redux/Swap/actions'
import { sharesTotal } from '../Redux/Vault/action'

const Header = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  // Redux State
  const { userAddress, walletType, isAdmin } = useSelector(
    (state) => state.profile
  )
  const { reserves } = useSelector((state) => state.vault)
  const { caplPrice } = useSelector((state) => state.swap)

  // Wallets modal
  const [showWallets, setShowWallets] = useState(false)
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false)
  const [continuosFetch, setContinuosFetch] = useState(false)

  const closeWalletsModal = () => {
    setShowWallets(false)
  }
  const openWalletsModal = () => {
    setShowWallets(true)
  }

  useEffect(() => {
    if (userAddress) {
      dispatch(sharesTotal())
    }
  }, [userAddress, reserves, reserves?._reserve0])

  useEffect(() => {
    dispatch(checkAndAddNetwork())
  }, [])

  useEffect(() => {
    if (userAddress) {
      closeWalletsModal()
      dispatch(getSwapTokenBalances())
      dispatch(checkAdminAddress())
      setContinuosFetch(true)
    }
  }, [userAddress])

  useEffect(() => {
    dispatch(caplPriceAction(1))
  }, [])

  useEffect(() => {
    if (userAddress && continuosFetch) {
      setInterval(() => {
        dispatch(getSwapTokenBalancesPerSecond())
        dispatch(caplPriceAction(1))
      }, 120000)
    }
  }, [userAddress, continuosFetch])

  useEffect(() => {
    if (pathname != '/') {
      const NavItem = document.querySelector('.main')
      NavItem?.classList.remove('active')
    }
    if (pathname === '/') {
      const navList = document.querySelectorAll('.nav-link')
      navList.forEach((item) => item.classList.remove('active'))
      const NavItem = document.querySelector('.main')
      NavItem?.classList.add('active')
    }
  }, [pathname])

  useEffect(() => {
    const res = localStorage.getItem('walletType')
    if (res === 'Metamask') {
      dispatch(connToMetaMask())
    } else if (res === 'Coinbase') {
      dispatch(connToCoinbase())
    }
  }, [])

  return (
    <>
      <Navbar collapseOnSelect expand='xl' fixed='top' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image
                src={Logo}
                className='d-inline-block align-top me-2'
                alt='Credit Capital'
              />
              CreditCapital
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='m-auto nav__ mx-auto'>
              <div className='navbar__left'>
                <LinkContainer to='/' className='main'>
                  <Nav.Link>Vault</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/swap'>
                  <Nav.Link>Swap</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/liquidity'>
                  <Nav.Link>Liquidity</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/test'>
                  <Nav.Link>Test</Nav.Link>
                </LinkContainer>
                {isAdmin && (
                  <LinkContainer to='/admin'>
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                )}
                {/* <LinkContainer to='/creditPool'>
                  <Nav.Link>Capital Pool</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/credit-guaranty-pool'>
                  <Nav.Link>Credit Guaranty Pool</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/farming'>
                  <Nav.Link>Farming</Nav.Link>
                </LinkContainer> */}
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
                <div className='option__wrapper'>
                  <a>CAPL: ${numberFormate(caplPrice)}</a>
                </div>

                {userAddress && (
                  <div className='option__wrapper'>
                    <LinkContainer to='/portfolio'>
                      <Nav.Link>
                        <BiWalletAlt />
                        Dashboard
                      </Nav.Link>
                    </LinkContainer>
                  </div>
                )}
                {userAddress && (
                  <div
                    className='option__wrapper'
                    onClick={() => setOpenDisconnectModal(true)}
                  >
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
                    <a className='user__id'>{`${userAddress?.substring(
                      0,
                      4
                    )}...${userAddress?.substring(userAddress.length - 4)}`}</a>
                  </div>
                )}
                {!userAddress && (
                  <div className='option__wrapper' onClick={openWalletsModal}>
                    <BiWalletAlt />
                    <a>Connect Wallet</a>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Wallets show={showWallets} handleClose={closeWalletsModal} />
      <DisConnect
        show={openDisconnectModal}
        handleClose={() => setOpenDisconnectModal(false)}
      />
    </>
  )
}

export default Header
