import { React, useState } from 'react'
import './ProtectedPageShell.scss'
import { Navigate } from 'react-router-dom'

function ProtectedPageShell(props) {
  const [user, setUser] = useState()

  if (!user) {
    return <Navigate to="/"></Navigate>
  }

  return props.children
}

export default ProtectedPageShell
