import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalColaboradores() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Adicionar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form name="create" method="post" action="https://2d1oh9-3000.csb.app/v1/maintainers">
                
                <Input id="name" name="name" aria-describedby="nameHelper" placeholder='Nome' />
                <FormHelperText id="nameHelper">O nome do colaborador.</FormHelperText>

              
                <Input id="rfid" name="rfid" aria-describedby="rfidHelper" placeholder='RFID' />
                <FormHelperText id="rfidHelper">O RFID atrelado ao crachá do colaborador.</FormHelperText>

               
                <Input id="sector" name="sector" aria-describedby="sectorHelper" placeholder='Setor' />
                <FormHelperText id="sectorHelper">O setor no qual esse manutentor costuma trabalhar.</FormHelperText>

                <input type="submit" value="Cadastrar"></input>

            </form>
        </Box>
      </Modal>
    </div>
  );
}