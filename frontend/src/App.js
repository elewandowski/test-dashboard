import { React, useState, useEffect } from 'react'
import axios from 'axios'
import ProtectedPageShell from './components/ProtectedPageShell/ProtectedPageShell'
import AdminPage from './pages/AdminPage/AdminPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import CyRunsPage from './pages/CyRunsPage/CyRunsPage'
import FlakyTestsPage from './pages/FlakyTestsPage/FlakyTestsPage'
import PageNotFoundPage from './pages/PageNotFoundPage/PageNotFoundPage'
import UserContext from './contexts/UserContext'
import { Routes, Route } from 'react-router-dom'
import './App.scss'

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('authToken')
    axios.get('/user/me').then((res) => {
      setUser(res.data)
    })
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route element={<ProtectedPageShell />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/cy-runs" element={<CyRunsPage />} />
            <Route exact path="/flaky-tests" element={<FlakyTestsPage />} />
          </Route>
          <Route path="*" element={<PageNotFoundPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
