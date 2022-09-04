import React, { useState, useEffect } from 'react'
import './Flaky-tests.scss'
import PageShell from '../Page-shell/Page-shell'
import Table from '../../components/Table/Table'

function FlakyTestsPage() {
  const [response, setResponse] = useState(0)

  useEffect(() => {
    fetch('/test-runs')
      .then((res) => res.json())
      .then((r) => setResponse(r))
  }, [])

  return (
    <div className="Flaky-tests-page">
      <PageShell>
        <Table data={response}></Table>
      </PageShell>
    </div>
  )
}

export default FlakyTestsPage
