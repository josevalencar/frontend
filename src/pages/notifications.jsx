import * as React from 'react';
import Typography from '@mui/joy/Typography';
import TableNotifications from '../components/tableNotifications';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectNotifications from '../components/selectNotifications';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import BaseModal from '../components/baseModal';
import ContentDeleteModal from '../components/contentDeleteModal';
import { useState } from 'react';
import './notifications.css'; // Importando o arquivo CSS


const Notifications = () => {
    
    
    const [rows, updateRows] = React.useState([]);

    const [rowsFormatadas, updateRowsFormatadas] = React.useState([]);
    
    const [filter, updateFilter] = React.useState([]);
    
    const [state, updateState] = React.useState([]);
    
    const [openDelete, setOpenDelete] = React.useState(false);

    const [deleteModals, setDeleteModals] = useState([]);
    
    const [error, setError] = React.useState(false);
    
    const [success, setSuccess] = React.useState(['', false]);
    
    const handleDeleteRow = (id) => {
        // Replace this with your own logic to delete the row with the specified ID
        console.log(`Delete row with ID ${id}`);
    }

    const handleCloseDelete = () => setOpenDelete('');
    
    const getCellBorderColorClass = (cellValue) => {
        if (cellValue === 'unchecked') {
            return 'orange-border';
        }
        if (cellValue === 'checked') {
            return 'green-border';
        }
        if (cellValue === 'INFO') {
            return 'blue-border';
        }
        // Adicione mais condições aqui para outros valores e classes de cores
        return '';
    };

    function formatISODateToBR(dateStr) {
        const dateObj = new Date(dateStr);
    
        // Formata a data
        const date = dateObj.toLocaleDateString('pt-BR');
        
        // Formata a hora e minutos
        const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        console.log(`${date} ${time}`)

    
        return `${date} ${time}`;
    }

    function UpdateState(row, newState){
        console.log("nhaaaaa juba")
        console.log(row)
        fetch("https://2d1oh9-3000.csb.app/v1/notifications/" + row.id, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: null,
                maintainer: null,
                sector: null,
                esp: null,
                router: null,
                category: null,
                state: newState
            })
        })
        // console.log(res)
        .then(res => {
            if(res.ok){
                console.log("foi")
                setSuccess(['atualizado', true])
            }
            else{
                console.log("n foi")
                setError(true);
            }
        })
        .catch((error) => console.log(error))
    }

    const handleStatusChange = (id) => {

        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                console.log(row);
                UpdateState(row, (row.state === "unchecked"?"checked":"unchecked"))
                return { ...row, state: row.state === 'unchecked' ? 'checked' : 'unchecked' };
            }
            return row;
        });

        updateRows(updatedRows);
    };

    
    const columns = [
        {   
            field: 'content', 
            headerName: 'Mensagem', 
            width: 600,
        },
        {
            field: 'date',
            headerName: 'Data de aviso',
            width: 300,
            disableColumnFilter: true,
            // renderCell: (params) => (
            //     <div className={`bordered-cell ${getCellBorderColorClass(params.value)}`}>
            //     {params.value}
            // </div>
            // ),
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params) => (
                <div>
                    <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteRow(params.row.id)}
                        />
                </div>
            ),
        },
    ];

    React.useEffect(() => {
        fetch("https://2d1oh9-3000.csb.app/v1/notifications")
        .then((response) => response.json())
        .then(data => {
            // Mapeie os dados para criar uma nova propriedade 'id' para cada item
            const newData = data.map(item => ({
                ...item,
                createdAt: formatISODateToBR(item.createdAt),
                id: item._id,
            })
            );
            
                updateRowsFormatadas(newData);
                updateRows(newData)
                console.log("fui executado 1 vez")
            })
            // .then(data => updateRows(data))
            .catch((err) => {
                console.log(err.message);
            });
        }, [])
        
    React.useEffect(() => {
        let returnArray = [];
        let modalsArray = [];
        let newRows = [];
        rows.map((notification) => {
            console.log(notification.createdAt)
            returnArray.push(
                createData(notification.id, 
                notification.content,
                notification.createdAt,
                <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteRow(notification.id)}
                />
            ))
            modalsArray.push(
                <BaseModal open={openDelete === 'delete_' + notification.id}  handleClose={handleCloseDelete} content={<ContentDeleteModal content={notification.content} handleDelete={handleDelete} id={notification.id} />} />
                )
                return null
        })
        updateRows(returnArray)
        setDeleteModals(modalsArray)
    }, [ rowsFormatadas, filter, openDelete])
    
    function createData( id, content, date, deletar) {
        return { id, content, date, deletar};
    }
        
    const handleDelete = (id) => {
        fetch('https://2d1oh9-3000.csb.app/v1/notifications/' + id, {
          method: 'DELETE'
        })
          .then(response => {
            if (response.ok) {
              // Handle successful deletion
            //   setGet((former) => former + 1)
              setSuccess(['apagado', true])
            } else {
              // Handle non-successful response
              setError(true);
            }
          })
          .catch(error => {
            // Handle network error
            console.error('Network error:', error);
          });
        handleCloseDelete()
      };

    return (
        <>
            <div className="selectDiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>

                {error ? <Alert severity='error' action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setError(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>Algo deu errado. Verifique as informações inseridas e, se o erro persistir, peça ajuda a um administrador.</Alert> : <></> }

                {success[1] ? <Alert severity='success' action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setSuccess(['', false]);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>Colaborador {success[0]} com sucesso.</Alert> : <></> }

                <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                    Notificações
                </Typography>
                <SelectNotifications updateFilter={updateFilter}></SelectNotifications>
                <TableNotifications rows={rows} columns={columns}> </TableNotifications>
            </div>
            {deleteModals.map((modal) => {
                return modal
            })}
        </>
    );
}

export default Notifications
