import { Box, Grid2, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'

const RegistrationBlock = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<Grid2 container sx={{ mt: 5 }}>
			<Grid2 size={{ xs: 0, lg: 3 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
				<Typography sx={{ color: theme.palette.secondary.main }}>Регистрация</Typography>
			</Grid2>

			<Grid2
				size={{ xs: 12, lg: 4 }}
				sx={{
					display: { xs: 'flex', lg: 'block' },
					gridColumn: { xs: 'span 12', lg: 'span 6' },
				}}
			>
				<Typography variant='body1' sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
					Если у вас ещё нет аккаунта на нашем сервисе, попросите менеджера помочь вам с
					регистрацией.
				</Typography>

				<Box sx={{ display: { xs: 'none', lg: 'flex' }, mt: 1 }}>
					<NavLink className={styles.entrance} to='/login'>
						<Typography
							sx={{
								display: 'inline-block',
								color: theme.palette.secondary.main,
								marginRight: '5px',
							}}
						>
							Аккаунт создан?
						</Typography>
						Войти
					</NavLink>
				</Box>
			</Grid2>

			<Grid2 size={{ xs: 0, lg: 5 }} />

			<Grid2 size={{ xs: 0, lg: 3 }} />
			<Grid2 size={{ xs: 12, lg: 9 }} sx={{ mt: 5 }}>
				<NavLink to='/registration' className={styles.registration}>
					<Typography variant='h6' sx={{ fontSize: { xs: '22px', md: '32px', lg: '24px' } }}>
						ЗАРЕГИСТРИРОВАТЬСЯ
					</Typography>
					<ArrowOutwardRoundedIcon sx={{ marginLeft: 1, fontSize: 30 }} />
				</NavLink>
			</Grid2>
		</Grid2>
	)
}

export default RegistrationBlock
