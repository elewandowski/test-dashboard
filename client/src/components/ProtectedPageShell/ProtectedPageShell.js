import { React, useEffect } from 'react'
import './ProtectedPageShell.scss'
import { Navigate } from 'react-router-dom'

import axios from 'axios'

function ProtectedPageShell(props) {
  const authToken = localStorage.getItem('authToken')

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('authToken')
  })

  if (!authToken) {
    return <Navigate to="/"></Navigate>
  }

  return props.children
}

export default ProtectedPageShell
