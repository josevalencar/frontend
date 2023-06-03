import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import React from 'react';
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
  const tablets = [
    { id: 1, Tablet: 'Tablet 1',Colaborador:"nicolas", Localizacao: 'eae' },
    { id: 2, Tablet: 'Tablet 2',Colaborador:"nicolas", Localizacao: 'eae' },
    { id: 3, Tablet: 'Tablet 3',Colaborador:"nicolas", Localizacao: 'eae' },
  ];
  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:"center", marginTop:"2px"}}>
      <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px", }}>
        <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
          Tablets
        </Typography>
        <div style={{display: 'flex', width: "fit-content", height: 'max-content' , boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <Table sx={{width: 1200}}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tablets.map((tablet) => (
                <TableRow key={tablet.id}>
                  <TableCell>{tablet.Tablet}</TableCell>
                  <TableCell>{tablet.Colaborador}</TableCell>
                  <TableCell>{tablet.Localizacao}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Histórico
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>

  );
};


export default TableTablet;
