import React from 'react'
import { Link } from 'react-router-dom'
import TabelaColaboradores from '../components/tabelaColaboradores'
import Container from '@mui/material/TableRow';

const Colaboradores = () => {
  return (
    <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"red", width:"100%"}}>
        <div>
          Colaboradores:
          <Link to="/colaboradores/Jose">Jose</Link>
          <Link to="/colaboradores/Marcelo">Marcelo</Link>
        </div>
        <div>
          <TabelaColaboradores />
        </div>
      </div>
    </>
  )
}

export default Colaboradores
