import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Mapa from '../images/Mapa.png'

const MapaFabrica = () => {
  const [setores, setSetores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://2d1oh9-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        setSetores(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])





  return (
    <div>
      <Typography variant="h1" component="h1" align='center' paddingTop='4vh'>
        Mapa da Fábrica
      </Typography>
      {isLoading ? null : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={Mapa}
              alt="Mapa da Fábrica"
              style={{ maxWidth: 900, height: 'auto' }}
            />
            {setores.filter(setor => setor.mapX && setor.mapY).map((setor) => {
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: setor.mapX * 100 + '%',
                    top: setor.mapY * 100 + '%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <LocationOnIcon sx={{ color: '#1E90FF', fontSize: '24px' }} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapaFabrica;