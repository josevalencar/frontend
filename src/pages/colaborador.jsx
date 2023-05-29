import React from 'react'
import { useParams } from "react-router-dom"

const Colaborador = () => {
  let params = useParams();
  return (
    <div>
      Eu sou o colaborador {params.colaboradorId}
    </div>
  )
}

export default Colaborador
