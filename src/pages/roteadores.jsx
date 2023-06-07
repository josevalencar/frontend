import React, { useEffect, useState } from 'react';
import TableRoteador from '../components/roteador/tableRoteador';
import ModalCriarRoteador from '../components/roteador/modalCreate';
import SearchBar from '../components/roteador/searchbar';

const Roteadores = () => {
  const [roteadores, setRoteadores] = useState([]);

  const adicionarRoteador = (roteador) => {
    setRoteadores([...roteadores, roteador]);
  };

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresComMac = data.map(roteador => ({ ...roteador, macAddress: roteador.mac }));
        setRoteadores(roteadoresComMac);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  // roteadores.map((roteador) => ({
  //   enderecoMac: roteador.mac
  // }));

  //   const rows = roteadores.map((roteador, index) => ({
  //     id: index,
  //     nome: roteador.routerName,
  //     macAddress: roteador.macAddress,
  // }));

  return (
    <>
      <div style={{ paddingLeft: 110 }}>
        <h1>Roteadores</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 110, alignItems: 'center', minHeight: '10vh' }} >
        <SearchBar ></SearchBar>
        <ModalCriarRoteador adicionarRoteador={adicionarRoteador}></ModalCriarRoteador>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <TableRoteador roteadores={roteadores} ></TableRoteador>
      </div>
    </>
  )
}

export default Roteadores;
