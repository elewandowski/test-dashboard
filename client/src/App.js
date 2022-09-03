import React, { useState, useEffect } from 'react'
import './App.scss'
import Table from './components/Table/Table.js'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  const [response, setResponse] = useState(0)

  useEffect(() => {
    fetch('/test-runs')
      .then((res) => res.json())
      .then((r) => setResponse(r))
  }, [])

  return (
    <div className="App">
      <Sidebar></Sidebar>
      <main>
        <Table data={response}></Table>
      </main>
    </div>
  )
}

export default App
