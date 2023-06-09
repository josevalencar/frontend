import { useState } from 'react'
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

const UpdateMaintainer = (props) => {

    const [nome, setNome] = useState(null);
    const [rfid, setRfid] = useState(null); 
    const [sector, setSector] = useState(null);

    const handleChangeNome = (e) => {
        setNome(e.target.value);
    }

    const handleChangeRfid = (e) => {
        setRfid(e.target.value);
    }

    const handleChangeSector = (e) => {
        setSector(e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault(); // Prevent the default form submission behavior

        fetch("https://2d1oh9-3000.csb.app/v1/maintainers/" + props.manutentor._id, {
            method: "PUT",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nome,
                rfid: rfid,
                sector: sector
            })
        })
        .then(res => {
            if(res.ok){
                alert("Usuário alterado com sucesso")
            }
            else{
                alert("Erro. Peça a ajuda de um administrador")
            }
        })
        .then(() => {
            endFetch()
        })
        .catch((error) => console.log(error))
    }

    const endFetch = () => {
        setNome(null);
        setRfid(null);
        setSector(null);
        props.handleClose();
        props.setGet(former => former + 1)
    }

    return (
        <div>
            <form
                name="create"
                onSubmit={handleSubmit}
            >
                <Input id="name" name="name" aria-describedby="nameHelper" placeholder='Nome' onChange={handleChangeNome} />
                <FormHelperText id="nameHelper" style={{ marginBottom: "10px" }}>O nome do colaborador.</FormHelperText>

                <Input id="rfid" name="rfid" aria-describedby="rfidHelper" placeholder='RFID' onChange={handleChangeRfid} />

                <FormHelperText id="rfidHelper" style={{ marginBottom: "10px" }}>
                    O RFID atrelado ao crachá do colaborador.
                </FormHelperText>

                <select name="sector" id="sector" aria-describedby="sectorHelper" onChange={handleChangeSector} style={{ color: "gray", borderColor: "gray", border: "1px" }}>
                    {props.sectors.map((sector) => {
                        if (sector.name !== null) {
                            return (<option value={sector._id}>{sector.name}</option>)
                        }
                    })}
                </select>

                <FormHelperText id="sectorHelper" style={{ marginBottom: "10px" }}>
                    O setor no qual esse manutentor costuma trabalhar.
                </FormHelperText>

                <Button type="submit" variant="contained">
                    Cadastrar
                </Button>
            </form>
        </div>
    )
}

export default UpdateMaintainer
