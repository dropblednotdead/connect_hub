import { Grid2, Typography } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import RegistrationForm from '../../components/Registration/RegistrationForm/RegistrationForm'

const RegistrationPage = () => {
	// Grid2 это компонент из библиотеки MaterialUI
	// он принимает size которая принимает значение столбцов в грид сетки
	// 1 Grid2 занимает все 12 столбцов
	// 2 и 3 Grid2 имеют size 3 и 9, это означает, что один занимает 3 столбца, а второй 9

	// Typography это компонент, который в зависимости от значения variants равен определённому тегу
	// RegistrationForm это наш дочерний компонент

	return (
		<Grid2 container>
			<Grid2 size={12} sx={{ display: 'flex', alignItems: 'end', mt: '120px' }}>
				<Typography variant='h3' sx={{ fontSize: { xs: '22px', md: '46px' } }}>
					ЗАРЕГИСТРИРОВАТЬСЯ
				</Typography>
				<ArrowOutwardRoundedIcon
					sx={{ marginLeft: 1, fontSize: { xs: '40px', md: '65px', lg: '65px' } }}
				/>
			</Grid2>

			<Grid2 size={{ md: 3, xs: 0 }}></Grid2>
			<Grid2 size={{ md: 5, xs: 12 }} sx={{ mt: 5 }}>
				<Typography sx={{ mb: 2 }}>Регистрация занимает несколько минут.</Typography>
				<Typography>
					Укажите свои контактные данные, мы свяжемся с вами, чтобы обсудить все детали и ответить
					на любые возникшие вопросы.
				</Typography>

				<RegistrationForm />
			</Grid2>
		</Grid2>
	)
}

export default RegistrationPage
