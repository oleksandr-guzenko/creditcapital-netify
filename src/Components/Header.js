import React from 'react'
import {Container, Image, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

// images
import Logo from '../Assets/Logo.svg'
import User from '../Assets/User.svg'
import MetaMask from '../Assets/MetaMask.svg'
import Coinbase from '../Assets/coinbase_Wallet.svg'
import Wallet from '../Assets/wallet.svg'

const Header = () => {
  return (
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
                <LinkContainer to='/portfolio'>
                  <Nav.Link>
                    <Image src={Wallet} alt='' />
                    Portfolio
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div className='option__wrapper'>
                <Image src={MetaMask} alt='' />
                <a>0x5fd...e9da</a>
                {/* <a>Connect Wallet</a> */}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
