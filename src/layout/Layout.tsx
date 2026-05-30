import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Box, Container } from '@mui/material'
import Navigation from '../components/Navigation/Navigation'
import { useAppDispatch, useAppSelector } from '../hooks/react-redux'
import { useEffect } from 'react'
import { useAuthMeQuery } from '../api/authApi'
import { clearUser, setUser } from '../store/slice/userSlice'
import { setAuth, setInitialized } from '../store/slice/authSlice'
import BurgerMenu from '../components/ui/BurgerNavigation'

const Layout = () => {
	// Получаем флаг инициализации приложения из хранилища Redux Toolkit
	const isInitialized = useAppSelector(state => state.authSlice.isInitialized)

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Достаём функцию навигации из библиотеки React Router Dom
	const navigate = useNavigate()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос на проверку того,
	// авторизован ли пользователь.
	// Первым параметром мы передаём undefined - то есть ничего
	// Вторым параметром мы передаём условие, при котором запрос у нас не будет выполняться.
	// В данном случае запрос не выполниться если флаг инициализации приложения равен true
	// В качестве ответа мы получаем флаг загрузки данных, ошибку если она есть и данные
	const { data, isLoading, error } = useAuthMeQuery(undefined, { skip: isInitialized })

	useEffect(() => {
		// Если приложение проинициализировано то мы выходим из функции
		if (isInitialized) return

		// Если загрузка завершена то выполнится код
		if (!isLoading) {
			// Если данные есть, то тогда флаг авторизации мы ставим true
			// также в хранилище в объект user мы сохраняем данные
			if (data) {
				dispatch(setAuth(true))
				dispatch(setUser(data))
			} else {
				// иначе флаг авторизации false и в функцию обработчик мы прокидываем функцию clearUser,
				// которая в свою очередь зануляет объект user
				dispatch(setAuth(false))
				dispatch(clearUser())
			}
			// по окончанию всего флаг инициализации ставим в true
			dispatch(setInitialized(true))
		}

		// Типизируем ошибку. В данном случае ошибка будет такого вида { status: number }
		const queryError = error as { status?: number }

		// Если у ошибки поле статус равно 401 или 403 это значит, что пользователь не авторизован
		// Ставим флаг инициализации равным true и с помощью функции navigate перенаправляем
		// пользователя на страницу логина
		if (queryError?.status === 401 || queryError?.status === 403) {
			dispatch(setInitialized(true))
			navigate('/login')
		}
	}, [data, isLoading, error, dispatch])

	// Container это аналог div, который имеет уже определённые внешние и внутренние отступы.
	// Box это тоже аналог div, но который лучше подходит для адаптивности
	return (
		<Container sx={{ py: '35px', px: { sm: '60px', xs: '10px' } }}>
			<Box
				sx={{
					display: { md: 'flex', xs: 'none' },
					flexDirection: { xs: 'column', md: 'row' },
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<img src={logo} alt='logo' />
				<Navigation />
			</Box>
			<BurgerMenu />
			{!isInitialized && isLoading && <h1>Загрузка...</h1>}
			{isInitialized && <Outlet />}
		</Container>
	)
}

export default Layout
