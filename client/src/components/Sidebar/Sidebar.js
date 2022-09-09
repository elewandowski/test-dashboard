import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

import './Sidebar.scss'

function Sidebar(props) {
  const navigate = useNavigate()

  function logout(e, setUser) {
    localStorage.removeItem('authToken')
    setUser(null)
    navigate('/')
  }
  return (
    <UserContext.Consumer>
      {({ user, setUser }) => (
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
              {user ? (
                <button onClick={(e) => logout(e, setUser)}>Log out</button>
              ) : (
                <Link to="/login">Log in</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default Sidebar
