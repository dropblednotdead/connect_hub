import { Box, Typography, useTheme } from '@mui/material'
import { AcceptStatus, TypeOrganization } from '../../../interfaces/usersInterfaces'

interface Props {
	type: TypeOrganization
	acceptStatus: AcceptStatus | undefined
	isSuperUser: boolean
}

const ProfileTitle = ({ type, acceptStatus, isSuperUser }: Props) => {
	// Здесь мы из хранилища Redux Toolkit достаём тип организации
	const theme = useTheme()

	// если аккаунт подтверждён, то status равен ему, иначе если ты супер юзер, то status равен
	// принято, иначе если ты не подтверждён, то status равен ожидание
	const status = acceptStatus ? acceptStatus : isSuperUser ? 'Принято' : 'Ожидание'

	let colorStatus

	// в зависимости от статуса подтверждённости выбирается цвет
	if (acceptStatus && acceptStatus === 'Ожидание') colorStatus = '#000000'
	if ((acceptStatus && acceptStatus === 'Принято') || isSuperUser) colorStatus = '#319025'
	if (acceptStatus && acceptStatus === 'Отклонено') colorStatus = '#A20404'

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<>
			<Box
				sx={{
					mt: 6,
					display: 'flex',
					alignItems: 'center',
					flexDirection: { md: 'row', xs: 'column' },
				}}
			>
				<Typography
					variant='h4'
					sx={{
						textAlign: { md: 'start', xs: 'center' },
						my: { lg: 5, xs: 2 },
						fontSize: { xs: '24px', md: '36px' },
					}}
				>
					Статус подтверждения аккаунта:{' '}
				</Typography>
				<Typography
					variant='h4'
					sx={{
						textAlign: { lg: 'start', xs: 'center' },
						fontSize: { xs: '24px', md: '36px' },
						ml: 2,
						my: { lg: 5, xs: 1 },
						display: 'inline-block',
						color: colorStatus,
					}}
				>
					{status}
				</Typography>
			</Box>

			{/* Если ты подтверждён или супер юзер, то ты можешь видеть запросы на подключение */}
			{(acceptStatus || isSuperUser) && (
				<Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant='h4' sx={{ fontSize: { xs: '24px', md: '36px' } }}>
						ЗАПРОСЫ НА ПОДСОЕДИНЕНИЕ
					</Typography>

					{type === 'магистральный провайдер' && (
						<Typography
							sx={{ display: { md: 'block', xs: 'none' }, color: theme.palette.secondary.main }}
						>
							статус
						</Typography>
					)}
				</Box>
			)}
		</>
	)
}

export default ProfileTitle
