import { React, useState, useEffect } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { Navigate } from 'react-router-dom'

function LoginPage(props) {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    document.title = 'Test Dashboard Login page'
  })

  function renderErrorMessage() {}

  function submitHandler(e) {
    e.preventDefault()

    fetch('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((resBody) => {
        localStorage.setItem('authToken', resBody.authToken)
        setAuthenticated(true)
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
        </PageShell>
      </div>
    )
  }
}

export default LoginPage
