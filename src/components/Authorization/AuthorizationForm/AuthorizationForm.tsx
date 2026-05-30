import { Box, TextField, Typography, useTheme } from '@mui/material'
import { Formik, ErrorMessage, Form } from 'formik'
import styles from './styles.module.css'
import { CustomButton } from '../../ui/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLazyAuthMeQuery, useLoginMutation } from '../../../api/authApi'
import { useAppDispatch } from '../../../hooks/react-redux'
import { setAuth } from '../../../store/slice/authSlice'
import { setUser } from '../../../store/slice/userSlice'

const AuthorizationForm = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Достаём функцию навигации из React Router Dom
	const navigate = useNavigate()

	// Достаём специальную функцию из библиотеки React-Redux для обработки действий
	const dispatch = useAppDispatch()

	// Вызываем функции из библиотеки Redux Toolkit Query, которые отдают нам функции
	// авторизации и проверки на авторизованность
	const [login] = useLoginMutation()
	const [authMe] = useLazyAuthMeQuery()

	// Компонент из библиотеки Formik - аналог form
	return (
		<Formik
			// Поля, которые будут в форме
			initialValues={{
				username: '',
				password: '',
			}}
			// Функция, которая будет выполняться при отправке формы
			onSubmit={async (values, { setSubmitting }) => {
				// в параметрах получаем значения и функцию установки флага выполнения отправки формы
				try {
					// здесь происходит запрос на вход в аккаунт
					const response = await login({
						username: values.username,
						password: values.password,
					}).unwrap()

					// Если в ответе есть токен
					if (response.auth_token) {
						// Записываем этот токен в локальное хранилище браузера
						localStorage.setItem('token', response.auth_token)
						// Устанавливаем в хранилище Redux Toolkit флаг авторизованности true
						dispatch(setAuth(true))

						// Делаем запрос на авторизованность и в качестве ответа получаем объект с пользователем
						const user = await authMe().unwrap()
						// Сохраняем пользователя в хранилище Redux Toolkit
						dispatch(setUser(user))

						// Делаем редирект на страницу карты
						navigate('/map')
					}

					// флаг выполнения отправки формы становится не активным
					setSubmitting(false)
				} catch (error) {
					// флаг выполнения отправки формы становится не активным
					setSubmitting(false)
					// выводим ошибку в консоль
					console.error('Login failed:', error)
				}
			}}
			// Form - аналог тега form
			// TextField - аналог инпута, в name привязывается к тому значению, которое прописали
			// value - значение инпута, onChange, onBlur - встроенные функции Formik, которые делают
			// определённые действия при изменении и фокусировке
			// ErrorMessage - аналог div, в котором выводится ошибка валидации

			// Box это тоже аналог div, но который лучше подходит для адаптивности
			// Typography это компонент, который в зависимости от значения variants равен определённому тегу
		>
			{({ values, handleChange, handleBlur, isSubmitting }) => (
				<Form className={styles.form}>
					<TextField
						variant='standard'
						type='text'
						name='username'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.username}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='ЛОГИН'
					/>
					<ErrorMessage name='name' component='div' />

					<TextField
						variant='standard'
						type='password'
						name='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='ПАРОЛЬ'
					/>
					<ErrorMessage name='telephone' component='div' />

					<NavLink to='/recover'>
						<Typography
							sx={{
								display: 'inline-block',
								color: theme.palette.secondary.main,
							}}
						>
							Забыли пароль?
						</Typography>{' '}
						<Typography
							sx={{
								color: theme.palette.secondary.main,
								display: 'inline-block',
								textDecoration: 'none',
								borderBottom: '1px solid',
								borderColor: theme.palette.secondary.main,
								paddingBottom: '0.1px',
							}}
						>
							Восстановить
						</Typography>
					</NavLink>

					{/* Кнопка отправки функции */}
					<CustomButton
						sx={{ width: { xs: '100%', md: '50%' }, mt: 8, mb: 1 }}
						type='submit'
						disabled={isSubmitting}
					>
						Войти
					</CustomButton>

					{/* Блок с переходом на форму регистрации,
					NavLink это аналог тега a. Отличие его в том, что он делает переход без перезагрузки страницы */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: { xs: 'center', md: 'start' },
							alignItems: 'center',
						}}
					>
						<Typography sx={{ color: theme.palette.secondary.main }}>Нет аккаунта?</Typography>
						<NavLink
							to='/registration'
							style={{
								marginLeft: '4px',
								color: theme.palette.primary.main,
							}}
						>
							Зарегистрироваться
						</NavLink>
					</Box>
				</Form>
			)}
		</Formik>
	)
}

export default AuthorizationForm
