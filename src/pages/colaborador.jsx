import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"
import SelectInterval from "../components/selectInterval"
import dateToMinutes from "../helpers/dateToMinutes"
import DateForm from '../components/datePicker'

const Colaborador = (props) => {
  let params = useParams();
  let maintainerUrl = "https://sfqlqf-3000.csb.app/v1/maintainers/";
  let historicUrl = "https://sfqlqf-3000.csb.app/v1/historics?maintainer=";

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [colaborador, atualizaColaborador] = useState('');
  const [filter, updateFilter] = useState(1);
  const [historic, updateHistoric] = useState([]);
  const [startDate, updateStartDate] = useState(0);
  const [endDate, updateEndDate] = useState(9999999999);

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
      console.log(dateToMinutes(entry.createdAt), startDate, endDate)
      if(lastDate - dateToMinutes(entry.createdAt) >= filter && dateToMinutes(entry.createdAt) >= startDate && dateToMinutes(entry.createdAt) <= endDate){
        filteredHistoric.push(
          createData(entry.esp.tabletName,

            props.isAI 
            ?
            entry.iaEspSector? entry.iaEspSector.name : undefined 
            :
            entry.espSector? entry.espSector.name : undefined,
            
            entry.createdAt.slice(8,10) + '/' + entry.createdAt.slice(5,7) + '/' + entry.createdAt.slice(0,4) + ' - ' + entry.createdAt.slice(11, 16))
        )
        lastDate = dateToMinutes(entry.createdAt)
      }

    updateRowsFormatadas(filteredHistoric)

    })
  }, [historic, filter, startDate, endDate])

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
        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
          <div style={{alignItems:"left", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <SelectInterval updateFilter={updateFilter} valores={[5, 10, 15, 30, 60]} />
          </div>
          <div style={{alignItems:"center", justifyContent:"flex-end", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <p style={{color:"gray"}}>De</p> <DateForm updateDate={updateStartDate} /> <p style={{color:"gray"}}>a</p> <DateForm updateDate={updateEndDate} />
          </div>
        </div>
        <TabelaColaborador rows={rowsFormatadas} columns={columns}/>
      </div>
    </div>
  </>
  )
}

export default Colaborador