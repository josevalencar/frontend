import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"
import SelectInterval from "../components/selectInterval"
import dateToSeconds from "../helpers/dateToSeconds"

const Colaborador = () => {
  let params = useParams();
  let maintainerUrl = "https://2d1oh9-3000.csb.app/v1/maintainers/";
  let historicUrl = "https://2d1oh9-3000.csb.app/v1/historics?maintainer=";

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [colaborador, atualizaColaborador] = useState('');
  const [filter, updateFilter] = useState(1);
  const [historic, updateHistoric] = useState([]);

  const [lastDate, updateLastDate] = useState(0);

  useEffect(() => {
    fetch(maintainerUrl + params.colaboradorId)
    .then((response) => response.json())
    .then((data) => {
      atualizaColaborador(data)
    })
    .catch((err) => {
      console.log(err.message)
    })

    fetch(historicUrl + params.colaboradorId + '&orderBy=createdAt-desc')

    .then((response) => response.json())
    .then((data) => {
      updateHistoric(data)
    })
    .catch((err) => {
      console.log(err.message)
    })

  }, [])

  useEffect(() => {
    let filteredHistoric = [];
    let lastDate = 99999999999
    historic.map((entry) => {
      if(lastDate - dateToSeconds(entry.createdAt) >= filter){
        filteredHistoric.push(
          createData(entry.esp.mac,
            entry.espSector? entry.espSector.name : undefined,
            entry.createdAt.slice(8,10) + '/' + entry.createdAt.slice(5,7) + '/' + entry.createdAt.slice(0,4) + ' - ' + entry.createdAt.slice(11, 16))
        )
        lastDate = dateToSeconds(entry.createdAt)
      }

    updateRowsFormatadas(filteredHistoric)

    })
  }, [historic, filter])

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

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0", marginBottom: "0"}} >{colaborador.name}</h1>
        <h2 style={{marginTop:"0.5%", marginBottom:"0.5%"}} >{colaborador.rfid}</h2>
        <div style={{alignItems:"left", marginBottom:"1%", width:"100%"}}>
          <SelectInterval updateFilter={updateFilter} valores={[5, 10, 15, 30, 60]}></SelectInterval>
        </div>
        <TabelaColaborador rows={rowsFormatadas} columns={columns}/>
      </div>
    </div>
  </>
  )
}

export default Colaborador