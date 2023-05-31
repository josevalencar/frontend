// import React from 'react'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const handleDeleteRow = (id) => {
    // Replace this with your own logic to delete the row with the specified ID
    console.log(`Delete row with ID ${id}`);
}

const rows = [
    { id: 1, col1: 'Tablet A2303 se desconectou da rede Wi-Fi', col2: 'PENDENTE', col3: 'TESTE' },
    { id: 2, col1: 'Tablet A1589 foi conectado à rede Wi-Fi', col2: 'INFO' },
    { id: 3, col1: 'Tablet A0663 saiu do setor MANUTENÇÃO', col2: 'INFO' },
];

const columns = [
    { field: 'col1', headerName: 'Mensagem', width: 600 },
    { field: 'col2', headerName: 'Status', width: 300, disableColumnFilter: true },
    {
        field: 'actions',
        headerName: 'Ações',
        width: 100,
        renderCell: (params) => (
            <div>
                <EditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteRow(params.row.id)}
                />
                <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteRow(params.row.id)}
                />
            </div>
        ),
    },
];

const Notifications = () => {

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} disableColumnMenu />
        </div>
    );
}

export default Notifications
