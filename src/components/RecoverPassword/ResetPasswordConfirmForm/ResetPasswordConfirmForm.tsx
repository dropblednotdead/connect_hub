import { TextField, useTheme } from '@mui/material'
import { Formik, ErrorMessage, Form } from 'formik'
import { CustomButton } from '../../ui/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useResetPasswordConfirmMutation } from '../../../api/authApi'
import styles from '../RecoverForm/styles.module.css'

const ResetPasswordConfirmForm = () => {
	const theme = useTheme()
	const navigate = useNavigate()
	const { uid, token } = useParams<{ uid: string; token: string }>()
	const [resetPasswordConfirm] = useResetPasswordConfirmMutation()

	return (
		<Formik
			initialValues={{
				new_password: '',
				re_new_password: '',
			}}
			validate={values => {
				const errors: any = {};
				if (!values.new_password) {
					errors.new_password = 'Обязательное поле';
				} else if (values.new_password.length < 8) {
					errors.new_password = 'Минимум 8 символов';
				} else if (/^\d+$/.test(values.new_password)) {
					errors.new_password = 'Пароль не должен состоять только из цифр';
				}

				if (!values.re_new_password) {
					errors.re_new_password = 'Обязательное поле';
				} else if (values.new_password !== values.re_new_password) {
					errors.re_new_password = 'Пароли не совпадают';
				}

				return errors;
			}}
			onSubmit={async (values, { setSubmitting, setErrors }) => {
				try {
					await resetPasswordConfirm({
						uid,
						token,
						new_password: values.new_password,
						re_new_password: values.re_new_password,
					}).unwrap()
					
					// После успешной смены пароля перекидываем на логин
					navigate('/login')
				} catch (error: any) {
					setErrors({ re_new_password: 'Ключ устарел или неверен. Попробуйте снова запросить сброс пароля.' })
					console.error('Password reset confirm failed:', error)
				} finally {
					setSubmitting(false)
				}
			}}
		>
			{({ values, handleChange, handleBlur, isSubmitting }) => (
				<Form className={styles.form}>
					<TextField
						variant='standard'
						type='password'
						name='new_password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.new_password}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='НОВЫЙ ПАРОЛЬ'
					/>
					<ErrorMessage name='new_password' component='div' style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '-20px' }} />

					<TextField
						variant='standard'
						type='password'
						name='re_new_password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.re_new_password}
						sx={{
							my: 4,
							display: 'block',
							'& .MuiInputBase-root': { width: '100%' },
						}}
						placeholder='ПОДТВЕРДИТЕ ПАРОЛЬ'
					/>
					<ErrorMessage name='re_new_password' component='div' style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '-20px' }} />

					<CustomButton
						sx={{ width: '100%', mt: 8, mb: 1 }}
						type='submit'
						disabled={isSubmitting}
					>
						СМЕНИТЬ ПАРОЛЬ
					</CustomButton>
				</Form>
			)}
		</Formik>
	)
}

export default ResetPasswordConfirmForm
