import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"

const Colaborador = () => {

  function createData(colaborador, setor, data) {
    return { colaborador, setor, data};
  }

  const columns = [
    { id: 'colaborador', label: 'Colaborador', align: 'center', minWidth: 20 },
    { id: 'setor', label: 'Setor', align: 'center', minWidth: 20 },
    {
      id: 'data',
      label: 'Data',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialRows = [
    createData(<Link to='/colaboradores/Maia'>Marcelo Maia</Link>, "Vulcanização", "12/11/2002 - 14:15"),
  ]

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0"}} >Tablet A301</h1>
        <TabelaColaborador rows={initialRows} columns={columns} />
      </div>
    </div>
  </>
  )
}

export default Colaborador