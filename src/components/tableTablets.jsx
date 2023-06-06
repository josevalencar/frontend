import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TabelaColaborador from "../components/tabelaColaborador"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/joy/Typography';
import TableHead from '@mui/material/TableHead';

function createData(Tablet, Colaborador, Localizacao, Histórico) {
  return { Tablet, Colaborador, Localizacao, Histórico};
}

const columns = [
  { id: 'Tablet', label: 'Tablet', align: 'center', minWidth: 20 },
  { id: 'Colaborador', label: 'Colaborador', align: 'center', minWidth: 150 },
  {
    id: 'Localizacao',
    label: 'Localizacao',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Histórico',
    label: '',
    minWidth: 20,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const TableTablet = () => {
  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/esps")
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
        createData( <Link to={'/tablets/' + tablet._id} key={tablet}>{tablet.mac}</Link>,
        <IconButton component={Link} to={"/tablets/" + tablet._id } ><HistorySharpIcon/></IconButton>)
      )
    })
    updateRowsFormatadas(returnArray)
  }, [rows])


  // Dados dos tablets
  function createData(tablet,Historico) {
    return { tablet,Historico};
  }

  const columns = [
    { id: 'tablet', label: 'tablet', align: 'center', minWidth: 20 },
    {
      id: 'Historico',
      label: 'Histórico',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialRows = [
    createData("A301",<IconButton component={Link} to={"/tablets/" + 1} ><HistorySharpIcon/></IconButton> ),
  ]

  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
        <h1 style={{marginTop:"0"}} >Tablets</h1>
        <TabelaColaborador rows={rowsFormatadas} columns={columns} />
      </div>
    </div>
  </>
  )
};


export default TableTablet;
