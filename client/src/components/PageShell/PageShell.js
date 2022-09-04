import React, { useState, useEffect } from 'react'
import './PageShell.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

function PageShell(props) {
  return (
    <div className="PageShell">
      <Header></Header>
      <Sidebar></Sidebar>
      <main>{props.children}</main>
    </div>
  )
}

export default PageShell
