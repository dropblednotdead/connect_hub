import { Box, Grid2, Stack, Typography, useTheme } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { NavLink } from 'react-router-dom'
import leftPlanetPNG from '../../../assets/left_planet.png'
import rightPlanetPNG from '../../../assets/right_planet.png'
import styles from './styles.module.css'

const ReasonsCreateAccount = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	return (
		<Grid2 container sx={{ mt: { xs: 15, lg: 25 }, position: 'relative' }}>
			<Box sx={{ position: 'absolute', right: 0, top: '35%', transform: 'translateY(-50%)', zIndex: -1, pointerEvents: 'none', display: 'flex', height: { lg: '624px', md: '500px', xs: '300px' } }}>
				<img src={leftPlanetPNG} style={{ display: 'block', height: '100%', width: 'auto' }} />
				<img src={rightPlanetPNG} style={{ display: 'block', position: 'absolute', left: 'calc(100% + 15px)', top: 0, height: '100%', width: 'auto' }} />
			</Box>
			<Grid2 size={{ lg: 8, xs: 12 }}>
				<Typography
					sx={{ fontFamily: '"ActayWide", sans-serif', fontSize: { xs: '32px', md: '46px' } }}
					variant='h2'
				>
					ЗАЧЕМ ВАМ ЗАВОДИТЬ АККАУНТ?
				</Typography>
			</Grid2>
			<Grid2 size={{ lg: 4, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ lg: 5, xs: 12 }}>
				<Typography sx={{ mt: 3, fontSize: { xs: '20px', lg: '18px' }, color: 'rgba(0, 0, 0, 0.6)' }}>
					Если вы цените удобство в использовании наших услуг, то мы предлагаем вам
					<br />
					<NavLink to='/registration' style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
						пройти регистрацию
					</NavLink>
				</Typography>
				<Stack
					gap={4}
					sx={{
						mt: 5,
						borderLeftWidth: '2px',
						borderLeftColor: theme.palette.secondary.main,
						borderLeftStyle: 'solid',
						paddingLeft: '20px',
					}}
				>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Аккаунт позволяет системе «узнать» конкретного человека и предложить ему индивидуальные возможности
					</Typography>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Наличие учётной записи позволяет вам управлять данными и следить за операциями
					</Typography>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Авторизованный аккаунт защищает ваши личные и финансовые данные от несанкционированного доступа
					</Typography>
					<Box sx={{ mt: '10px', display: 'flex' }}>
						<NavLink to='/registration' style={{ display: 'flex', alignItems: 'center' }}>
							<Typography variant='h6' sx={{ fontSize: { xs: '22px', md: '32px', lg: '24px' }, display: 'flex', alignItems: 'center' }}>
								ЗАРЕГИСТРИРОВАТЬСЯ
								<ArrowOutwardRoundedIcon sx={{ marginLeft: 1, fontSize: { lg: 30, md: 40, xs: 30 } }} />
							</Typography>
						</NavLink>
					</Box>
				</Stack>
			</Grid2>

		</Grid2>
	)
}

export default ReasonsCreateAccount
