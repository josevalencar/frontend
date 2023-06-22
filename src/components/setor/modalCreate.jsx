import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import FormCriarSetor from './formSetor';
import MapaModal from '../modalMap';
import { useEffect, useState } from 'react';
import { Modal, TextField } from '@mui/material';
import Mapa from "../../images/Mapa.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ModalCriarSetor({ handleCreate, handleClose, setores }) {
    const [open, setOpen] = useState(true);
    const [coordenadas, setCoordenadas] = useState({ x: null, y: null });
    const [name, setName] = useState(null);

    const handleImagemClick = (event) => {
        const imageElement = event.target;
        const imageRect = imageElement.getBoundingClientRect();
        const offsetX = (event.clientX - imageRect.left) / imageRect.width;
        const offsetY = (event.clientY - imageRect.top) / imageRect.height;
        setCoordenadas({ x: offsetX, y: offsetY });
    };

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSetorCreate = () => {
        handleCreate({
            mapX: coordenadas.x,
            mapY: coordenadas.y,
            name: name
        })
    }

    const handleOnClose = () => {
        setOpen(false);
        handleClose();
    }

    return (
        <BootstrapDialog
            onClose={handleOnClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth={false}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleOnClose}>
                Criar Setor
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        background: '#ffffff',
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <img
                            src={Mapa}
                            alt="Mapa da Fábrica"
                            onClick={handleImagemClick}
                            style={{ maxWidth: 900, height: 'auto', cursor: 'crosshair' }}
                        />
                        {coordenadas.x && coordenadas.y && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: coordenadas.x * 100 + '%',
                                    top: coordenadas.y * 100 + '%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <LocationOnIcon sx={{ color: '#f01c24', fontSize: '24px' }} />
                            </div>
                        )}
                        {(setores || []).filter(setor => setor && setor.mapX && setor.mapY).map(setor => {
                            return <div
                                style={{
                                    position: 'absolute',
                                    left: setor.mapX * 100 + '%',
                                    top: setor.mapY * 100 + '%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <LocationOnIcon sx={{ color: '#00000', fontSize: '24px' }} />
                            </div>
                        })}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '15vh' }}>
                    <Typography>Escolha no mapa o setor que deseja adicionar</Typography>
                    <TextField sx={{ width: 300 }}
                        label="Insira o nome do setor"
                        value={name}
                        onChange={handleName}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSetorCreate} sx={{ width: 100 }}>
                        Próximo
                    </Button>

                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}