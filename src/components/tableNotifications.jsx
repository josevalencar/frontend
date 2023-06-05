import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const handleDeleteRow = (id) => {
    // Replace this with your own logic to delete the row with the specified ID
    console.log(`Delete row with ID ${id}`);
}

const getCellBorderColorClass = (cellValue) => {
    if (cellValue === 'PENDENTE') {
        return 'orange-border';
    }
    if (cellValue === 'RESOLVIDO') {
        return 'green-border';
    }
    if (cellValue === 'INFO') {
        return 'blue-border';
    }
    // Adicione mais condições aqui para outros valores e classes de cores
    return '';
};

const TableNotifications = () => {
    const [rows, setRows] = useState([
        { id: 1, col1: 'Tablet A2303 se desconectou da rede Wi-Fi', col2: 'RESOLVIDO', col3: 'TESTE' },
        { id: 2, col1: 'Tablet A1589 foi conectado à rede Wi-Fi', col2: 'RESOLVIDO' },
        { id: 3, col1: 'Tablet A0663 saiu do setor MANUTENÇÃO', col2: 'PENDENTE' },
    ]);

    const handleStatusChange = (id) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, col2: row.col2 === 'PENDENTE' ? 'RESOLVIDO' : 'PENDENTE' };
            }
            return row;
        });

        setRows(updatedRows);
    };

    const columns = [
        { field: 'col1', headerName: 'Mensagem', width: 600 },
        {
            field: 'col2',
            headerName: 'Status',
            width: 300,
            disableColumnFilter: true,
            renderCell: (params) => (
                <div className={`bordered-cell ${getCellBorderColorClass(params.value)}`}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params) => (
                <div>
                    <ChangeCircleRoundedIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStatusChange(params.row.id)}
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
            <div style={{ height: 300, width: 1200 }}>
                <DataGrid rows={rows} columns={columns} disableColumnMenu />
            </div>
        </>
    );
}

export default TableNotifications; 