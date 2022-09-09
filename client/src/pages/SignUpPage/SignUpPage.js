import { React, useState, useEffect } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { Navigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function SignUpPage(props) {
  const [searchParams] = useSearchParams()
  const [signupFailed, setSignupFailed] = useState(false)
  const [signedUp, setSignedUp] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    document.title = 'Sign up page'
  })

  function submitHandler(e) {
    e.preventDefault()

    const signupToken = searchParams.get('token')

    axios
      .post('/signup', { email, password, signupToken })
      .then(async (res) => {
        if (res.status === 200) {
          localStorage.setItem('authToken', res.data?.authToken)
          axios.defaults.headers.common['Authorization'] = res.data?.authToken
          setSignedUp(true)
        } else {
          setSignupFailed(true)
        }
      })
  }

  if (signedUp) {
    return <Navigate replace to="/flaky-tests" />
  } else {
    return (
      <div className="SignUpPage">
        <PageShell>
          <h1>Sign up page</h1>
          <form onSubmit={submitHandler}>
            <label>Email:</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              required
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
          {signupFailed && <label>Signup failed. Please try again.</label>}
        </PageShell>
      </div>
    )
  }
}

export default SignUpPage
