import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

const FormCriarSetor = ({ adicionarSetor, criarRoteador }) => {
  const [routerName, setRouterName] = useState('');

  const handleCreate = (e) => {
    // Lógica para criar o roteador com os dados fornecidos
    console.log('Router name:', routerName);
    e.preventDefault();

    adicionarSetor({ routerName });
    setRouterName('');
  };

  const handleNomeChange = (event) => {
    setRouterName(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
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

    </div>
  );
};

export default FormCriarSetor;