import React from 'react'
import {Redirect} from 'react-router-dom'

// redux imports
import {useSelector} from 'react-redux'
import Dashboard from '../Components/Portfolio/Dashboard'

const Portfolio = () => {
  // Redux State
  const {userAddress} = useSelector((state) => state.profile)
  if (!userAddress) {
    return <Redirect to='/' />
  }
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Portfolio
