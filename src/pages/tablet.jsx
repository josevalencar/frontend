import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import DateForm from '../components/datePicker'
import SelectInterval from '../components/selectInterval'
import dateToMinutes from '../helpers/inputDateToMinutes'

import TabelaColaborador from "../components/tabelaColaborador"

const Tablet = () => {
  let params = useParams();
  let url = "https://2d1oh9-3000.csb.app/v1/historics?esp=";


  const [rowsFormatadas, updateRowsFormatadas] = useState([]);
  const [rows, updateRows] = useState([]);
  const [mac, updateMac] = useState("");
  const [filter, updateFilter] = useState(1);
  const [startDate, updateStartDate] = useState(0);
  const [endDate, updateEndDate] = useState(999999999)


  useEffect(() => {
    fetch(url + params.tabletId + "&orderBy=createdAt-desc")
    .then((response) => response.json())
    .then((data) => {
      updateRows(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

  useEffect(() => {
    if(rows.length > 0){
      updateMac(rows[0].esp.mac)
      console.log(rows[0].esp.mac)
    }
  }, [rows])

  useEffect(() => {    
    let filteredHistoric = [];
    let lastDate = 99999999999
    rows.map((entry) => {
      if(lastDate - dateToMinutes(entry.createdAt) >= filter && dateToMinutes(entry.createdAt) >= startDate && dateToMinutes(entry.createdAt) <= endDate){
        filteredHistoric.push(
          createData(entry.esp.mac,entry.maintainer? entry.maintainer.name: "Colaborador sem nome",
            entry.espSector? entry.espSector.name : "Setor sem cadastro",
            entry.createdAt.slice(8,10) + '/' + entry.createdAt.slice(5,7) + '/' + entry.createdAt.slice(0,4) + ' - ' + entry.createdAt.slice(11, 16))
        )
        lastDate = dateToMinutes(entry.createdAt)
      }

    updateRowsFormatadas(filteredHistoric)
    })
  }, [rows, filter, startDate, endDate])

  function createData(tablet, colaborador, setor, data) {
    return {tablet, colaborador, setor, data};
  }

  const columns = [
    { id: 'tablet', label: 'Tablet', align: 'center', minWidth: 20 },
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
    createData("A301",<Link to='/colaboradores/Maia'>Marcelo Maia</Link>, "Vulcanização", "12/11/2002 - 14:15"),
  ]

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0"}} >{mac}</h1>
        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
          <div style={{alignItems:"left", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <SelectInterval updateFilter={updateFilter} valores={[5, 10, 15, 30, 60]} />
          </div>
          <div style={{alignItems:"center", justifyContent:"flex-end", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
            <p style={{color:"gray"}}>De</p> <DateForm updateDate={updateStartDate} /> <p style={{color:"gray"}}>a</p> <DateForm updateDate={updateEndDate} />
          </div>
        </div>
        <TabelaColaborador rows={rowsFormatadas} columns={columns} />
      </div>
    </div>
  </>
  )
}

export default Tablet