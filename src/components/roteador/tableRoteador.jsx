import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import FormCriarRoteador from './formRoteador';

const handleDeleteRow = (id) => {
    // Replace this with your own logic to delete the row with the specified ID
    console.log(`Delete row with ID ${id}`);
}

const handleEditColumn = (id) => {
    console.log(`Editing row with ID ${id}`);
}

const TableRoteador = ({ roteadores }) => {
    // const [rows, setRows] = useState([
    //     { id: 1, col1: 'Roteador 1', col2: '00:1B:C9:4B:E3:57' },
    //     { id: 2, col1: 'Roteador 2', col2: '00:1B:C9:4B:E3:57' },
    //     { id: 3, col1: 'Roteador 3', col2: '00:1B:C9:4B:E3:57' },
    // ]);

    const rows = roteadores.map((roteador, index) => ({
        id: index,
        nome: roteador.routerName,
        macAddress: roteador.macAddress,
    }));

    const columns = [
        { field: 'nome', headerName: 'Roteadores', width: 600 },
        {
            field: 'macAddress',
            headerName: 'Endereços MAC',
            width: 300,
            disableColumnFilter: true
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params) => (
                <div>
                    <EditIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEditColumn(params.row.id)}
                    />
                    <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteRow(params.row.id)}
                    />
                </div>
            ),
        },
    ];


    return (
        <>
            <div>
                <div style={{ height: 300, width: 1200 }}>
                    <DataGrid rows={rows} columns={columns} disableColumnMenu />
                </div>
            </div>
        </>
    );
}

export default TableRoteador; 