import { Table, TableBody, TableCell, TableRow, Button, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react';
import TabelaColaborador from "../components/tabelaColaborador"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import ModalTablets from './modalTablets';
import AlertSucess from './alerts/error';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import TableHead from '@mui/material/TableHead';
import AlertERROR from './alerts/error';
import AlertSuccess from './alerts/sucess';
import SearchBar from './searchBar';
import removerAcentos from '../helpers/removerAcentos';
import Loading from '../pages/loadingPage';



const TableTablet = () => {

  const [rowsFormatadas, updateRowsFormatadas] = useState([])
  const [rows, updateRows] = useState([]);
  const [get, setGet] = useState([0]);
  const [success, setSuccess] = useState(['', false]);
  const [error, setError] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate('');

  const [filter, updateFilter] = useState('');

  function handleOpenUpdate(id) {
    setOpenUpdate('update_' + id)
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("https://sfqlqf-3000.csb.app/v1/esps?orderBy=createdAt-desc")
      .then((response) => response.json())
      .then(data => {
        updateRows(data)
        setIsLoading(false);
      })

      .catch((err) => {
        console.log(err.message);
      });

  }, [get])

  useEffect(() => {
    let returnArray = [];
    let filteredArray = [];

    rows.map((tablet) => {
      returnArray.push(
        createData(tablet.tabletName, <Link to={'/tablets/' + tablet._id} key={tablet}>{tablet.mac}</Link>, <ListItemButton sx={{ justifyContent: 'center' }}><ModalTablets onClick={() => handleOpenUpdate(tablet._id)} mode="editar" handleClose={handleCloseUpdate} id={tablet._id} key={'edit_' + tablet._id} setGet={setGet} setError={setError} setSuccess={setSuccess} tablet={tablet} />
          <IconButton component={Link} to={"/tablets/" + tablet._id} ><HistorySharpIcon sx={{ color: '#000000' }} /></IconButton></ListItemButton>)
      )
    })
    returnArray.map(row => {
      if (filter !== '') {
        if (row.name !== null && row.tablet !== null) {
          if (removerAcentos(row.name.toLowerCase()).includes(filter) || row.name.includes(filter) || removerAcentos(row.tablet.props.children.toLowerCase()).includes(filter) || row.tablet.props.children.includes(filter)) {
            filteredArray.push(row)
          }
        }
      } else { filteredArray.push(row) }
    })
    updateRowsFormatadas(filteredArray)
  }, [rows, openUpdate, filter])


  // Dados dos tablets
  function createData(name, tablet, Historico) {
    return { name, tablet, Historico };
  }

  const columns = [
    { id: 'name', label: 'Nome do tablet', align: 'center', minWidth: 20 },
    { id: 'tablet', label: 'tablet', align: 'center', minWidth: 20 },
    {
      id: 'Historico',
      label: 'Histórico',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];



  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
        <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginTop: "0" }}>Tablets</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {error ? <AlertERROR setError={setError} /> : null}
            {success[1] ? <AlertSuccess setSuccess={setSuccess} type="Tablet" /> : null}
          </div>
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
          <SearchBar updateFilter={updateFilter} type="tablet" />
          <ModalTablets mode="create" setGet={setGet} handleClose={handleCloseCreate} setError={setError} setSuccess={setSuccess} />
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
          {isLoading ? <Loading /> : (
            <React.Fragment>
              <TabelaColaborador rows={rowsFormatadas} columns={columns} />
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  )
};


export default TableTablet;
