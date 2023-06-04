import React from 'react'

const SelectInterval = (props) => {
  return (
    <select>
        {props.valores.map((valor) => {
            return(<option value = {valor} >{valor} minutos</option>)
        })}
    </select>
  )
}

export default SelectInterval
