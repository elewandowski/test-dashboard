import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <Link to="/cy-runs">Cypress Runs</Link>
        </li>
        <li>
          <Link to="/flaky-tests">Flaky tests</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
