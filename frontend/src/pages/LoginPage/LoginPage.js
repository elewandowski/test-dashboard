import { React, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { Navigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import axios from 'axios'

function LoginPage() {
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function submitHandler(e, setUser) {
    e.preventDefault()

    axios.post('/login', { email, password }).then(async (res) => {
      if (res.status === 200) {
        setUser(res.data?.user)
        localStorage.setItem('authToken', res.data?.authToken)
        axios.defaults.headers.common['Authorization'] = res.data?.authToken
        setAuthenticated(true)
      } else {
        setAuthenticationFailed(true)
      }
    })
  }

  if (authenticated) {
    return <Navigate replace to="/flaky-tests" />
  } else {
    return (
      <UserContext.Consumer>
        {({ user, setUser }) => (
          <div className="LoginPage">
            <PageShell>
              <form onSubmit={(e) => submitHandler(e, setUser)}>
                <label>Email:</label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <div className="input-container">
                  <label>Password </label>
                  <br />
                  <input
                    type="password"
                    name="pass"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input type="submit" />
              </form>
              {authenticationFailed && (
                <label>Authentication failed. Please try again.</label>
              )}
            </PageShell>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default LoginPage
