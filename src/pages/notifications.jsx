import * as React from 'react';
import Typography from '@mui/joy/Typography';
import TableNotifications from '../components/tableNotifications';
import SelectNotifications from '../components/selectNotifications';
import './notifications.css'; // Importando o arquivo CSS


const Notifications = () => {
    return (
        <>
            <div className="selectDiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
                <Typography level="display2" textAlign="start" sx={{ mb: 2 }}>
                    Notificações
                </Typography>
                <SelectNotifications></SelectNotifications>
                <TableNotifications> </TableNotifications>
            </div>
        </>
    );
}

export default Notifications
