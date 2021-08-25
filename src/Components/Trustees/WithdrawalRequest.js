import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import WithdrawalRequestTable from './WithdrawalRequestTable'


const WithdrawalRequest = () => {
  return (
    <div className='loans withdrawal__request'>
      <Container>
        <div>
          <h4 className='section__titles'>Withdrawal Request</h4>
        </div>
        <Row>
          <Col>
            <div className='liquidity__table'>
              <WithdrawalRequestTable />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default WithdrawalRequest
