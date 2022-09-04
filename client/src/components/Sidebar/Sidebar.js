import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <Link to="/cy-runs">
        <h1>Test Dashboard</h1>
      </Link>
      <ul>
        <li>
          <Link to="/cy-runs">Cypress Runs</Link>
        </li>
        <li>
          <Link to="/flaky-tests"> Flaky tests</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
