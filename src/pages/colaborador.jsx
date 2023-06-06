import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"
import SelectInterval from "../components/selectInterval"

const Colaborador = () => {
  let params = useParams();
  let maintainerUrl = "https://2d1oh9-3000.csb.app/v1/maintainers/";
  let historicUrl = "https://2d1oh9-3000.csb.app/v1/historics?maintainer=";

  const [rows, updateRows] = useState(
    [
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Matéria prima", "12/11/2002 - 15:00"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Matéria prima", "12/11/2002 - 14:55"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Matéria prima", "12/11/2002 - 14:50"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Matéria prima", "12/11/2002 - 14:45"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:40"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:35"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:30"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:25"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:20"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:15"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Inflação", "12/11/2002 - 14:10"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Vulcanização", "12/11/2002 - 14:05"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Vulcanização", "12/11/2002 - 14:00"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Vulcanização", "12/11/2002 - 13:55"),
      createData(<Link to='/colaboradores/Maia'>A301</Link>, "Vulcanização", "12/11/2002 - 13:50"),
    ]
  )

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [colaborador, atualizaColaborador] = useState('');
  const [filter, updateFilter] = useState(1);
  const [historic, updateHistoric] = useState([]);

  useEffect(() => {
    fetch(maintainerUrl + params.colaboradorId)
    .then((response) => response.json())
    .then((data) => {
      atualizaColaborador(data)
    })
    .catch((err) => {
      console.log(err.message)
    })

    fetch(historicUrl + params.colaboradorId)
    .then((response) => response.json())
    .then((data) => {
      updateHistoric(data)
    })
    .catch((err) => {
      console.log(err.message)
    })

  }, [])

  /*useEffect(() => {
    let allRows = rows;
    let returnArray = [];
    allRows.map((row) => {
      if(parseInt(row.data.slice(-2))%filter == 0){
        returnArray.push(row)
      }
    updateRowsFormatadas(returnArray)
    })

  }, [rows, filter])*/

  useEffect(() => {
    let filteredHistoric = [];
    historic.map((entry) => {
      if(entry.createdAt.slice(14,16) % filter == 0){
        filteredHistoric.push(
          createData(entry.esp.mac, entry.espSector, entry.createdAt)
        )
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
        <div style={{position:"relative", float:"left", marginBottom:"1%"}}>
          <SelectInterval updateFilter={updateFilter} valores={[5, 10, 15, 30, 60]}></SelectInterval>
        </div>
        <TabelaColaborador rows={rowsFormatadas} columns={columns}/>
      </div>
    </div>
  </>
  )
}

export default Colaborador