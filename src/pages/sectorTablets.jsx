import * as React from 'react';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSetoresWithEsps } from '../services/Setores';
import LoadingEarth from '../pages/loadingPage';
import { DataGrid } from '@mui/x-data-grid';
import dateToLocale from '../helpers/dateToLocale';

const SectorTablets = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [sector, setSector] = useState({});


    const navigator = useNavigate();

    const handleCellClick = (params, event) => {
        navigator(`/tablets/${params.row.id}`);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const sectors = await getSetoresWithEsps(`_id=${id}`);
            if (!sectors[0]) {
                return navigator('/setores');
            }

            setSector(sectors[0]);
            setIsLoading(false);
        })()
    }, []);

    const columns = [
        { field: 'tabletName', headerName: 'Nome do tablet', width: 400 },
        { field: 'mac', headerName: 'MAC', width: 200 },
        { field: 'maintainer', headerName: 'Manutentor', width: 200 },
        { field: 'router', headerName: 'MAC roteador', width: 200 },
        { field: 'online', headerName: 'Online', width: 200 },
        { field: 'lastHistoricDate', headerName: 'Última Atualização', width: 200 },
    ];

    const rows = (sector && sector.esps ? sector.esps : []).map(esp => {
        const row = {
            id: esp._id,
            tabletName: esp.tabletName,
            mac: esp.mac,
            maintainer: esp.lastHistoric ? (esp.lastHistoric.maintainer ? esp.lastHistoric.maintainer.name : 'Sem manutentor') : 'Sem histórico',
            router: esp.lastHistoric ? (esp.lastHistoric.router ? esp.lastHistoric.router.mac : 'Sem roteador') : 'Sem histórico',
            online: esp.lastHistoric ? (esp.lastHistoric.online ? 'Sim' : 'Não') : 'Sem histórico',
            lastHistoricDate: esp.lastHistoric ? (`${dateToLocale(esp.lastHistoric.createdAt)}`) : 'Sem histórico',
        }

        return row;
    })


    return <div className="selectDiv" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {isLoading || (!sector || !sector._id) ? <LoadingEarth /> : <>
            <Typography level="display2" textAlign="start" fontSize={"40px"}>
                {sector.name ? `Setor: ${sector.name}` : `Setor sem nome`}
            </Typography>
            <div style={{ fontSize: '14px', color: '#808080' }}>
                <span style={{ marginRight: 10 }}>Última edição: <strong>{dateToLocale(sector.updatedAt)}</strong></span>
                Criação: <strong>{dateToLocale(sector.createdAt)}</strong>
            </div>

            <span style={{ fontSize: '14px', color: '#808080' }}>
                <strong>{`${sector.esps.length} tablet${sector.esps.length != 1 ? 's' : ''}`}</strong>
                {` nesse setor`}
            </span>

            {sector.esps.length ? <div style={{ width: "97%", height: 600, marginTop: '10px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellClick={handleCellClick}
                />
            </div> : <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                {`Sem esps conectados`}
            </Typography>}

        </>
        }
    </div >;
}

export default SectorTablets