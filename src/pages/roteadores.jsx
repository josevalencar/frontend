import React, { useEffect, useState } from 'react';
import TableRoteador from '../components/roteador/tableRoteador';
import ModalCriarRoteador from '../components/roteador/modalCreate';
import SearchBar from '../components/roteador/searchbar';

const Roteadores = () => {
  const [roteadores, setRoteadores] = useState([]);

  const adicionarRoteador = async (roteador) => {
    try {
      const response = await fetch("https://2d1oh9-3000.csb.app/v1/esp-routers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mac: roteador.macAddress,
          name: roteador.routerName
        })
      });
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }

    setRoteadores([...roteadores, roteador]);

  };

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresFetched = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name }));
        setRoteadores(roteadoresFetched);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

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
