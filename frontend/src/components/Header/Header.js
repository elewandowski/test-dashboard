import { React } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

function Header(props) {
  return (
    <div className="Header">
      <Link to="/">
        <h3>Test Dashboard</h3>
      </Link>
    </div>
  )
}

export default Header
