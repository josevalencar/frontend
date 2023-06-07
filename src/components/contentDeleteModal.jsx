import React from 'react'

const ContentDeleteModal = (props) => {
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
        <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px", textAlign:'center'}}>
          <h3>Tem certeza que deseja apagar o registro do colaborador {props.nome}?</h3>
          <button onClick={() => props.handleDelete(props.id)}>Apagar</button>
        </div>
    </div>
  )
}

export default ContentDeleteModal
