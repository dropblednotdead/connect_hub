import { Box, TextField, Typography, useTheme } from '@mui/material'
import { Formik, ErrorMessage, Form } from 'formik'
import styles from './styles.module.css'
import { CustomButton } from '../../ui/Button'
import { NavLink } from 'react-router-dom'
import { BASE_URL } from '../../../constants/constants'
import axios from 'axios'
import СonsentСheckbox from '../../ui/СonsentСheckbox'

const RecoverForm = () => {
	// Достаём объект темы из MaterialUI
	const theme = useTheme()

	// Компонент из библиотеки Formik - аналог form
	return (
		<Formik
			// Поля, которые будут в форме
			initialValues={{
				email: '',
				checkbox: false,
			}}
			// Функция, которая будет выполняться при отправке формы
			onSubmit={async (values, { setSubmitting }) => {
				// в параметрах получаем значения и функцию установки флага выполнения отправки формы

				// Если чекбокс не выбран, то выход из функции
				if (!values.checkbox) return

				// делаем запрос на восстановление пароля
				await axios.post(`${BASE_URL}/recover`, values)

				// здесь должна быть логика

				// флаг выполнения отправки формы становится не активным
				setSubmitting(false)
			}}
			// Form - аналог тега form
			// TextField - аналог инпута, в name привязывается к тому значению, которое прописали
			// value - значение инпута, onChange, onBlur - встроенные функции Formik, которые делают
			// определённые действия при изменении и фокусировке
			// ErrorMessage - аналог div, в котором выводится ошибка валидации

			// Box это тоже аналог div, но который лучше подходит для адаптивности
		>
			{({ values, handleChange, handleBlur, isSubmitting }) => (
				<Form className={styles.form}>
					<TextField
						variant='standard'
						type='text'
						name='login'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='ЭЛ. ПОЧТА'
					/>
					<ErrorMessage name='name' component='div' />

					{/* Наш кастомный чекбокс */}
					<СonsentСheckbox onBlur={handleBlur} onChange={handleChange} value={values.checkbox} />

					{/* Кнопка отправки запроса */}
					<CustomButton
						sx={{ width: { xs: '100%', md: '50%' }, mt: 8, mb: 1 }}
						type='submit'
						disabled={isSubmitting}
					>
						Запросить логин и пароль
					</CustomButton>

					{/* Блок с переходом на страницу регистрации */}
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

export default RecoverForm
