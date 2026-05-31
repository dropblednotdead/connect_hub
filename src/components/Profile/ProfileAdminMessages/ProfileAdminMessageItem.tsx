import { Box, Typography } from '@mui/material'
import { AdminPoleMessage } from '../../../api/profileApi'
import { Link } from 'react-router-dom'

interface Props {
    message: AdminPoleMessage
}

const ProfileAdminMessageItem = ({ message }: Props) => {
    const formattedDate = new Date(message.created_at).toLocaleDateString('ru-RU')
    
    const address = message.pole.index 
        ? `ул. ${message.pole.street}, д. ${message.pole.building}${message.pole.index}`
        : `ул. ${message.pole.street}, д. ${message.pole.building}`

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography sx={{ color: 'rgba(131, 37, 144, 1)', fontWeight: 'bold' }}>{formattedDate}</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase' }}>
                    {address}
                </Typography>
                <Typography sx={{ color: 'gray', fontSize: '14px' }}>
                    {message.pole.longitude}, {message.pole.latitude}
                </Typography>
            </Box>

            <Box sx={{ maxWidth: '50%' }}>
                <Typography sx={{ color: '#A20404' }}>
                    {message.message}
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Link to={`/map?lat=${message.pole.latitude}&lng=${message.pole.longitude}`} style={{ color: 'gray', textDecoration: 'underline' }}>
                        Открыть опору
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}
export default ProfileAdminMessageItem
