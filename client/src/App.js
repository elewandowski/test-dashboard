import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import CyRunsPage from './pages/CyRunsPage/CyRunsPage'
import FlakyTestsPage from './pages/FlakyTestsPage/FlakyTestsPage'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cy-runs" element={<CyRunsPage />} />
        <Route path="/flaky-tests" element={<FlakyTestsPage />} />
      </Routes>
    </div>
  )
}

export default App
