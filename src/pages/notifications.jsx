import * as React from 'react';
import App from '../App'
import Typography from '@mui/joy/Typography';
import TableNotifications from '../components/tableNotifications';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import SearchBar from '../components/searchBar'
import BaseModal from '../components/baseModal';
import ContentDeleteModal from '../components/contentDeleteModal';
import { useState } from 'react';
import DateForm from '../components/datePicker'
import './notifications.css'; // Importando o arquivo CSS
import dateToMinutes from "../helpers/dateToMinutes"


const Notifications = ( {updateHaveUnread} ) => {
    
    const [hasUnread, updateHasUnread] = React.useState(false);

    const [changedNotificationState, updateChangedNotificationState] = React.useState(false)
    
    // console.log(hasUnread)

    const [rows, updateRows] = React.useState([]);

    const [rowsFormatadas, updateRowsFormatadas] = React.useState([]);
    
    const [filter, updateFilter] = React.useState([]);
    
    const [startDate, updateStartDate] = useState(0);
    const [endDate, updateEndDate] = useState(9999999999);
    
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

    function formatISODateToBR(dateStr) {
        const dateObj = new Date(dateStr);
    
        // Formata a data
        const date = dateObj.toLocaleDateString('pt-BR');
        
        // Formata a hora e minutos
        const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
    
        return `${date} ${time}`;
    }

    function stringParaObjetoData(stringDataHora) {
        const [data, hora] = stringDataHora.split(' ');
        const [dia, mes, ano] = data.split('/');
        const [horas, minutos] = hora.split(':');
      
        const objetoData = new Date();
        objetoData.setFullYear(ano, mes - 1, dia);
        objetoData.setHours(horas, minutos, 0, 0);
      
        return objetoData;
      }
      
      
      

    //verifica state das notificações para troca de ícone
    React.useEffect(() => {

        console.log("o update state chamou o useEffect")
        console.log("changedNotificationState: ")
        console.log(changedNotificationState)

        if(changedNotificationState == true){
            console.log("changedNotifications == true")
            fetch("https://2d1oh9-3000.csb.app/v1/notifications")
            .then((response) => response.json())
            .then(data => {
                // Mapeie os dados para criar uma nova propriedade 'id' para cada item
                const uncheckedNotification = data.some(item => {
                return item.state === 'unchecked';
                });
                console.log("uncheckedNotification: ")
                console.log(uncheckedNotification)
                updateHaveUnread(uncheckedNotification)
            })
            updateChangedNotificationState(false)
        }
        
    },[ , changedNotificationState ])

    function UpdateState(row, newState){
        console.log("nhaaaaa juba");
        // console.log(row)
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
                setSuccess(['atualizado', true])
                updateChangedNotificationState(true);
            }
            else{
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

            const newDataFormatada = data.map(item => ({
                ...item,
                createdAt: formatISODateToBR(item.createdAt),
                id: item._id,
            }));

            const newData = data.map(item => ({
                ...item,
                id: item._id,
            })
            );
            
                updateRowsFormatadas(newData);
                updateRows(newDataFormatada)
            })
            // .then(data => updateRows(data))
            .catch((err) => {
                console.log(err.message);
            });

            updateChangedNotificationState(true)
        }, [])
        
    React.useEffect(() => {
        let returnArray = [];
        let modalsArray = [];
        rowsFormatadas.map((notification) => {
            console.log("printando o createdAt da notificação: ")
            console.log(notification.createdAt)

            if((dateToMinutes(notification.createdAt) >= startDate && dateToMinutes(notification.createdAt) <= endDate) || (startDate === 0 && endDate === 9999999999))
            {
                returnArray.push(
                    createData(notification.id, 
                    notification.content,
                    notification.state,
                    formatISODateToBR(notification.createdAt)
                    // <DeleteIcon
                    //     style={{ cursor: 'pointer' }}
                    //     onClick={() => handleDeleteRow(notification.id)}
                    // />
                ))
                modalsArray.push(
                    <BaseModal open={selectedNotificationId === notification.id}  setOpen={() => setSelectedNotificationId(notification.id)} content={<ContentDeleteModal content={notification.content} handleDelete={handleDelete} id={notification.id} />} />
                )
            }
                return null
        })
        updateRows(returnArray)
        setDeleteModals(modalsArray)
    }, [ rowsFormatadas, selectedNotificationId, startDate, endDate])

    React.useEffect(() => {
        fetch(`https://2d1oh9-3000.csb.app/v1/notifications${filter ? `?filter=${filter}` : ''}`)
        .then((response) => response.json())
        .then(data => {
            // Mapeie os dados para criar uma nova propriedade 'id' para cada item
            const newData = data.map(item => ({
                ...item,
                createdAt: item.createdAt,
                id: item._id,
            }));
            const newDataFormatada = data.map(item => ({
                ...item,
                createdAt: formatISODateToBR(item.createdAt),
                id: item._id,
            }));
                // console.log(newData)
                updateRowsFormatadas(newData);
                updateRows(newDataFormatada)
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
                    <div style={{display: "flex", flexDirection:"row", width:"100%"}}>
                        <div style={{alignItems:"center", justifyContent:"flex-end", marginBottom:"1%", width:"50%", flexDirection:"row", display:"flex"}}>
                            <p style={{color:"gray"}}>De</p> <DateForm updateDate={updateStartDate} /> <p style={{color:"gray"}}>a</p> <DateForm updateDate={updateEndDate} />
                        </div>
                    </div>
                </div>

                <TableNotifications rows={rows} columns={columns}/>
            </div>
            {deleteModals.map((modal) => {
                return modal
            })}
        </>
    );
}

export default Notifications
