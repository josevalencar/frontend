import { useState, useEffect } from 'react'
import Kpi from './kpi'
import TabletMacTwoToneIcon from '@mui/icons-material/TabletMacTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';
import WifiOffTwoToneIcon from '@mui/icons-material/WifiOffTwoTone';
import dateToSeconds from '../../../helpers/dateToMinutes';

const Kpis = () => {

  const [colaboradores, setColaboradores] = useState([])
  const [qtdColaboradores, setQtdColaboradores] = useState(0)
  const [setores, setSetores] = useState([])
  const [qtdSetores, setQtdSetores] = useState(0)
  const [roteadores, setRoteadores] = useState([])
  const [qtdRoteadores, setQtdRoteadores] = useState(0)
  const [historics, setHistorics] = useState([])
  const [tabletsUsadosRecentemente, setTabletsUsadosRecentemente] = useState(0)

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/maintainers")
      .then((response) => response.json())
      .then(data => setColaboradores(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => setSetores(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => setRoteadores(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/historics")
      .then((response) => response.json())
      .then(data => setHistorics(data))
      .catch((err) => {
        console.log(err.message);
     });
  }, [])

  useEffect(() => {
    if (!(colaboradores.length === 0)){
      setQtdColaboradores(colaboradores.length)
    }
    if (!(setores.length === 0)){
      console.log(roteadores)
      setQtdSetores(setores.length)
    }
    if (!(colaboradores.length === 0)){
      setQtdRoteadores(roteadores.length)
    }
  }, colaboradores, setores, roteadores)

  useEffect(() => {
    if (historics.length > 0){
      let currentTime = dateToSeconds(historics[0].createdAt)
      let espsUtilizados = []
      historics.map((historic) => {
        if (currentTime - dateToSeconds(historic.createdAt) <= currentTime - 8*60 && !(espsUtilizados.includes(historic.esp._id))){
          espsUtilizados.push(historic.esp._id)
        }
      })
      setTabletsUsadosRecentemente(espsUtilizados.length)
    }
  }, [historics])

  return (
    <div style={{width:"100%", height:"100%", margin:"0%", display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
        <div style={{width:"100%", height:"100%"}}>
          <Kpi ammount={qtdColaboradores} text="Número de colaboradores" color="aquamarine" icon={<AccountCircleTwoToneIcon sx={{width:"50%", height:"50%"}}/>} />
        </div>
        <div style={{width:"100%", height:"100%"}}>
          <Kpi ammount={qtdSetores} text="Número de setores" color="lightGreen" icon={<TabletMacTwoToneIcon sx={{width:"50%", height:"50%"}}/>} />
        </div>
        <div style={{width:"100%", height:"100%"}}>
          <Kpi ammount={qtdRoteadores} text="Número de roteadores" color="red" icon={<WifiOffTwoToneIcon sx={{width:"50%", height:"50%"}}/>} />
        </div>
        <div style={{width:"100%", height:"100%"}}>
          <Kpi ammount={tabletsUsadosRecentemente} text="Quantidade de tablets utilizados nas últimas 8 horas" color="pink" icon={<AutoGraphTwoToneIcon sx={{width:"50%", height:"50%"}}/>} />
        </div>
    </div>
  )
}

export default Kpis
