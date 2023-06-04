import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"
import SelectInterval from "../components/selectInterval"

const Colaborador = () => {
  let params = useParams();
  let baseUrl = "https://2d1oh9-3000.csb.app/v1/mainteiners/";

  const [colaborador, atualizaColaborador] = useState('');

  useEffect(() => {
    fetch(baseUrl + params.colaboradorId)
    .then((response) => response.json())
    .then((data) => {
      atualizaColaborador(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

  function createData(tablet, local, data) {
    return { tablet, local, data};
  }

  const columns = [
    { id: 'tablet', label: 'Tablet', align: 'center', minWidth: 20 },
    { id: 'local', label: 'Local', align: 'center', minWidth: 20 },
    {
      id: 'data',
      label: 'Data',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialRows = [
    createData(<Link to='/colaboradores/Maia'>A301</Link>, "Vulcanização", "12/11/2002 - 14:15"),
  ]

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0", marginBottom: "0"}} >{colaborador.name}</h1>
        <h2 style={{marginTop:"0.5%"}} >{colaborador.rfid}</h2>
        <div style={{position:"relative", float:"left", marginBottom:"1%"}}>
          <SelectInterval valores={[5, 10, 15, 30, 45, 60]} style={{}}></SelectInterval>
        </div>
        <TabelaColaborador rows={initialRows} columns={columns}/>
      </div>
    </div>
  </>
  )
}

export default Colaborador