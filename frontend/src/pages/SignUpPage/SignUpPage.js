import { React, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { useSearchParams, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import axios from 'axios'

function SignUpPage(props) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function submitHandler(e, setUser) {
    e.preventDefault()

    const signupToken = searchParams.get('token')

    axios
      .post('/signup', { email, password, signupToken })
      .then(async (res) => {
        if (res.status === 200) {
          localStorage.setItem('authToken', res.data?.authToken)

          setUser(res.data.user)
          axios.defaults.headers.common['Authorization'] = res.data?.authToken
          navigate('/flaky-tests')
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data)
      })
  }

  return (
    <UserContext.Consumer>
      {({ user, setUser }) => (
        <div className="SignUpPage">
          <PageShell>
            <h1>Sign up</h1>
            <form onSubmit={(e) => submitHandler(e, setUser)}>
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
            {errorMessage && <label>Error: {errorMessage}</label>}
          </PageShell>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default SignUpPage
