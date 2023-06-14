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
import { useState } from 'react';
import { Modal} from '@mui/material';
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

export default function ModalCriarSetor({ adicionarSetor }) {
    const [open, setOpen] = React.useState(false);
    const [coordenadas, setCoordenadas] = useState({ x: null, y: null });

    const handleImagemClick = (event) => {
        const imageElement = event.target;
        const imageRect = imageElement.getBoundingClientRect();
        const offsetX = (event.clientX - imageRect.left) / imageRect.width;
        const offsetY = (event.clientY - imageRect.top) / imageRect.height;
        setCoordenadas({ x: offsetX, y: offsetY });
      };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ width: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <AddIcon></AddIcon>
                    CRIAR
                </div>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth={false}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Criar setor
                </BootstrapDialogTitle>
                <DialogContent maxWidth={false}  dividers>
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
                                    <LocationOnIcon sx={{ color: '#1E90FF', fontSize: '24px' }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <FormCriarSetor fecharModal={handleClose} adicionarSetor={adicionarSetor} sx={{ textAlign: 'center'}}></FormCriarSetor>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </div>
    );
}