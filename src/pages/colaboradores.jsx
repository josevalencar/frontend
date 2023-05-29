import React from 'react'
import { Link } from 'react-router-dom'

const Colaboradores = () => {
  return (
    <div>
      Colaboradores:
      <Link to="/colaboradores/Jose">Jose</Link>
      <Link to="/colaboradores/Marcelo">Marcelo</Link>
    </div>
  )
}

export default Colaboradores
