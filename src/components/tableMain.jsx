import Table from '@mui/joy/Table';
import React from 'react';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';  

function createData(Tablet, Colaborador, Localizacao) {
  return { Tablet, Colaborador, Localizacao };
}

const rows = [
  createData("122A", "Henrique Godas", "vulcanização"),
  createData('2908B',"Juba bont", "Qualidade"),
  createData('137A', "Maia Filho", "Diretoria"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('2908B',"Juba bont", "Qualidade"),
  createData('2908B',"Juba bont", "Qualidade"),
  createData('2908B',"Juba bont", "Qualidade"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('394A', "José Alenk", "Vulcanização"),
  createData('137A', "Maia Filho", "Diretoria"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
  createData('2348B', "Yuri toledo", "Compressão"),
];

export default function TableMain() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <div>
                <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                Informações
                </Typography>
                <Sheet sx={{ height: 400, overflow: 'auto', width: 1200 , alignItems: 'center'}}>
                <Table
                    aria-label="table with sticky header"
                    stickyHeader
                    stripe="odd"
                    hoverRow
                >
                    <thead>
                    <tr>
                        <th>Tablet</th>
                        <th>Colaborador</th>
                        <th>Localização</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.Tablet}>
                        <td>{row.Tablet}</td>
                        <td>{row.Colaborador}</td>
                        <td>{row.Localizacao}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Sheet>
            </div>
        </div>
    );
  }