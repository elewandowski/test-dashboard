import { React, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
  }

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

export default LoginPage
