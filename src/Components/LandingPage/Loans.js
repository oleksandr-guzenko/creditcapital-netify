import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import LoanTable from './LoanTable'

const Loans = () => {
  return (
    <div className='loans'>
      <Container>
        <div>
          <h4 className='section__titles'>Loans</h4>
        </div>
        <Row>
          <Col>
            <div className='liquidity__table'>
              <LoanTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Loans
