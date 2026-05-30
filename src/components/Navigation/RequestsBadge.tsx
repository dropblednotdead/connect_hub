import { Box } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import useGroupedConnectionRequests from '../../hooks/useGroupedConnectionRequests'

const RequestsBadge = () => {
	const location = useLocation()
	const { groupedRequests } = useGroupedConnectionRequests(false)

	const activeCount = groupedRequests.length

	return (
		<NavLink 
			to='/requests' 
			className={styles.link}
			style={{ 
				fontWeight: location.pathname === '/requests' ? 'bold' : 'normal',
				display: 'flex',
				alignItems: 'center'
			}}
		>
			Заявки
			{activeCount > 0 && (
				<Box
					sx={{
						backgroundColor: '#DF1414',
						color: 'white',
						borderRadius: '50%',
						width: '22px',
						height: '22px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '12px',
						fontWeight: 'bold',
						ml: 1,
					}}
				>
					{activeCount}
				</Box>
			)}
		</NavLink>
	)
}

export default RequestsBadge
