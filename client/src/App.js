import React, { useState, useEffect } from 'react'

import logo from './logo.svg'
import './App.css'

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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {JSON.stringify(response)}
        </a>
      </header>
    </div>
  )
}

export default App
