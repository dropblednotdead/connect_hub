import {
	Box,
	FormControl,
	InputAdornment,
	Menu,
	MenuItem,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { Formik, ErrorMessage, Form } from 'formik'
import styles from './styles.module.css'
import { useState } from 'react'
import { CustomButton } from '../../ui/Button'
import ArrowDownSVG from '../../../assets/arrowDown.svg'
import ArrowTopSVG from '../../../assets/arrowTop.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import СonsentСheckbox from '../../ui/СonsentСheckbox'
import { useGetOrganizationsQuery, useRegistrationMutation } from '../../../api/authApi'
import { TypeOrganization } from '../../../interfaces/usersInterfaces'

const RegistrationForm = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Достаём функцию навигации из React Router Dom
	const navigate = useNavigate()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая делает запрос за организациями.
	// В качестве ответа мы получаем флаг загрузки данных и данные
	const { data, isLoading } = useGetOrganizationsQuery()

	// Вызываем функцию из библиотеки Redux Toolkit Query, которая отдаёт нам функции регистрации.
	const [registration] = useRegistrationMutation()

	// Состояния и функции изменения этих состояний открытости и закрытости меню
	// (меню с организациями и меню с типами организаций)
	const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null)
	const [anchorElNameOrg, setAnchorElNameOrg] = useState<null | HTMLElement>(null)

	// Если флаг загрузки true, то отображается наш заголовок
	if (isLoading) return <h1>Загрузка данных...</h1>

	// Иначе отображается форма - Компонент из библиотеки Formik
	return (
		<Formik
			// Поля, которые будут в форме
			initialValues={{
				name: '',
				checkbox: false,
				username: '',
				surname: '',
				password: '',
				phone_num: '',
				type: '' as TypeOrganization,
				organizationId: null as number | null,
				email: '',
			}}
			// Функция, которая будет выполняться при отправке формы
			onSubmit={async (values, { setSubmitting }) => {
				// в параметрах получаем значения и функцию установки флага выполнения отправки формы
				try {
					// если не выбрана организация или тип организации, тогда регистрация отменяется
					if (!values.organizationId || !values.type || !values.checkbox) return

					// если пароль меньше 8 символов, то тогда выход из функции
					if (values.password.length < 8) return

					// если в пароле только числа
					if (/^\d+$/.test(values.password)) return

					// находим выбранную организацию если она есть
					const selectedOrg = data?.find(item => item.id === values.organizationId)
					// проверяем, что если тип и выбранная организация не совпадают, то выходим из функции
					if (selectedOrg?.type !== values.type) return

					// здесь происходит запрос на регистрацию
					await registration({
						name: values.name,
						username: values.username,
						surname: values.surname,
						password: values.password,
						phone_num: values.phone_num,
						organization_id: values.organizationId,
						type: values.type,
						email: values.email,
					})

					// после этого происходит редирект на логин
					navigate('/login')
				} catch (error) {
					// иначе в консоль выводится ошибка
					console.log(error)
				} finally {
					// флаг выполнения отправки формы становится не активным
					setSubmitting(false)
				}
			}}
		>
			{({ values, handleChange, handleBlur, isSubmitting, setFieldValue }) => {
				// находим выбранную организацию если она есть
				const selectedOrg = data?.find(item => item.id === values.organizationId)

				// Form - аналог тега form
				// TextField - аналог инпута, в name привязывается к тому значению, которое прописали
				// value - значение инпута, onChange, onBlur - встроенные функции Formik, которые делают
				// определённые действия при изменении и фокусировке
				// ErrorMessage - аналог div, в котором выводится ошибка валидации
				// FormControl - Обёртка, которая принимает TextField и в качестве value устанавливает выбранный
				// menuItem
				// Menu, MenuItem - меню и его элементы, которые будут отображаться когда меню открыто
				return (
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
							placeholder='ЛОГИН ДЛЯ ВХОДА В АККАУНТ'
						/>
						<ErrorMessage name='username' component='div' />
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
							placeholder='ПАРОЛЬ ДЛЯ ВХОДА В АККАУНТ'
						/>
						<ErrorMessage name='password' component='div' />
						<TextField
							variant='standard'
							type='text'
							name='name'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
							sx={{
								my: 4,
								display: 'block',
								'& .MuiInputBase-root': { width: '100%' },
							}}
							placeholder='ИМЯ ПОЛЬЗОВАТЕЛЯ'
						/>
						<ErrorMessage name='name' component='div' />
						<TextField
							variant='standard'
							type='text'
							name='surname'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.surname}
							sx={{
								my: 4,
								display: 'block',
								'& .MuiInputBase-root': { width: '100%' },
							}}
							placeholder='ФАМИЛИЯ ПОЛЬЗОВАТЕЛЯ'
						/>
						<ErrorMessage name='surname' component='div' />
						<FormControl fullWidth variant='standard' sx={{ my: 4, display: 'block' }}>
							<TextField
								fullWidth
								variant='standard'
								name='type'
								value={
									// Если тип выбран, то первую букву слова делаем большой, иначе присваиваем пустое
									// значение
									values.type ? values.type.charAt(0).toUpperCase() + values.type.slice(1) : ''
								}
								// при клике открываем текущее меню
								onClick={e => setAnchorElType(e.currentTarget)}
								placeholder='ТИП ОРГАНИЗАЦИИ'
								// InputProps делает это поля только для чтения и меня иконку в зависимости от открытости
								// закрытости меню
								InputProps={{
									readOnly: true,
									endAdornment: (
										<InputAdornment position='end'>
											<img src={Boolean(anchorElType) ? ArrowTopSVG : ArrowDownSVG} />
										</InputAdornment>
									),
								}}
								sx={{
									'& .MuiInputBase-root': { width: '100%' },
									'& input': {
										cursor: 'pointer',
									},
								}}
							/>
						</FormControl>
						<ErrorMessage name='type' component='div' />
						<Menu
							anchorEl={anchorElType}
							// если anchorElType не null, то меню открыто и это выражение вернёт true
							open={Boolean(anchorElType)}
							// вешаем функцию закрывания меню, которая обнуляет значение в состоянии открытости меню
							onClose={() => setAnchorElType(null)}
							PaperProps={{ sx: { width: anchorElType?.offsetWidth || 'auto' } }}
						>
							<MenuItem
								onClick={() => {
									// присваиваем тип и закрываем меню
									setFieldValue('type', 'электросетевая компания')
									setAnchorElType(null)
								}}
							>
								Электросетевая компания
							</MenuItem>
							<MenuItem
								onClick={() => {
									// присваиваем тип и закрываем меню
									setFieldValue('type', 'магистральный провайдер')
									setAnchorElType(null)
								}}
							>
								Магистральный провайдер
							</MenuItem>
						</Menu>
						<FormControl fullWidth variant='standard' sx={{ my: 4, display: 'block' }}>
							<TextField
								fullWidth
								variant='standard'
								name='organizationId'
								value={
									// Если тип выбран, то первую букву слова делаем большой, иначе присваиваем пустое
									// значение
									selectedOrg
										? selectedOrg.name.charAt(0).toUpperCase() + selectedOrg.name.slice(1)
										: ''
								}
								// При клике открываем текущее меню
								onClick={e => setAnchorElNameOrg(e.currentTarget)}
								placeholder='НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ'
								// InputProps делает это поля только для чтения и меня иконку в зависимости от открытости
								// закрытости меню
								InputProps={{
									readOnly: true,
									endAdornment: (
										<InputAdornment position='end'>
											<img src={Boolean(anchorElNameOrg) ? ArrowTopSVG : ArrowDownSVG} />
										</InputAdornment>
									),
								}}
								sx={{
									'& .MuiInputBase-root': { width: '100%' },
									'& input': {
										cursor: 'pointer',
									},
								}}
							/>
						</FormControl>
						<ErrorMessage name='organizationId' component='div' />
						<Menu
							anchorEl={anchorElNameOrg}
							// если anchorElType не null, то меню открыто и это выражение вернёт true
							open={Boolean(anchorElNameOrg)}
							// вешаем функцию закрывания меню, которая обнуляет значение в состоянии открытости меню
							onClose={() => setAnchorElNameOrg(null)}
							PaperProps={{ sx: { width: anchorElNameOrg?.offsetWidth || 'auto' } }}
						>
							{/* Идём по массиву и отрисовываем наши элементы меню */}
							{data &&
								data.map(item => (
									<MenuItem
										key={item.id}
										onClick={() => {
											setFieldValue('organizationId', item.id)
											setAnchorElNameOrg(null)
										}}
									>
										{item.name}
									</MenuItem>
								))}
						</Menu>
						<TextField
							variant='standard'
							type='tel'
							name='phone_num'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.phone_num}
							sx={{
								my: 4,
								display: 'block',
								'& .MuiInputBase-root': { width: '100%' },
							}}
							placeholder='ТЕЛЕФОН ОБРАТНОЙ СВЯЗИ'
						/>
						<ErrorMessage name='phone_num' component='div' />
						<TextField
							variant='standard'
							type='email'
							name='email'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							sx={{
								my: 2,
								display: 'block',
								'& .MuiInputBase-root': { width: '100%' },
							}}
							placeholder='ЭЛЕКТРОННАЯ ПОЧТА'
						/>
						<ErrorMessage name='email' component='div' />

						{/* Компонент с чекбоксом */}
						<СonsentСheckbox onChange={handleChange} onBlur={handleBlur} value={values.checkbox} />

						{/* Кнопка отправки функции */}
						<CustomButton
							sx={{ width: { xs: '100%', md: '50%' }, mt: 5, mb: 1 }}
							type='submit'
							disabled={isSubmitting}
						>
							Отправить
						</CustomButton>

						{/* Блок с переходом на форму логина */}
						<Box
							sx={{
								display: 'flex',
								justifyContent: { xs: 'center', md: 'start' },
								alignItems: 'center',
							}}
						>
							<Typography
								sx={{
									display: 'inline-block',
									color: theme.palette.secondary.main,
								}}
							>
								Аккаунт создан?
							</Typography>
							<NavLink to='/login' style={{ marginLeft: '4px', color: theme.palette.primary.main }}>
								Войти
							</NavLink>
						</Box>
					</Form>
				)
			}}
		</Formik>
	)
}

export default RegistrationForm
