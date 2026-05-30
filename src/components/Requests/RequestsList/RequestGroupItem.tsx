import { Box, Button, Stack, Typography, useTheme, Grid2 } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { GroupedConnectionRequest } from '../../../hooks/useGroupedConnectionRequests'
import { useApproveConnectionRequestMutation } from '../../../api/profileApi'
import { useState } from 'react'

interface Props {
	group: GroupedConnectionRequest
	orgName: string
	refetchConnectionLinks: () => void
}

const RequestGroupItem = ({ group, orgName, refetchConnectionLinks }: Props) => {
	const theme = useTheme()
	const [approveConnection] = useApproveConnectionRequestMutation()
	const [isProcessing, setIsProcessing] = useState(false)

	const formatDate = (dateStr: string | null) => {
		if (!dateStr) return ''
		const d = new Date(dateStr)
		return d.toLocaleDateString('ru-RU')
	}

	const handleAction = async (status: boolean) => {
		setIsProcessing(true)
		try {
			// Отправляем ответ по каждой опоре в заявке
			const promises = group.pillars.map(p => 
				approveConnection({ id: p.linkId, answer: p.ans, status })
			)
			await Promise.all(promises)
			refetchConnectionLinks()
		} catch (error) {
			console.log(error)
		} finally {
			setIsProcessing(false)
		}
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
					<Button
						disabled={isProcessing}
						sx={{
							padding: '10px 40px',
							borderRadius: '35px',
							backgroundColor: 'rgba(131, 37, 144, 1)',
							color: 'white',
							width: '100%',
							'&:hover': {
								backgroundColor: 'rgba(131, 37, 144, 0.8)'
							}
						}}
						onClick={() => handleAction(true)}
					>
						Принять
					</Button>
					<Button
						disabled={isProcessing}
						sx={{
							padding: '10px 40px',
							borderRadius: '35px',
							backgroundColor: '#ECD8EF',
							color: 'rgba(131, 37, 144, 1)',
							width: '100%',
							'&:hover': {
								backgroundColor: '#E0C0E5'
							}
						}}
						onClick={() => handleAction(false)}
					>
						Отклонить
					</Button>

					<NavLink to="/map" style={{ color: 'gray', textDecoration: 'underline', fontSize: '16px' }}>
						Открыть опоры
					</NavLink>
				</Stack>
			</Grid2>
		</Grid2>
	)
}

export default RequestGroupItem
