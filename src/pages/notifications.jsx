import * as React from 'react';
import Typography from '@mui/joy/Typography';
import TableNotifications from '../components/tableNotifications';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import DeleteIcon from '@mui/icons-material/Delete';
import SelectNotifications from '../components/selectNotifications';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import SearchBar from '../components/searchBar'

import BaseModal from '../components/baseModal';
import ContentDeleteModal from '../components/contentDeleteModal';
import { useState } from 'react';
import './notifications.css'; // Importando o arquivo CSS


const Notifications = () => {
    
    
    const [rows, updateRows] = React.useState([]);

    const [rowsFormatadas, updateRowsFormatadas] = React.useState([]);
    
    const [filter, updateFilter] = React.useState([]);
    
    const [state, updateState] = React.useState([]);
    

    const [selectedNotificationId, setSelectedNotificationId] = React.useState(false);


    const [deleteModals, setDeleteModals] = useState([]);
    
    const [error, setError] = React.useState(false);
    
    const [success, setSuccess] = React.useState(['', false]);
    
    const handleDeleteRow = (id) => {
        // Replace this with your own logic to delete the row with the specified ID
        console.log(`Delete row with ID ${id}`);

        setSelectedNotificationId(id);
    }

    // const handleCloseDelete = () => setOpenDelete('');

    
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

            width: 800,

        },
        {
            field: 'date',
            headerName: 'Data de aviso',
            width: 200,

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
            width: 75,
            renderCell: (params) => (
                <div>
                    { params.row.state === 'unchecked'?
                        <VisibilityIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleStatusChange(params.row.id)}
                        />
                        :
                        <VisibilityOffIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStatusChange(params.row.id)}/>
                    }            
                    <DeleteIcon
                    style={{cursor: 'pointer'}}
                    onClick={() => handleDeleteRow(params.row.id)}/>

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
                notification.state,
                notification.createdAt
                // <DeleteIcon
                //     style={{ cursor: 'pointer' }}
                //     onClick={() => handleDeleteRow(notification.id)}
                // />
            ))
            modalsArray.push(
                <BaseModal open={selectedNotificationId === notification.id}  setOpen={() => setSelectedNotificationId(notification.id)} content={<ContentDeleteModal content={notification.content} handleDelete={handleDelete} id={notification.id} />} />

                )
                return null
        })
        updateRows(returnArray)
        setDeleteModals(modalsArray)
    }, [ rowsFormatadas, selectedNotificationId])

    React.useEffect(() => {
        fetch(`https://2d1oh9-3000.csb.app/v1/notifications${filter ? `?filter=${filter}` : ''}`)
        .then((response) => response.json())
        .then(data => {
            // Mapeie os dados para criar uma nova propriedade 'id' para cada item
            const newData = data.map(item => ({
                ...item,
                createdAt: formatISODateToBR(item.createdAt),
                id: item._id,
            }));
            
                updateRowsFormatadas(newData);
                updateRows(newData)
                console.log("logica de filtro on rapeize")
            })
            // .then(data => updateRows(data))
        .catch((err) => {
            console.log(err.message);
        });
    }, [filter])
    
    function createData( id, content, state, date) {
        return { id, content, state, date};

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
        setSelectedNotificationId(null)

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
                <div>
                    <SearchBar updateFilter={updateFilter} />
                </div>

                <TableNotifications rows={rows} columns={columns}> </TableNotifications>
            </div>
            {deleteModals.map((modal) => {
                return modal
            })}
        </>
    );
}

export default Notifications
