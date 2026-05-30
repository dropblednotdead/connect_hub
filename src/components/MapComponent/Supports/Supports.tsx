import { Box, Rating, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import { CustomButton } from '../../ui/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux'
import { setFocusedPillarCoords } from '../../../store/slice/mapSlice'
import { IPillar } from '../../../interfaces/mapInterfaces'
import { useState } from 'react'
import SupportEditModal from './SupportEditModal'

interface Props {
	id: number
	name: string
	location: string
	max_connections: number
	pillar: IPillar
}

const Supports = ({ id, name, location, max_connections, pillar }: Props) => {
	const dispatch = useAppDispatch()
	const type = useAppSelector(state => state.userSlice.user?.user_info?.type)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const handleShowOnMap = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(setFocusedPillarCoords([Number(pillar.longitude), Number(pillar.latitude)]))
		const mapContainer = document.getElementById('map-container')
		if (mapContainer) {
			mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}
	return (
		<Stack sx={{ padding: '5px' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { lg: 'row', xs: 'column' },
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: { lg: 'start', xs: 'center' },
						width: { lg: '30%', xs: '100%' },
					}}
				>
					<Typography sx={{ fontSize: '20px' }}>{name.toUpperCase()}</Typography>
					<Typography>{location}</Typography>
				</Box>

				<Box>
					<NavLink className={styles.link} to='#' onClick={handleShowOnMap}>
						Показать на карте
					</NavLink>
				</Box>

				{type === 'электросетевая компания' && (
					<Box>
						<CustomButton 
							onClick={() => setIsEditModalOpen(true)}
							sx={{ 
								width: '180px',
								padding: '10px 20px',
								backgroundColor: 'rgba(131, 37, 144, 0.8)', 
								color: 'white', 
								borderRadius: '35px',
								'&:hover': {
									backgroundColor: 'rgba(131, 37, 144, 1)'
								}
							}}
						>
							Изменить
						</CustomButton>
					</Box>
				)}
			</Box>

			{/* Модалка редактирования опоры */}
			{isEditModalOpen && (
				<SupportEditModal 
					isOpen={isEditModalOpen} 
					onClose={() => setIsEditModalOpen(false)} 
					pillar={pillar} 
				/>
			)}
		</Stack>
	)
}

export default Supports
