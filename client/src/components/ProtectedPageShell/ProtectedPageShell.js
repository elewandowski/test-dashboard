import { React, useState } from 'react'
import './ProtectedPageShell.scss'
import { Navigate } from 'react-router-dom'

function ProtectedPageShell(props) {
  const authToken = localStorage.getItem('authToken')

  if (!authToken) {
    return <Navigate to="/"></Navigate>
  }

  return props.children
}

export default ProtectedPageShell
