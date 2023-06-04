import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TabelaColaboradores from '../components/tabelaColaboradores'
import SearchBar from '../components/searchBar'
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/joy/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import removerAcentos from '../helpers/removerAcentos'

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

  const [rowsFormatadas, updateRowsFormatadas] = useState([])

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/mainteiners")
      .then((response) => response.json())
      .then(data => updateRows(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])


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
    let newRows = [];
    rows.map((manutentor) => {
      returnArray.push(
        createData(<EditIcon key={'edit_' + manutentor._id} />,
        <Link to={'/colaboradores/' + manutentor._id} key={manutentor}>{manutentor.name}</Link>,
        manutentor.rfid,
        <DeleteOutlineIcon key={'delete_' + manutentor._id} />)
      )
    })
    for(let row of returnArray){
      if (removerAcentos(row.nome.props.children.toLowerCase()).includes(filter) || row.nome.props.children.includes(filter)){
        newRows.push(row)
      }
    }
    updateRowsFormatadas(newRows)
  }, [rows, filter])

  function createData(editar, nome, rfid, deletar) {
    return { editar, nome, rfid, deletar};
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
    {
      id: 'deletar',
      label: '',
      minWidth: 20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];



  return (
    <>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
        <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
          <h1>Colaboradores</h1>
          <SearchBar updateFilter={updateFilter} />
          <TabelaColaboradores rows={rowsFormatadas} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default Colaboradores
