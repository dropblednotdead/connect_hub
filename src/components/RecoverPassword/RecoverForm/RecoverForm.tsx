import { Box, TextField, Typography, useTheme } from '@mui/material'
import { Formik, ErrorMessage, Form } from 'formik'
import styles from './styles.module.css'
import { CustomButton } from '../../ui/Button'
import { NavLink } from 'react-router-dom'
import СonsentСheckbox from '../../ui/СonsentСheckbox'
import { useResetPasswordMutation } from '../../../api/authApi'
import { useState } from 'react'

const RecoverForm = () => {
	const theme = useTheme()
	const [resetPassword] = useResetPasswordMutation()
	const [isSuccess, setIsSuccess] = useState(false)

	// Компонент из библиотеки Formik - аналог form
	return (
		<Formik
			// Поля, которые будут в форме
			initialValues={{
				email: '',
				checkbox: false,
			}}
			validate={values => {
				const errors: any = {};
				if (!values.email) {
					errors.email = 'Обязательное поле';
				} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
					errors.email = 'Некорректный email адрес';
				}
				if (!values.checkbox) {
					errors.checkbox = 'Необходимо согласие';
				}
				return errors;
			}}
			// Функция, которая будет выполняться при отправке формы
			onSubmit={async (values, { setSubmitting, setErrors }) => {
				// в параметрах получаем значения и функцию установки флага выполнения отправки формы

				try {
					await resetPassword({ email: values.email }).unwrap()
					setIsSuccess(true)
				} catch (error: any) {
					setErrors({ email: 'Пользователь с таким email не найден' })
					console.error('Password reset failed:', error)
				} finally {
					setSubmitting(false)
				}
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
						name='email'
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
					<ErrorMessage name='email' component='div' style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '-20px' }} />

					{isSuccess && (
						<Typography sx={{ color: '#008000', fontSize: '0.9rem', mb: 2 }}>
							Ссылка для восстановления отправлена на вашу почту
						</Typography>
					)}

					{/* Наш кастомный чекбокс */}
					<СonsentСheckbox onBlur={handleBlur} onChange={handleChange} value={values.checkbox} />
					<ErrorMessage name='checkbox' component='div' style={{ color: '#d32f2f', fontSize: '0.8rem' }} />

					{/* Кнопка отправки запроса */}
					<CustomButton
						sx={{ width: '100%', mt: 8, mb: 1 }}
						type='submit'
						disabled={isSubmitting}
					>
						ВОССТАНОВИТЬ
					</CustomButton>

					{/* Блок с переходом на страницу регистрации */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography sx={{ color: theme.palette.secondary.main }}>Нет аккаунта?</Typography>
						<NavLink
							to='/registration'
							style={{
								marginLeft: '4px',
								color: theme.palette.primary.main,
								fontWeight: 'bold',
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
