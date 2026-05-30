import { Box, Grid2, Stack, Typography, useTheme } from '@mui/material'
import logoSVG from '../../../assets/logo.svg'
import styles from './styles.module.css'
import DividerCustom from '../../ui/DividerCustom'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/react-redux'

const Footer = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	const isAuth = useAppSelector(state => state.authSlice.isAuth)

	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// Grid2 с атрибутом container это обёртка контейнер, которая задаёт определённые стили
	// для всей грид сетки

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// Stack это компонент, который по умолчанию аналогичен div с display:flex и flexDirection: column
	// DividerCustom это наш дочерний компонент

	return (
		<>
			<Grid2 container sx={{ mt: 30 }}>
				<Grid2 size={3}>
					<img src={logoSVG} className={styles.logo} alt='logo' />
				</Grid2>

				<Grid2 size={4}>
					<Typography sx={{ color: theme.palette.secondary.main }}>Навигация</Typography>

					<Stack sx={{ mt: 2, gap: 2 }}>
						<NavLink to={isAuth ? '/map' : '/'}>Главная</NavLink>
						<NavLink to='/aboutUs'>О нас</NavLink>
						<NavLink to='/contacts'>Контакты</NavLink>
					</Stack>

					<Typography sx={{ mt: 3, color: theme.palette.secondary.main }}>Адрес</Typography>
					<Typography sx={{ mt: 1 }}>г. Нижний Новгород, площадь Минина и Пожарского, </Typography>
				</Grid2>

				<Grid2 size={4}>
					<Typography>connect-hub@info.com</Typography>
					<Typography sx={{ mt: 1 }}>
						Вы также можете связаться с нами по электронной почте!
					</Typography>
				</Grid2>

				<Grid2 size={1}></Grid2>
			</Grid2>

			<DividerCustom />

			<Box sx={{ mt: 5, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
				<Typography>Политика коденфициальности</Typography>
				<Typography>Cookies</Typography>
			</Box>
		</>
	)
}

export default Footer
