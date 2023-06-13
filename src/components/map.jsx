import React from 'react';
import { Box , Typography } from '@mui/material';
import Mapa from '../images/Mapa.png'
const MapaFabrica = () => {
  return (
    <div>
        <Typography variant="h1" component="h1" align='center' paddingTop='4vh'>
            Mapa da Fábrica
        </Typography>
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh" 
        >
        <img
            src={Mapa}
            alt="Mapa da Fábrica"
            style={{ maxWidth: '100%', maxHeight: '90%' }}
            id="imagem-mapa"  // Ajuste a largura e altura máximas conforme necessário
        />
        </Box>
    </div>
  );
};

export default MapaFabrica;