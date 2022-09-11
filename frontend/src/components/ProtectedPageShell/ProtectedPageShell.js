import { React, useEffect } from 'react'
import './ProtectedPageShell.scss'
import { Navigate, Outlet } from 'react-router-dom'

import axios from 'axios'

function ProtectedPageShell(props) {
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('authToken')
  })

  if (!authToken) {
    return <Navigate to="/login"></Navigate>
  }

  return <Outlet />
}

export default ProtectedPageShell
