import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Mapa from '../images/Mapa.png'
import Loading from '../pages/loadingPage';


const MapaFabrica = () => {
  const [setores, setSetores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedSetor, setSelectedSetor] = useState([]);
  const [selectedSetorId, setSelectedSetorId] = useState(null);


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

  // const handleSetorMouseEnter = (setor) => {
  //   setSelectedSetor({
  //     ...setor,
  //     popupX: setor.mapX * 100 + '%',
  //     popupY: setor.mapY * 100 + '%',
  //   });
  //   console.log(setor.mapX);
  //   console.log(setor.mapY);
  //   setPopupOpen(true);
  //   console.log("entrou");
  // };

  // const handleSetorMouseLeave = () => {
  //   setPopupOpen(false);
  //   console.log("saiu");

  // };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event, setor) => {
    setAnchorEl(event.currentTarget);
    setSelectedSetor(setor);
    const setorId = event.target.dataset.setorId;
    const setorName = event.target.dataset.setorName;
    setSelectedSetorId(setorId); // Atribui o valor do setorId à constante selectedSetorId
    console.log(setorId);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedSetor(null);
    setSelectedSetorId(null); // Limpa o valor do setorId


  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography variant="h1" component="h1" align='center' paddingTop='4vh'>
        Mapa da Fábrica
      </Typography>
      {/* {setores.filter(setor => setor.mapX && setor.mapY).map((setor) => { */}
      {/* // return ( */}
      <div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{selectedSetorId}</Typography>
        </Popover>
      </div>
      {/* // ) */}
      {/* // })} */}
      {
        isLoading ? <Loading/> : (
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
                    <LocationOnIcon sx={{ color: '#1E90FF', fontSize: '24px' }} aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      data-setor-id={setor._id}
                      data-setor-name={setor.name}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
    </div >
  );
};

export default MapaFabrica;