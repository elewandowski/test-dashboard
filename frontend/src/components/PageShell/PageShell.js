import { React } from 'react'
import './PageShell.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

function PageShell({ children }) {
  return (
    <div className="PageShell">
      <Header></Header>
      <Sidebar></Sidebar>
      <main>{children}</main>
    </div>
  )
}

export default PageShell
