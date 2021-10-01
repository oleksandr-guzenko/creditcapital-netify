import React from 'react'
import LiquidityPoolCRET from '../Components/CreditGuarantyPool/LiquidityPoolCRET'
import StakingCRET from '../Components/CreditGuarantyPool/StakingCRET'
import Banner from '../Components/LandingPage/Banner'
const CreditGuarantyPool = () => {
  return (
    <div>
      <Banner />
      <LiquidityPoolCRET />
      <StakingCRET />
    </div>
  )
}

export default CreditGuarantyPool
