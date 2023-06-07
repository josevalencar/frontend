import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TabelaColaboradores from '../components/tabelaColaboradores'
import SearchBar from '../components/searchBar'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import removerAcentos from '../helpers/removerAcentos';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import IconButton from '@mui/material/IconButton';
import ModalColaboradores from '../components/modalColaboradores'
import ModalConfirmDelete from '../components/modalConfirmDelete';
import ContentDeleteModal from '../components/contentDeleteModal';

const Colaboradores = () => {

  /*const initialRows = [
    createData(<EditIcon />, <Link to='/colaboradores/Maia'>Marcelo Maia</Link>, "suhbdoyas7d8sa", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Juba'>Giuliano Bontempo Domiciano</Link>, "ioasodgoy8sadsah879", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Ze'>Jose Alencar</Link>, "21873t1287ydash", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Fabeta'>Fabeta Piemonte</Link>, "13b957gj", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Tolete'>Yuri Tolete</Link>, "7921ye7821heu", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Dogoy'>Henrique Godoy</Link>, "23198y3821h", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Rafa'>Rafael Techio</Link>, "asidbiuas8", <DeleteOutlineIcon />),
    createData(<EditIcon />, <Link to='/colaboradores/Laiza'>Laíza Ribeiro</Link>, "snajihdisa8", <DeleteOutlineIcon />),
  ]*/
  const [rows, updateRows] = useState([]);

  const [filter, updateFilter] = useState('');

  const [rowsFormatadas, updateRowsFormatadas] = useState([]);

  const [openDelete, setOpenDelete] = useState(null);

  const [deleteModals, setDeleteModals] = useState([]);

  const [get, setGet] = useState([0])


  function handleOpenDelete(id){
    setOpenDelete('delete_' + id)
  }

  const handleClose = () => setOpenDelete('')

  useEffect(() => {
    console.log("fetching")
    fetch("https://2d1oh9-3000.csb.app/v1/maintainers")
      .then((response) => response.json())
      .then(data => updateRows(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [get])


  /*useEffect(() => {
    updateRowsFormatadas(() => {
      let newRows = []
      for(let row of initialRows.current){
        if (removerAcentos(row.nome.props.children.toLowerCase()).includes(filter)){
          newRows.push(row)
        }
      }
      return newRows
    })
  }, [filter]);*/

  useEffect(() => {
    let returnArray = [];
    let modalsArray = [];
    let newRows = [];
    rows.map((manutentor) => {
      returnArray.push(
        createData(<EditIcon key={'edit_' + manutentor._id} />,
        <Link to={'/colaboradores/' + manutentor._id} key={manutentor}>{manutentor.name}</Link>,
        manutentor.rfid,
        <IconButton component={Link} to={"/colaboradores/" + manutentor._id } ><HistorySharpIcon/></IconButton>,
        <IconButton onClick={() => handleOpenDelete(manutentor._id)} ><DeleteOutlineIcon/></IconButton>
      ))
      modalsArray.push(
        <ModalConfirmDelete open={openDelete == 'delete_' + manutentor._id}  handleClose={handleClose} content={<ContentDeleteModal nome={manutentor.name} handleDelete={handleDelete} id={manutentor._id} />} />
      )
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
  }, [rows, filter, openDelete])

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
    fetch('https://2d1oh9-3000.csb.app/v1/maintainers/' + id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Handle successful deletion
          setGet((former) => former + 1)
          alert('Colaborador apagado com sucesso!');
        } else {
          // Handle non-successful response
          console.error('Error deleting item:', response.status);
        }
      })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error);
      });
    handleClose()
  };

  const handleCreate = () => {
    setGet((former) => former + 1)
    alert('Colaborador adicionado com sucesso!');
  }


  return (
    <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
        <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
          <h1>Colaboradores</h1>
          <SearchBar updateFilter={updateFilter} />
          <ModalColaboradores handleCreate={handleCreate} />
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
