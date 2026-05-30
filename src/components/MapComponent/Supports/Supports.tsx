import { Box, Rating, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

interface Props {
	name: string
	location: string
	max_connections: number
}

const Supports = ({ name, location, max_connections }: Props) => {
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
					<Rating
						name='read-only'
						value={max_connections}
						sx={{ color: 'purple', my: { lg: 0, xs: 2 } }}
						readOnly
					/>
				</Box>

				<Box>
					<NavLink className={styles.link} to='#'>
						Показать на карте
					</NavLink>
				</Box>
			</Box>
		</Stack>
	)
}

export default Supports
