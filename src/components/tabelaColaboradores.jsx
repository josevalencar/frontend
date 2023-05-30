import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const columns = [
  { id: 'editar', label: '', align: 'center', minWidth: 20 },
  { id: 'nome', label: 'Nome', align: 'center', minWidth: 150 },
  {
    id: 'rfid',
    label: 'RFID',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deletar',
    label: '',
    minWidth: 20,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(editar, nome, rfid, deletar) {
  return { editar, nome, rfid, deletar};
}

const rows = [
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
  createData(<EditIcon />, 'Marcelo Maia', "13b957gj", <DeleteOutlineIcon />),
];

export default function TabelaColaboradores() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}