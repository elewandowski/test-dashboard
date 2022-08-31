import React, { useState, useEffect } from 'react'

import logo from './logo.svg'
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Table data={response}></Table>
      </header>
    </div>
  )
}

export default App
