import React from 'react'
import MyPortfolio from '../Components/Portfolio/MyPortfolio'
import {Redirect} from 'react-router-dom'

// redux imports
import {useSelector} from 'react-redux'
import Dashboard from '../Components/Portfolio/Dashboard'

const Portfolio = () => {
  // Redux State
  const {userAddress} = useSelector((state) => state.profile)
  // if (!userAddress) {
  //   return <Redirect to='/' />
  // }
  return (
    <>
      {/* <MyPortfolio /> */}
      <Dashboard />
    </>
  )
}

export default Portfolio
