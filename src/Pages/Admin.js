import React from 'react'
import AdminLp from '../Components/Admin/AdminLp'
import {Redirect} from 'react-router-dom'

// redux imports
import {useSelector} from 'react-redux'

const Admin = () => {
  const {isAdmin} = useSelector((state) => state.profile)
  if (!isAdmin) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <AdminLp />
    </div>
  )
}

export default Admin
