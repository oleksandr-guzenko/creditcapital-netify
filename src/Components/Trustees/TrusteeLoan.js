import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import TrusteeLoanTable from './TrusteeLoanTable'

const TrusteeLoan = () => {
  return (
    <div className='loans'>
      <Container>
        <div>
          <h4 className='section__titles'>Loans</h4>
        </div>
        <Row>
          <Col>
            <div className='liquidity__table'>
              <TrusteeLoanTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TrusteeLoan
