import React from 'react'
import LoanApplication from '../Components/LandingPage/LoanApplication'
import MyPortfolio from '../Components/Portfolio/MyPortfolio'
import {Redirect} from 'react-router-dom'

// redux imports
import {useSelector} from 'react-redux'

const Portfolio = () => {
  // Redux State
  const {userAddress} = useSelector((state) => state.profile)
  if (!userAddress) {
    return <Redirect to='/' />
  }
  return (
    <>
      <MyPortfolio />
    </>
  )
}

export default Portfolio
