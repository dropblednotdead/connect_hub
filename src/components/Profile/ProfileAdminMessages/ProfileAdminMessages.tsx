import { Box, Typography } from '@mui/material'
import { useGetAdminMessagesQuery } from '../../../api/profileApi'
import DividerCustom from '../../ui/DividerCustom'
import ProfileAdminMessageItem from './ProfileAdminMessageItem'

const ProfileAdminMessages = () => {
    const { data, isLoading } = useGetAdminMessagesQuery()

    if (isLoading || !data || data.length === 0) return null

    return (
        <Box sx={{ backgroundColor: '#F5F2F5', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 }, borderRadius: 3, mb: 4, mt: 4 }}>
            <Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '36px' }, mb: 3 }}>
                СООБЩЕНИЯ
            </Typography>
            <DividerCustom />
            
            {data.map(msg => (
                <Box key={msg.id} sx={{ mt: 3, mb: 3 }}>
                    <ProfileAdminMessageItem message={msg} />
                    <DividerCustom />
                </Box>
            ))}
        </Box>
    )
}

export default ProfileAdminMessages
