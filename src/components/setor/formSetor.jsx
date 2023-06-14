import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import MapaModal from '../modalMap';

const FormCriarSetor = ({ adicionarSetor, criarRoteador , fecharModal }) => {
  const [routerName, setRouterName] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false)

  const handleCreate = (e) => {
    // Lógica para criar o roteador com os dados fornecidos
    console.log('Router name:', routerName);
    e.preventDefault();

    adicionarSetor({ routerName });
    setRouterName('');
    setMostrarMapa(true)
    fecharModal()
  };

  const handleNomeChange = (event) => {
    setRouterName(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column',justifyContent:'center', alignItems: 'center', minHeight: '15vh' }}>
      <TextField sx={{ width: 300 }}
        label="Insira o nome do setor"
        value={routerName}
        onChange={handleNomeChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
        Próximo
      </Button>
      {mostrarMapa && <MapaModal />}
    </div>
  );
};

export default FormCriarSetor;