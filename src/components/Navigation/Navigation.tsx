import { Box, useTheme } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import userSVG from '../../assets/user.svg'
import { useAppSelector } from '../../hooks/react-redux'

const Navigation = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Достаём объект локации на сайте из библиотеки React Router Dom
	const location = useLocation()

	// Достаём флаг инициализации из библиотеки Redux Toolkit
	const isAuth = useAppSelector(state => state.authSlice.isAuth)
	const acceptStatus = useAppSelector(state => state.userSlice.user?.user_info?.accept_status)

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	// NavLink это аналог тега a. Отличие его в том, что он делает переход без перезагрузки страницы
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<NavLink to={acceptStatus ? '/map' : '/'} className={styles.link}>
				Главная
			</NavLink>

			{location.pathname !== '/login' &&
				location.pathname !== '/registration' &&
				location.pathname !== '/contacts' && (
					<NavLink to='/aboutUs' className={styles.link}>
						О нас
					</NavLink>
				)}

			{location.pathname !== '/login' &&
				location.pathname !== '/registration' &&
				location.pathname !== '/contacts' && (
					<NavLink to='/contacts' className={styles.link}>
						Контакты
					</NavLink>
				)}

			{!isAuth && (
				<NavLink to='/login' className={`${styles.entrance} ${styles.link}`}>
					Войти
				</NavLink>
			)}
			{isAuth && (
				<NavLink
					to='/profile'
					style={{ color: theme.palette.primary.main }}
					className={styles.link}
				>
					<img src={userSVG} className={styles.user} />
				</NavLink>
			)}
		</Box>
	)
}

export default Navigation
