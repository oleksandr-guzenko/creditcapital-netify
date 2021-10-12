import React from 'react'
import {Container} from 'react-bootstrap'
import YieldPool from './YieldPool'

const Pools = () => {
  return (
    <div className='aggregator'>
      <Container>
        <h3 className='text-center mb-3'>Yield Aggregators</h3>
      </Container>
      <YieldPool name='CCPT' />
      <YieldPool name='CCPT-USDC' />
      <YieldPool name='UST-USDC' />
    </div>
  )
}

export default Pools
