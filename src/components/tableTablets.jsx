import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom'
import React from 'react';
import TabelaColaborador from "../components/tabelaColaborador"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
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
  // Dados dos tablets
  function createData(tablet, colaborador, setor, Historico) {
    return { tablet, colaborador, setor, Historico};
  }

  const columns = [
    { id: 'tablet', label: 'tablet', align: 'center', minWidth: 20 },
    { id: 'colaborador', label: 'Colaborador', align: 'center', minWidth: 20 },
    { id: 'setor', label: 'Setor', align: 'center', minWidth: 20 },
    {
      id: 'Historico',
      label: 'Histórico',
      Width: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const initialRows = [
    createData("A301", <Link to='/colaboradores/Maia'>Marcelo Maia</Link>, "Vulcanização",<HistorySharpIcon/> ),
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
};


export default TableTablet;
