import { Box, Stack, Typography } from '@mui/material'
import { TypeOrganization } from '../../../interfaces/usersInterfaces'
import ProfileRequestButtons from './ProfileRequestButtons'
import { formatStatus } from '../../../helpers/formatStatus'
import { useAppSelector } from '../../../hooks/react-redux'

// Типизация параметров ProfileRequests
interface Props {
	street: string | string[]
	coords?: string | string[]
	date?: string
	status?: number
	type?: TypeOrganization
	currentNameOrganization: string | string[]
	pillarId?: number
	answer?: 'pole_a_answer' | 'pole_b_answer'
	refetchConnectionLinks?: () => void
}

// Принимает id опоры, ответ, улицу или массив улиц, статус, тип организации, имя или имена провайдеров
// функцию перезапроса за подключёнными линиями
const ProfileRequests = ({
	pillarId,
	answer,
	street,
	coords,
	date,
	status,
	type,
	currentNameOrganization,
	refetchConnectionLinks,
}: Props) => {
	const isSuperUser = useAppSelector(state => state.userSlice.user?.is_superuser)
	
	let statusBg = 'gray'
	let statusColor = 'white'
	let statusText = 'В ожидании'

	if (status === 1) {
		statusText = 'В ожидании'
		statusBg = 'gray'
		statusColor = 'white'
	} else if (status === 2) {
		statusText = 'Одобрено'
		statusBg = 'rgba(131, 37, 144, 1)'
		statusColor = 'white'
	} else if (status === 3) {
		statusText = 'Отклонено'
		statusBg = '#ECD8EF'
		statusColor = 'rgba(131, 37, 144, 1)'
	}

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// Stack это компонент, который по умолчанию аналогичен div с display:flex и flexDirection: column
	return (
		<Box sx={{ width: '100%' }}>
			{/* Дата создания запроса */}
			{date && (
				<Typography sx={{ color: 'rgba(131, 37, 144, 1)', fontWeight: 'bold', mb: 1 }}>
					{date}
				</Typography>
			)}
			<Stack
				direction={{ md: 'row', xs: 'column' }}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					padding: '5px',
				}}
			>
				{/* Если у нас street это не массив, то мы выводим название улицы */}
				{!Array.isArray(street) ? (
					<Box>
						<Typography sx={{ fontSize: '20px' }}>{street}</Typography>
						{coords && !Array.isArray(coords) && (
							<Typography sx={{ fontSize: '14px', color: 'gray' }}>{coords}</Typography>
						)}
					</Box>
				) : (
					/* Иначе здесь мы идём по массиву и выводим улицы */
					<Stack direction='column' spacing={2}>
						{street.map((s, i) => (
							<Box key={i}>
								<Typography sx={{ fontSize: '20px' }}>
									{s}
								</Typography>
								{coords && Array.isArray(coords) && coords[i] && (
									<Typography sx={{ fontSize: '14px', color: 'gray' }}>{coords[i]}</Typography>
								)}
							</Box>
						))}
					</Stack>
				)}

			{/* Если мы электросетевая или супер юзер, либо магистральный провайдер */}
			{(type === 'электросетевая компания' || isSuperUser || type === 'магистральный провайдер') && currentNameOrganization && (
				<>
					{/* Если у нас currentNameOrganization это не массив, то мы выводим название организации */}
					{!Array.isArray(currentNameOrganization) ? (
						<Typography sx={{ my: { lg: 0, xs: 2 } }}>{currentNameOrganization}</Typography>
					) : (
						/* Иначе здесь мы идём по массиву и выводим названия организаций */
						<Stack direction='column' spacing={2} sx={{ mt: { lg: 0, xs: 3 } }}>
							{currentNameOrganization.map((name, i) => (
								<Typography key={i} sx={{ fontSize: '20px' }}>
									{name}
								</Typography>
							))}
						</Stack>
					)}
				</>
			)}

			<Box sx={{ width: { xs: '100%', md: '200px' }, display: 'flex', justifyContent: { md: 'flex-end', xs: 'flex-start' } }}>
				{/* Если акк подтверждён и мы магистральный провайдер, то выводим статус запроса */}
				{status && type === 'магистральный провайдер' && (
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: { lg: 0, xs: 2 } }}>
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
							lineHeight: 1.75,
						}}>
							{statusText}
						</Box>
						<Typography sx={{ mt: 1, color: 'gray', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>
							Открыть опоры
						</Typography>
					</Box>
				)}

				{/* Если электросетевая компания, то выводим кнопки обработки запроса */}
				{type === 'электросетевая компания' && (
					<ProfileRequestButtons
						id={pillarId!}
						answer={answer!}
						refetch={refetchConnectionLinks!}
					/>
				)}

				{/* Если акк подтверждён и мы супер юзер, то выводим статус запроса */}
				{status && isSuperUser && (
					<Stack sx={{ mt: 3 }}>
						<Typography sx={{ fontWeight: 'bold', fontSize: { xs: '20px', lg: '18px' } }}>
							Запрос на подключение
						</Typography>
						<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
							{formatStatus(status)}
						</Typography>
					</Stack>
				)}
			</Box>
		</Stack>
		</Box>
	)
}

export default ProfileRequests
