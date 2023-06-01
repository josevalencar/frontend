import React from 'react'
import { useParams } from "react-router-dom"

const Colaborador = () => {
  let params = useParams();
  return (
    <div>
      Olá. Meu id é {params.colaboradorId}
    </div>
  )
}

export default Colaborador
