import { React, useState } from 'react'
import PageShell from '../../components/PageShell/PageShell'
import axios from 'axios'

import './AdminPage.scss'

function AdminPage() {
  const [signupLink, setSignupLink] = useState('')

  function getSignupLink() {
    axios('/signup/gettoken').then((res) => {
      setSignupLink(`http://localhost:3000/signup?token=${res.data}`)
    })
  }

  return (
    <div className="AdminPage">
      <PageShell>
        <h1>Admin Page</h1>
        <button onClick={getSignupLink}>Create signup link</button>
        <p>{signupLink}</p>
      </PageShell>
    </div>
  )
}

export default AdminPage
