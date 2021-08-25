import React, {useState} from 'react'
import {Container, Tab, Tabs} from 'react-bootstrap'
import CapitalTokenStaking from './CapitalTokenStaking'
import CreditTokenStaking from './CreditTokenStaking'

const Token = () => {
  const [key, setKey] = useState('capital')
  return (
    <div className='token'>
      <Container>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey='capital' title='Capital Token Staking'>
            <CapitalTokenStaking />
          </Tab>
          <Tab eventKey='credit' title='Credit Token Staking'>
            <CapitalTokenStaking />
            {/* <CreditTokenStaking /> */}
          </Tab>
        </Tabs>
      </Container>
    </div>
  )
}

export default Token
