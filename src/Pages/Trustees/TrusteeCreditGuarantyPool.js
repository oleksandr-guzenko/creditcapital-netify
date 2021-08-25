import React from 'react'
import Banner from '../../Components/LandingPage/Banner'
import LiquidityHistory from '../../Components/LandingPage/LiquidityHistory'
import TrusteeLiquidity from '../../Components/Trustees/TrusteeLiquidity'

const TrusteeCreditGuarantyPool = () => {
  return (
    <div>
      <Banner />
      <TrusteeLiquidity />
      <LiquidityHistory trustee={true} />
    </div>
  )
}

export default TrusteeCreditGuarantyPool
