import React from 'react'
import {Button, Col, Container, Row } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'

const LoanApplication = () => {
  return (
    <footer>
      <Container>
        <div className='footer__top'>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8} xl={8}>
              <div className='footer__top__left'>
                <p className=' loan txt__brand'>LOAN APPLICATION</p>
                <h4 className='txt__black'>
                  How does the CG-USDT Pool approve loan applications?
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamcs.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              <div className='footer__top__right'>
                <Button>
                  Learn More{' '}
                  <span>
                    <BsArrowRight />
                  </span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  )
}

export default LoanApplication
