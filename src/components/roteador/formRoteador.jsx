import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const FormCriarRoteador = ({ adicionarRoteador }) => {
  const [routerName, setRouterName] = useState('');
  const [macAddress, setMacAddress] = useState('');

  const handleCreate = (e) => {
    // Lógica para criar o roteador com os dados fornecidos
    console.log('Router name:', routerName);
    console.log('MAC Address:', macAddress);

    e.preventDefault();

    adicionarRoteador({ routerName, macAddress });
    setRouterName('');
    setMacAddress('');
  };

  const handleNomeChange = (event) => {
    setRouterName(event.target.value);
  };

  const handleMacAddressChange = (event) => {
    setMacAddress(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
      <TextField sx={{ width: 300 }}
        label="Insira o nome do roteador"
        value={routerName}
        onChange={handleNomeChange}
        fullWidth
        margin="normal"
      />

      <TextField sx={{ width: 300, paddingBottom: 1 }}
        label="Insira o endereço MAC do rastreador"
        value={macAddress}
        onChange={handleMacAddressChange}
        fullWidth
        margin="normal"
        dividers
      />
      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
        Criar
      </Button>

    </div>
  );
};

export default FormCriarRoteador;