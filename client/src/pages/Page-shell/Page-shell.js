import React, { useState, useEffect } from 'react'
import './Page-shell.scss'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

function PageShell(props) {
  return (
    <div className="Page-shell">
      <Header></Header>
      <Sidebar></Sidebar>
      <main>{props.children}</main>
    </div>
  )
}

export default PageShell
