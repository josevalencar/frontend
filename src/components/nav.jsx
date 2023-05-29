import React from 'react'
import '../global.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/colaboradores">Colaboradores</Link>
    </div>
  )
}

export default Nav
