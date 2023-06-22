import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormEditaRoteador from './formEditaRoteador';
import { TextField, Button } from '@mui/material';


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

const CustomModalEdit = ({ open, handleClose, editarRoteador, routerID }) => {

    const [routerName, setRouterName] = useState(null);
    const [macAddress, setMacAddress] = useState(null);

    const handleCreate = (e) => {
        console.log('Router name:', routerName);
        console.log('MAC Address:', macAddress);
        console.log('Backend ID:', routerID);


        e.preventDefault();

        editarRoteador({ routerName, macAddress, routerID });
        setRouterName('');
        setMacAddress('');

        console.log("Editado com sucesso!");
    };

    const handleNomeChange = (event) => {
        setRouterName(event.target.value);
    };

    const handleMacAddressChange = (event) => {
        setMacAddress(event.target.value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Editar roteador
                </BootstrapDialogTitle>
                <DialogContent dividers={true}
                >
                    {/* <FormEditaRoteador editarRoteador={editarRoteador} routerID={routerID}></FormEditaRoteador> */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minHeight: '15vh' }}>
                        <TextField sx={{ width: 300 }}
                            label="Edite o nome do rastreador"
                            value={routerName}
                            onChange={handleNomeChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            sx={{ width: 300, paddingBottom: 1 }}
                            label="Edite o endereço MAC do rastreador"
                            value={macAddress}
                            onChange={handleMacAddressChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleCreate} sx={{ width: 100 }}>
                            Editar
                        </Button>

                    </div>
                </DialogContent>
            </BootstrapDialog>
        </Dialog>
    );
};

CustomModalEdit.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CustomModalEdit;