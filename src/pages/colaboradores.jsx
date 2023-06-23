import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TabelaColaboradores from '../components/tabelaColaboradores'
import SearchBar from '../components/searchBar'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import removerAcentos from '../helpers/removerAcentos';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import BaseModal from '../components/baseModal';
import ContentDeleteModal from '../components/contentDeleteModal';
import UpdateMaintainer from '../components/updateMaintainer';
import Button from '@mui/material/Button';
import CreateMaintainer from '../components/createMaintainer';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';


const Colaboradores = () => {

  const [rows, updateRows] = useState([]);

  const [filter, updateFilter] = useState('');

  const [rowsFormatadas, updateRowsFormatadas] = useState([]);

  const [openDelete, setOpenDelete] = useState(null);

  const [deleteModals, setDeleteModals] = useState([]);

  const [get, setGet] = useState([0]);

  const [sectors, setSectors] = useState([]);

  const [openUpdate, setOpenUpdate] = useState(null);

  const [openCreate, setOpenCreate] = useState(false);

  const [error, setError] = useState(false);

  const [success, setSuccess] = useState(['', false]);


  function handleOpenDelete(id){
    setOpenDelete('delete_' + id)
  }

  function handleOpenUpdate(id){
    setOpenUpdate('update_' + id)
  }

  function handleOpenCreate(){
    setOpenCreate(true);
  }

  const handleCloseDelete = () => setOpenDelete('');
  const handleCloseUpdate = () => setOpenUpdate('');
  const handleCloseCreate = () => setOpenCreate(false);

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => setSectors(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/maintainers")
      .then((response) => response.json())
      .then(data => updateRows(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [get])

  useEffect(() => {
    let returnArray = [];
    let modalsArray = [];
    let newRows = [];
    rows.map((manutentor) => {
      returnArray.push(
        createData(<IconButton onClick={() => handleOpenUpdate(manutentor._id)} ><EditIcon/></IconButton>,
        <Link to={'/colaboradores/' + manutentor._id} key={manutentor}>{manutentor.name}</Link>,
        manutentor.rfid,
        <IconButton component={Link} to={"/colaboradores/" + manutentor._id } ><HistorySharpIcon/></IconButton>,
        <IconButton onClick={() => handleOpenDelete(manutentor._id)} ><DeleteOutlineIcon/></IconButton>
      ))
      modalsArray.push(
        <BaseModal open={openDelete === 'delete_' + manutentor._id}  handleClose={handleCloseDelete} content={<ContentDeleteModal nome={manutentor.name} handleDelete={handleDelete} id={manutentor._id} />} />
      )
      modalsArray.push(
        <BaseModal open={openUpdate === 'update_' + manutentor._id} handleClose={handleCloseUpdate} content={<UpdateMaintainer manutentor={manutentor} sectors={sectors} setGet={setGet} handleClose={handleCloseUpdate} setError={setError} setSuccess={setSuccess} />} />
      )
      return null
    })
    for(let row of returnArray){
      if (row.nome.props.children !== null){
        if (removerAcentos(row.nome.props.children.toLowerCase()).includes(filter) || row.nome.props.children.includes(filter)){
          newRows.push(row)
        }
      }
    }
    updateRowsFormatadas(newRows)
    setDeleteModals(modalsArray)
  }, [rows, filter, openDelete, openUpdate])

  function createData(editar, nome, rfid, historico, deletar) {
    return { editar, nome, rfid, historico, deletar};
  }

  const columns = [
    { id: 'editar', label: '', align: 'center', minWidth: 20 },
    { id: 'nome', label: 'Nome', align: 'center', minWidth: 150 },
    {
      id: 'rfid',
      label: 'RFID',
      minWidth: 150,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'historico', label: 'Histórico', align: 'center', minWidth: 150 },
    {
      id: 'deletar',
      label: '',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const handleDelete = (id) => {
    fetch('https://sfqlqf-3000.csb.app/v1/maintainers/' + id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Handle successful deletion
          setGet((former) => former + 1)
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

      <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
        <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginTop: "0" }}>Colaboradores</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
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
          </div>
        </div>
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
          <SearchBar updateFilter={updateFilter} type="colaborador" />
          <Button onClick={handleOpenCreate}>Adicionar</Button>
          <BaseModal open={openCreate} handleClose={handleCloseCreate} content={<CreateMaintainer sectors={sectors} setGet={setGet} handleClose={handleCloseCreate} setError={setError} setSuccess={setSuccess} />} />
        </div>
          <div style={{ width: "80%", display: "flex", justifyContent: "center" }}>
            <TabelaColaboradores rows={rowsFormatadas} columns={columns} />
          </div>
        {deleteModals.map((modal) => {
          return modal
        })}
      </div>
    </>
  )
}

export default Colaboradores
