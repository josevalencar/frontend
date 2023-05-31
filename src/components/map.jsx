import React from 'react';
import { Box , Typography } from '@mui/material';
import Mapa from '../images/Mapa.png'
const MapaFabrica = () => {
  return (
    <div>
        <Typography variant="h2" component="h2" align='center' paddingTop='4vh'>
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
            style={{ maxWidth: '100%', maxHeight: '90%' }}  // Ajuste a largura e altura máximas conforme necessário
        />
        </Box>
    </div>
  );
};

export default MapaFabrica;