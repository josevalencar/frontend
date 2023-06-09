import { Table, TableBody, TableCell, TableRow, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TabelaColaborador from "../components/tabelaColaborador"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import ModalTablets from './modalTablets';

import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import TableHead from '@mui/material/TableHead';



const TableTablet = () => {
  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/esps?orderBy=createdAt-desc")
      .then((response) => response.json())
      .then(data => updateRows(data))
      .catch((err) => {
        console.log(err.message);
     });

  }, [])

  useEffect(() => {
    let returnArray = [];

    rows.map((tablet) => {
      returnArray.push(
        createData( tablet.tabletName,<Link to={'/tablets/' + tablet._id} key={tablet}>{tablet.mac}</Link>,<ListItemButton sx={{justifyContent:'center'}}><ModalTablets mode="editar" key={'edit_' + tablet._id} />
        <IconButton component={Link} to={"/tablets/" + tablet._id } ><HistorySharpIcon sx={{ color: '#000000' }} /></IconButton></ListItemButton>)
      )
    })
    updateRowsFormatadas(returnArray)
  }, [rows])


  // Dados dos tablets
  function createData(name,tablet,Historico) {
    return { name, tablet,Historico};
  }

  const columns = [
    { id: 'name', label: 'Nome do tablet', align: 'center', minWidth: 20 },
    { id: 'tablet', label: 'tablet', align: 'center', minWidth: 20 },
    {
      id: 'Historico',
      label: 'Histórico',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];



  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0"}} >Tablets</h1>
        <ModalTablets mode="create"/>
        <TabelaColaborador rows={rowsFormatadas} columns={columns} />
      </div>
    </div>
  </>
  )
};


export default TableTablet;
