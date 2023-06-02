import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import React from 'react';


const TableTablet = () => {
  // Dados dos tablets
  const tablets = [
    { id: 1, name: 'Tablet 1' },
    { id: 2, name: 'Tablet 2' },
    { id: 3, name: 'Tablet 3' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <Table style={{ maxWidth: '1000px' }}>
        <TableBody>
          {tablets.map((tablet) => (
            <TableRow key={tablet.id}>
              <TableCell>{tablet.name}</TableCell>
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

  );
};

export default TableTablet;
