import { React, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import { Navigate, useSearchParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import axios from 'axios'

function PageNotFoundPage(props) {
  const [searchParams] = useSearchParams()
  const [signupFailed, setSignupFailed] = useState(false)
  const [signedUp, setSignedUp] = useState(false)
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
          setSignedUp(true)
        } else {
          setSignupFailed(true)
        }
      })
  }

  return (
    <div className="PageNotFoundPage">
      <PageShell>
        <h1>Page not found</h1>
      </PageShell>
    </div>
  )
}

export default PageNotFoundPage
