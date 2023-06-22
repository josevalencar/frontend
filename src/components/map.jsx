import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Mapa from '../images/Mapa.png'
import Loading from '../pages/loadingPage';
import { useNavigate } from 'react-router-dom';



const MapaFabrica = () => {
  const [setores, setSetores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedSetor, setSelectedSetor] = useState([]);
  const [selectedSetorInfo, setSelectedSetorInfo] = useState(null);
  const [selectedSetorEsps, setSelectedSetorEsps] = useState([]);



  useEffect(() => {
    setIsLoading(true);
    fetch("https://sfqlqf-3000.csb.app/v1/sectors")
      .then((response) => response.json())
      .then(data => {
        setSetores(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event, setor) => {
    setAnchorEl(event.currentTarget);
    setSelectedSetor(setor);
    const setorId = event.target.dataset.setorId;
    const setorName = event.target.dataset.setorName;
    setSelectedSetorInfo(setorName); // Atribui o valor do setorId à constante selectedSetorId
    console.log(setorId);

    const url = "https://sfqlqf-3000.csb.app/v1/sectors/esps"; // URL da API

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const espSetor = data.find(setor => setor._id === setorId);
        if (espSetor) {
          const espList = espSetor.esps;
          setSelectedSetorEsps(espList);
          console.log(espList);
        } else {
          console.log("Setor não encontrado");
        }
      })
      .catch(error => {
        console.log("Ocorreu um erro:", error);
      });
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedSetor(null);
    setSelectedSetorInfo(null); // Limpa o valor do setorId
  };

  const open = Boolean(anchorEl);

  const navigate = useNavigate(); 

  const handleIconClick = (setorName) => {
    navigate("/sectorTablets/" + setorName);
  };
  

  return (
    <div>
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
          <Typography sx={{ p: 1 }}>
            {selectedSetorInfo}
            {selectedSetorEsps?.length > 0 ? (
              <div>
                <strong>Tablets:</strong>
                <ul>
                  {selectedSetorEsps.map((esp) => (
                    <li key={esp._id}>{esp.tabletName}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>Nenhum tablet presente.</div>
            )}
          </Typography>
        </Popover>
      </div>
      {/* // ) */}
      {/* // })} */}
      {
        isLoading ? <Loading /> : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={Mapa}
                alt="Mapa da Fábrica"
                style={{ maxWidth: "100%", height: 'auto' }}
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
                      onClick={ () => handleIconClick(setor.name)}
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