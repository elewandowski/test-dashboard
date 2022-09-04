import React from 'react'
import FlakyTestsPage from './pages/Flaky-tests/Flaky-tests'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FlakyTestsPage />} />
        <Route path="/cy-runs" element={<FlakyTestsPage />} />
        <Route path="/flaky-tests" element={<FlakyTestsPage />} />
      </Routes>
    </div>
  )
}

export default App
