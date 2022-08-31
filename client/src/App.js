import React, { useState, useEffect } from 'react'
import './App.css'
import Table from './components/Table.js'

function App() {
  const [response, setResponse] = useState(0)

  useEffect(() => {
    fetch('/test-runs')
      .then((res) => res.json())
      .then((r) => setResponse(r))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Dashboard</h1>

        <Table data={response}></Table>
      </header>
    </div>
  )
}

export default App
