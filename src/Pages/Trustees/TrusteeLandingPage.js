import React from 'react'
import Banner from '../../Components/LandingPage/Banner'
import LiquidityHistory from '../../Components/LandingPage/LiquidityHistory'
import TrusteeLiquidity from '../../Components/Trustees/TrusteeLiquidity'
import TrusteeLoan from '../../Components/Trustees/TrusteeLoan'
import WithdrawalRequest from '../../Components/Trustees/WithdrawalRequest'

const TrusteeLandingPage = () => {
  return (
    <div>
      <Banner />
      <TrusteeLiquidity />
      <TrusteeLoan />
      <WithdrawalRequest />
      <LiquidityHistory trustee={true} />
    </div>
  )
}

export default TrusteeLandingPage
