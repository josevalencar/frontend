import React, { useEffect, useState } from 'react';
import TableRoteador from '../components/roteador/tableRoteador';
import ModalCriarRoteador from '../components/roteador/modalCreate';
import SearchBar from '../components/roteador/searchbar';
import CustomModalEdit from '../components/roteador/modalEdit';


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

  const editarRoteador = async (routerID, newName, newMac) => {
    console.log(routerID.routerID);
    console.log(`https://2d1oh9-3000.csb.app/v1/esp-routers/` + routerID.routerID);
    try {
      const response = await fetch(`https://2d1oh9-3000.csb.app/v1/esp-routers/` + routerID.routerID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: newName,
          mac: newMac
        })
      });

      if (response.ok) {
        // Atualizar a lista de roteadores com os dados atualizados
        const updatedRoteadores = roteadores.map(roteador => {
          if (roteador._id === routerID) {
            return {
              ...roteador,
              name: newName,
              mac: newMac
            };
          }
          return roteador;
        });
        setRoteadores(updatedRoteadores);
        // setOpen(false);
      } else {
        console.error("Erro ao editar o roteador");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }
  };

  return (
    <>
      <div style={{ paddingLeft: 110 }}>
        <h1>Roteadores</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 110, alignItems: 'center', minHeight: '10vh' }} >
        <SearchBar ></SearchBar>
        <ModalCriarRoteador adicionarRoteador={adicionarRoteador}></ModalCriarRoteador>
        <CustomModalEdit roteadores={roteadores} editarRoteador={editarRoteador}></CustomModalEdit>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <TableRoteador roteadores={roteadores} editarRoteador={editarRoteador}></TableRoteador>
      </div>
    </>
  )
}

export default Roteadores;
