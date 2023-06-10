import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import FormCriarRoteador from './formRoteador';
import CustomModal from './modalEdit';

const TableRoteador = ({ roteadores }) => {

    const rows = roteadores.map((roteador, index) => ({
        id: index,
        nome: roteador.routerName,
        macAddress: roteador.macAddress,
    }));

    const [open, setOpen] = useState(false);

    const handleDeleteRow = (id) => {
        // Replace this with your own logic to delete the row with the specified ID
        console.log(`Delete row with ID ${id}`);
    }

    const handleEditColumn = (id) => {
        console.log(`Editing row with ID ${id}`);
        setOpen(true);
    }

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };


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
                    <CustomModal open={open} setOpen={setOpen} handleClose={handleClose}></CustomModal>
                    <DataGrid rows={rows} columns={columns} disableColumnMenu />
                </div>
            </div>
        </>
    );
}

export default TableRoteador; 