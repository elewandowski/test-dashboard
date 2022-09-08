import { React, useState, useEffect } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage(props) {
  const [authenticationFailed, setAuthenticationFailed] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    document.title = 'Test Dashboard Login page'
  })

  function renderErrorMessage() {}

  function submitHandler(e) {
    e.preventDefault()

    axios.post('/login', { email, password }).then(async (res) => {
      if (res.status === 200) {
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
      <div className="LoginPage">
        <PageShell>
          <form onSubmit={submitHandler}>
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
              {renderErrorMessage('pass')}
            </div>

            <input type="submit" />
          </form>
          {authenticationFailed && (
            <label>Authentication failed. Please try again.</label>
          )}
        </PageShell>
      </div>
    )
  }
}

export default LoginPage
