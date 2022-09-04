import React, { useState, useEffect } from 'react'
import './FlakyTestsPage.scss'
import PageShell from '../PageShell/PageShell'
import Table from '../../components/Table/Table'

function FlakyTestsPage() {
  const [response, setResponse] = useState(0)

  useEffect(() => {
    fetch('/test-runs')
      .then((res) => res.json())
      .then((r) => setResponse(r))
  }, [])

  return (
    <div className="FlakyTestsPage">
      <PageShell>
        <Table data={response}></Table>
      </PageShell>
    </div>
  )
}

export default FlakyTestsPage
