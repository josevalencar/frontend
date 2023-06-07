import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"

import TabelaColaborador from "../components/tabelaColaborador"

const Tablet = () => {
  let params = useParams();
  let url = "https://2d1oh9-3000.csb.app/v1/historics?esp=";


  const [rowsFormatadas, updateRowsFormatadas] = useState([]);
  const [rows, updateRows] = useState([]);
  const [mac, updateMac] = useState("");


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
    console.log()
    let returnArray = [];
    rows.map((entry) => {
        returnArray.push(
          createData(entry.esp.mac,entry.maintainer? entry.maintainer.name: undefined,
            entry.espSector? entry.espSector.name : undefined,
            entry.createdAt.slice(8,10) + '/' + entry.createdAt.slice(5,7) + '/' + entry.createdAt.slice(0,4) + ' - ' + entry.createdAt.slice(11, 16))
        )

    updateRowsFormatadas(returnArray)

    })
  }, [rows])

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
        <TabelaColaborador rows={rowsFormatadas} columns={columns} />
      </div>
    </div>
  </>
  )
}

export default Tablet