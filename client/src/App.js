import { React, useState } from 'react'
import ProtectedPageShell from './components/ProtectedPageShell/ProtectedPageShell'
import AdminPage from './pages/AdminPage/AdminPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import CyRunsPage from './pages/CyRunsPage/CyRunsPage'
import FlakyTestsPage from './pages/FlakyTestsPage/FlakyTestsPage'
import UserContext from './contexts/UserContext'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {
  const [user, setUser] = useState()
  const [authToken, setAuthToken] = useState()

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/login"
            element={<LoginPage setAuthToken={setAuthToken} />}
          />
          <Route element={<ProtectedPageShell />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cy-runs" element={<CyRunsPage />} />
            <Route path="/flaky-tests" element={<FlakyTestsPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
