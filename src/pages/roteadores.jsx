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

    fetch("https://2d1oh9-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresUpdate = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresUpdate);
      })
      .catch((err) => {
        console.log(err.message);
      });


  };

  useEffect(() => {
    fetch("https://2d1oh9-3000.csb.app/v1/esp-routers")
      .then((response) => response.json())
      .then(data => {
        const roteadoresFetched = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setRoteadores(roteadoresFetched);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const editarRoteador = async ({ routerName, macAddress, routerID }) => {
    console.log(routerID);
    console.log(`https://2d1oh9-3000.csb.app/v1/esp-routers/` + routerID);
    console.log(`newName: ${routerName}, newMac: ${macAddress}`)
    console.log(roteadores);

    try {
      const response = await fetch(`https://2d1oh9-3000.csb.app/v1/esp-routers/` + routerID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: routerName,
          mac: macAddress
        })
      });

      if (response.ok) {
        // Atualizar a lista de roteadores com os dados atualizados
        const updatedRoteadores = roteadores.map(roteador => {
          if (roteador._id === routerID) {
            return {
              ...roteador,
              routerName: routerName,
              macAddress: macAddress
            };
          }
          return roteador;
        });
        setRoteadores(updatedRoteadores);
        console.log(updatedRoteadores);
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
