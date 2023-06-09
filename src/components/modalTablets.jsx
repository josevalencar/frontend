import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/joy/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';



export default function ModalTablets(props) {
  const { mode } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {mode === 'create'? 
      <React.Fragment>
        <Button
         color="primary"
         disabled={false}
         onClick={handleClickOpen}
         size="md"
         variant="outlined"> <AddIcon/> Criar 
        </Button>
      </React.Fragment>:
      <React.Fragment>
        <IconButton onClick={handleClickOpen}>
            <EditIcon sx={{ color: '#000000' }} />
        </IconButton>
      </React.Fragment>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === 'create' ? 'Criar novo tablet' : 'Editar tablet'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mode === 'create'
              ? 'Insira as informações do novo tablet:'
              : (
                <React.Fragment>
                  Se você deseja editar o nome ou mac address do tablet, favor inserir abaixo:
                  <Typography level="body4">
                    Não é necessário o preenchimento de ambos os campos
                  </Typography>
                </React.Fragment>
              )}  
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="tabletName"
              label="Nome do tablet"
              type="text"
              fullWidth
              variant="standard"
            />
          <TextField
            autoFocus
            margin="dense"
            id="mac"
            label="Mac"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' onClick={handleClose}>
            {mode === 'create' ? 'Criar' : 'Editar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
