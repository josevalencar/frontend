import React, { useEffect, useState } from 'react';
import TableSetor from '../components/setor/tableSetor';
import ModalCriarSetor from '../components/setor/modalCreate';
import SearchBar from '../components/setor/searchbar';
import CustomModalEdit from '../components/setor/modalEdit';
import MapaModal from '../components/modalMap';
import removerAcentos from '../helpers/removerAcentos';




const Setores = () => {
  const [setores, setSetores] = useState([]);
  const [filter, updateFilter] = useState('');
  const [displayedSectors, setDisplayedSectors] = useState(null);

  useEffect(() => {
    if (filter !== ''){
      let filteredSectors = [];
      setores.map((row) => {
        if (row.name !== null){
          if (removerAcentos(row.name.toLowerCase()).includes(filter) || row.name.includes(filter)){
            filteredSectors.push(row)
          }
        }
      })
      setDisplayedSectors(filteredSectors);
    } else{
      setDisplayedSectors(setores);
    }
  }, [setores, filter])

  const adicionarSetor = async (setor) => {
    try {
      const response = await fetch("https://sfqlqf-3000.csb.app/v1/sectors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mac: setor.macAddress,
          name: setor.routerName,
          mapX: setor.mapX,
          mapY: setor.mapY
        })
      });
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }

    setSetores([...setores, setor]);

    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        const setoresUpdate = data.map(setor => ({ ...setor, macAddress: setor.mac, routerName: setor.name, routerID: setor._id, mapX: setor.mapX, mapY: setor.mapY }));
        setSetores(setoresUpdate);
      })
      .catch((err) => {
        console.log(err.message);
      });


  };

  useEffect(() => {
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        const setoresFetched = data.map(setor => ({ ...setor, macAddress: setor.mac, routerName: setor.name, routerID: setor._id, mapX: setor.mapX, mapY: setor.mapY }));
        setSetores(setoresFetched);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const editarRoteador = async ({ routerName, macAddress, routerID }) => {
    console.log(routerID);
    console.log(`https://sfqlqf-3000.csb.app/v1/sectors` + routerID);
    console.log(`newName: ${routerName}, newMac: ${macAddress}`)
    console.log(setores);

    try {
      const response = await fetch(`https://sfqlqf-3000.csb.app/v1/sectors` + routerID, {
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
        const updatedRoteadores = setores.map(roteador => {
          if (roteador._id === routerID) {
            return {
              ...roteador,
              routerName: routerName,
              macAddress: macAddress
            };
          }
          return roteador;
        });
        setSetores(updatedRoteadores);
        console.log(updatedRoteadores);
        // setOpen(false);
      } else {
        console.error("Erro ao editar o roteador");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição para o backend", error);
    }
  };

  const deletarRoteador = async (routerID) => {
    console.log(`Hello: ${routerID}`);

    try {
      await fetch(`https://sfqlqf-3000.csb.app/v1/sectors/${routerID}`, { method: 'DELETE' });
      console.log(`Roteador com ID ${routerID} deletado`);
    } catch (error) {
      console.error('Erro ao deletar roteador:', error);
    }

    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        const roteadoresNotDeleted = data.map(roteador => ({ ...roteador, macAddress: roteador.mac, routerName: roteador.name, routerID: roteador._id }));
        setSetores(roteadoresNotDeleted);
      })
      .catch((err) => {
        console.log(err.message);
      });


  }



  return (
    <>
      <div style={{ paddingLeft: 110 }}>
        <h1>Setores</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 110, alignItems: 'center', minHeight: '10vh' }} >
        <SearchBar updateFilter={updateFilter} type="roteador" />
        <ModalCriarSetor adicionarSetor={adicionarSetor}></ModalCriarSetor>
        <CustomModalEdit roteadores={setores} editarRoteador={editarRoteador}></CustomModalEdit>


      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

      {displayedSectors !== null && (
          <TableSetor roteadores={displayedSectors} editarRoteador={editarRoteador} deletarRoteador={deletarRoteador} />
          )}

      </div>
    </>
  )
}

export default Setores;
