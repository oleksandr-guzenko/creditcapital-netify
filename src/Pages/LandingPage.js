import React from 'react'

import Banner from '../Components/LandingPage/Banner'
import LiquidityPool from '../Components/LandingPage/LiquidityPool'
import Stacking from '../Components/LandingPage/Stacking'
import Loans from '../Components/LandingPage/Loans'
import LoanApplication from '../Components/LandingPage/LoanApplication'

const LandingPage = () => {                             
  return (
    <div>
      <Banner />
      <LiquidityPool />
      <Stacking />
      <Loans />
      <LoanApplication />
    </div>
  )
}

export default LandingPage
