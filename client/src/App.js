import { React, useState } from 'react'
import ProtectedPageShell from './components/ProtectedPageShell/ProtectedPageShell'
import LoginPage from './pages/Login/Login'
import HomePage from './pages/HomePage/HomePage'
import CyRunsPage from './pages/CyRunsPage/CyRunsPage'
import FlakyTestsPage from './pages/FlakyTestsPage/FlakyTestsPage'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {
  const [authToken, setAuthToken] = useState()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setAuthtoken />} />
        <Route
          path="/cy-runs"
          element={
            <ProtectedPageShell>
              <CyRunsPage />
            </ProtectedPageShell>
          }
        />
        <Route
          path="/flaky-tests"
          element={
            <ProtectedPageShell>
              <FlakyTestsPage />
            </ProtectedPageShell>
          }
        />
      </Routes>
    </div>
  )
}

export default App
