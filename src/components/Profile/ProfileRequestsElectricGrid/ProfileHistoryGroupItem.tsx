import { Box, Stack, Typography, useTheme, Grid2 } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { GroupedConnectionRequest } from '../../../hooks/useGroupedConnectionRequests'

interface Props {
	group: GroupedConnectionRequest
	orgName: string
}

const ProfileHistoryGroupItem = ({ group, orgName }: Props) => {
	const theme = useTheme()

	const formatDate = (dateStr: string | null) => {
		if (!dateStr) return ''
		const d = new Date(dateStr)
		return d.toLocaleDateString('ru-RU')
	}

	let statusText = 'Обработано'
	let statusBg = 'gray'
	let statusColor = 'white'
	
	if (group.resolutionStatus === true) {
		statusText = 'Принято'
		statusBg = 'rgba(131, 37, 144, 1)'
		statusColor = 'white'
	} else if (group.resolutionStatus === false) {
		statusText = 'Отклонено'
		statusBg = '#ECD8EF'
		statusColor = 'rgba(131, 37, 144, 1)'
	}

	return (
		<Grid2 container spacing={2} sx={{ pb: 2 }}>
			<Grid2 size={{ md: 5, xs: 12 }}>
				<Typography sx={{ color: theme.palette.secondary.main, fontSize: '18px', mb: 2, fontWeight: 'bold' }}>
					{formatDate(group.createdAt)}
				</Typography>
				
				<Stack spacing={3}>
					{group.pillars.map((p, idx) => (
						<Box key={`${p.linkId}-${idx}`}>
							<Typography sx={{ fontSize: '20px' }}>
								{`${p.pillar.street}, ${p.pillar.building}${p.pillar.index || ''}`.toUpperCase()}
							</Typography>
							<Typography sx={{ fontSize: '16px', color: 'gray', mt: 0.5 }}>
								{p.pillar.latitude}, {p.pillar.longitude}
							</Typography>
						</Box>
					))}
				</Stack>
			</Grid2>

			<Grid2 size={{ md: 3, xs: 12 }} sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' }, mt: { xs: 3, md: 0 }, pr: { md: 2, xs: 0 } }}>
				<Typography sx={{ fontSize: '20px', textAlign: { md: 'right', xs: 'left' } }}>
					{orgName}
				</Typography>
			</Grid2>

			<Grid2 size={{ md: 4, xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: { md: 'flex-end', xs: 'flex-start' }, mt: { xs: 3, md: 0 } }}>
				<Stack direction="column" spacing={2} sx={{ mb: 2, width: { md: '200px', xs: '100%' }, alignItems: 'center' }}>
					<Box sx={{ 
						boxSizing: 'border-box',
						padding: '10px 40px',
						borderRadius: '35px',
						backgroundColor: statusBg,
						color: statusColor,
						width: '100%',
						textAlign: 'center',
						textTransform: 'uppercase',
						fontWeight: 500,
						fontSize: '0.875rem',
						lineHeight: 1.75
					}}>
						{statusText}
					</Box>
				
					<NavLink to="/map" style={{ color: 'gray', textDecoration: 'underline', fontSize: '16px' }}>
						Открыть опоры
					</NavLink>
				</Stack>
			</Grid2>
		</Grid2>
	)
}

export default ProfileHistoryGroupItem
