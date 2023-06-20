import * as React from 'react';
import Typography from '@mui/joy/Typography';
import DatePicker from '../components/datePicker'
import { Link } from 'react-router-dom'
import TableSectorTablets from '../components/tableSectorTablets'
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const SectorTablets = () => {

    const { sectorName } = useParams();

    console.log(sectorName);

    const [rows, updateRows] = useState([]);

    const [rowsFormatadas, updateRowsFormatadas] = useState([]);
    
    const [filter, updateFilter] = useState([]);
    
    const [startDate, updateStartDate] = useState(0);
    const [endDate, updateEndDate] = useState(9999999999);
    const [selectedSectorId, setSelectedSectorId] = useState(false);
    const [get, setGet] = useState([0]);
    const [success, setSuccess] = useState(['', false]);
    const [error, setError] = useState(false);


    function formatISODateToBR(dateStr) {
        const dateObj = new Date(dateStr);
    
        // Formata a data
        const date = dateObj.toLocaleDateString('pt-BR');
        
        // Formata a hora e minutos
        const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        
        return `${date} ${time}`;
    }
    
    useEffect(() => {
        // fetch(`https://sfqlqf-3000.csb.app/v1/esps${filter ? `?filter=${sectorName}` : ''}`)
        fetch(`https://sfqlqf-3000.csb.app/v1/historics`)
        .then((response) => response.json())
        .then(data => {
            // Mapeie os dados para criar uma nova propriedade 'id' para cada item
            const newData = data.map(item => ({
                ...item,
                id: item._id,
            }));
            
                updateRowsFormatadas(newData);
                updateRows(newData)
            })
            // .then(data => updateRows(data))
        .catch((err) => {
            console.log(err.message);
        });
    }, [])
    
    const columns = [
        { field: 'name', headerName: 'Nome do tablet', width: 400 },
        { field: 'mac', headerName: 'Endereço Mac', width: 400 },
        {
        field: 'historico',
        headerName: 'Histórico',
        width: 200,
        renderCell: (params) => (
            <div >
                <IconButton component={Link} to={"/tablets/" + params.row.id } ><HistorySharpIcon sx={{ color: '#000000' }} /></IconButton>
            </div>
        ),
        },
    ];

        
    useEffect(() => {
        let returnArray = [];
        let newRows = [];
        rows.map((tablet) => {
            console.log(tablet.createdAt)
            const connection = tablet.connections[0];
            console.log("connection: ");
            console.log(connection);
            // connection.map((connection2) => {

            // })
            if(connection){
                returnArray.push(
                    createData(tablet.id, 
                    connection.wifiPotency,
                    connection.router.mac,
                
                    ))
                }
            return null
        })
        updateRows(returnArray)
    }, [ rowsFormatadas, selectedSectorId, startDate, endDate])

    
    function createData( id, name, mac, historico) {
        return { id, name, mac, historico};

    }
        
    


    return (
        <>
            <div className="selectDiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>

                <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                    {sectorName}
                </Typography>
                {/* <div>
                    <SearchBar updateFilter={updateFilter} />
                    <DatePicker updateStartDate={updateStartDate} updateEndDate={updateEndDate}/>
                </div> */}

                <TableSectorTablets rows={rows} columns={columns} > </TableSectorTablets>
            </div>
            
        </>
    );
}

export default SectorTablets
