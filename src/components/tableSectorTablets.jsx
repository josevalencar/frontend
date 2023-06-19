import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';



export default function TableSectorTablets(props) {

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);
  const [get, setGet] = useState([0]);
  const [success, setSuccess] = useState(['', false]);
  const [error, setError] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(null);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate('');


  return (
    <>
    <div style={{ width: 1000, height: 600}}>
    <DataGrid 
        rows={props.rows} 
        columns={props.columns} />
    </div>
  </>
  )
};


